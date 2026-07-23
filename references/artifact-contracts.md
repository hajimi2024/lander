# 部署记录约定

只有满足生命周期条件时才创建记录。默认不要将运行记录存入 Skill 或上游仓库。

## 默认位置

```text
$CODEX_HOME/deployment-records/<owner>--<repo>/<target>/
```

目标标签不得包含密码、Token、完整连接字符串、IP 或域名。除非用户要求远程留档，否则不要将记录同步到目标服务器。

## 公开发布与导出

部署记录属于本地私有运维资料，不得自动加入 Git 暂存区、提交、PR、Issue、Release、CI 制品或公开上传。

用户明确要求公开分享时：

1. 保留私有原件，另行生成公开副本。
2. 脱敏 IP、主机名、账号、域名、内部路径、非必要端口、私有服务名、访问命令和秘密存放位置。
3. 删除密码、API Key、Token、Cookie、SSH Key、`.env` 内容、登录状态和可用于推断秘密的信息。
4. 在 `git add`、`git commit`、`git push` 或上传前检查文件和差异。
5. 发布项目到 GitHub 不等于授权发布部署记录。

## PROJECT_SUMMARY.md

第一轮识别完成且用户确认继续后创建。使用 `assets/templates/project-summary.md`。版本、分类、官方方式、敏感配置风险或生产要求发生变化时更新。

## DEPLOYMENT_LOG.md

第一次修改状态前创建。使用 `assets/templates/deployment-log.md`，只追加有意义的事件：

- 环境适配性已确认；
- 敏感配置已提醒、已确认或需轮换；
- 部署或配置阶段开始/完成；
- 验证通过/失败；
- 稳定暂停、更新、迁移或回滚。

不要记录终端流水、原始日志、秘密值、Cookie、完整环境变量或私钥。

## DEPLOYMENT_REPORT.md

成功落地，或任务在可恢复的稳定节点正式暂停时创建或更新。使用 `assets/templates/deployment-report.md`，维护当前状态而不是事件历史。

秘密信息只记录：

- 保存位置；
- 权限是否已限制；
- 默认凭据是否已处理；
- 是否完成验证；
- 轮换责任和待办。

不得记录真实值。

## 回滚与编辑

- 只有真正发生回滚时才创建 `ROLLBACK_REPORT.md`。
- 优先记录简洁事实。
- 已知时区时使用包含时区的 ISO 日期。
- 公开副本不记录秘密存放位置。
