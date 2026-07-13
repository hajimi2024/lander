# KejiLion LDNMP/DNMP

只有检测到标记，或用户明确说明服务器由 KejiLion 管理时，才加载本文件。

## 常见标记与目录

```text
/root/kejilion.sh
/usr/local/bin/k
/home/web/docker-compose.yml
/home/web/html
/home/web/certs
/home/web/conf.d
/home/web/docker-projects
/root/auto_cert_renewal.sh
/root/.acme.sh
```

- 站点：`/home/web/html`
- 证书：`/home/web/certs`
- Nginx 虚拟主机：`/home/web/conf.d`
- 应用市场项目：`/home/web/docker-projects/<project>`
- LDNMP Compose：`/home/web/docker-compose.yml`

通过 `wp-config.php` 和 `wp-content` 检测 WordPress；不要假定域名目录。

## 安全共存

- 修改环境前运行 `preflight.sh kejilion`。
- 同时检查宿主机和容器中的 Nginx 以及 80/443 端口归属。
- 选择唯一权威入口，不要盲目启动 LDNMP Nginx 容器。
- 除非用户明确选择 KejiLion 应用市场集成，否则将独立 GitHub 应用保存在用户指定的部署根目录，通常为 `/opt/docker-apps/<project>`。
- 私有绑定应用上游端口，只向权威入口添加必需的虚拟主机。
- 修改前后验证现有站点。

## 证书

KejiLion 传统的 Certbot 独立验证流程可能停止 `nginx` 容器以释放 80 端口，完成后再启动。修改续签机制前，检查 Certbot、acme.sh、cron 和定时器。

对于新接入且 DNS 托管在 Cloudflare 的域名，优先采用 `security-and-access.md` 中的 DNS-01 方案，不在本文件重复步骤。保留无关域名和续签任务。

## 基于源码升级排查

生成行为不清楚或反复修复失败时：

1. 记录已安装脚本版本。
2. 检查 `/root/kejilion.sh` 或 `/usr/local/bin/k`。
3. 与 `https://github.com/kejilion/sh` 中的相关函数比较。
4. 修改前检查生成的 Compose 和 Nginx 配置。

不要盲目重新运行一键脚本，其端口检查可能停止占用 80/443 的容器或进程。
