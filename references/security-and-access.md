# 安全与访问

只有项目提供网络服务时才加载本文件。

## 交互式选择访问方式

只提供适用的选项：

- **SSH 本地端口转发**：仅授权 SSH 用户可用的临时私有访问。
- **公网 IP 和端口**：直接暴露，必须获得明确同意，并检查防火墙和身份验证。
- **域名和 HTTPS 反向代理**：适合长期运行的公网服务。
- **Cloudflare Tunnel**：使用公网域名，但不直接发布应用端口。

使用 SSH 本地端口转发时，将应用绑定到 loopback，并采用类似命令：

```text
ssh -N -L LOCAL_PORT:127.0.0.1:REMOTE_PORT user@host
```

修改 SSH 转发设置前，先检查实际生效配置。需要长期无人值守的隧道时，优先使用 SSH Key 和受限账号。

## 公网入口

- 修改公网路由前运行 `preflight.sh ingress`。
- 确认 80/443 端口归属，并复用唯一的权威入口。
- 没有明确迁移方案时，不要让宿主机 Nginx 和容器 Nginx 争用相同端口。
- 将上游应用绑定到 loopback 或私有 Docker 网络。
- 备份受影响的站点配置，测试通过后再 reload。
- 只有应用需要时才添加 WebSocket 请求头、上传大小或超时配置。

## Cloudflare 与 TLS

DNS 托管在 Cloudflare 且用户可以提供受限 Token 时，优先使用 `acme.sh + Cloudflare DNS API + DNS-01`：

- 不依赖 80 端口；
- 申请和续签时无需停止 Nginx；
- 支持根域名和通配符证书；
- 自动临时创建 `_acme-challenge` TXT 记录。

请求权限最小化的 API Token，只授予目标 Zone 的 Zone DNS Edit 和 Zone Read。Token 足够时，不索取 Global API Key。

通常申请：

```text
example.com
*.example.com
```

`*.example.com` 只覆盖一级子域名，不覆盖 `a.b.example.com`。

将完整证书链和私钥安装到当前权威入口使用的路径。为实际服务配置经过测试的重载 hook，例如容器 Nginx、宿主机 Nginx、Caddy、Traefik 或其他权威代理。

## 续签迁移

不要先删除现有证书或全局续签任务。先申请并安装替代证书，切换一个站点，完成外部验证，测试续签和 reload，然后只停用该域名已经被替代的任务。

## 秘密信息规则

- 不提交或汇报 API Token、密码、私钥、Cookie、登录状态或 `.env` 值。
- 避免让秘密信息进入 Shell 历史、进程参数、日志、截图和渲染后的 Compose 输出。
- 使用严格权限保存凭据文件；秘密信息一旦出现在对话记录中，立即轮换。
