---
name: lander
description: 面向 GitHub 项目的识别、分析、安装、部署、导入与验证流程，适用于本地电脑、WSL2 和远程服务器。当 Agent 收到 GitHub 仓库，或用户希望让项目可运行、可使用、可导入时使用。优先采用官方支持、依赖较少、操作稳定且风险较低的路径，并在配置秘密信息、切换生产环境或开放公网前执行安全确认。
---

# lander

将 GitHub 仓库转化为经过验证的可用项目：

```text
GitHub 仓库 -> 项目识别 -> 项目分析 -> 制定方案 -> 执行 -> 验证 -> 交接
```

## 默认规则

- 将项目官方文档作为第一可信来源。
- 在官方支持的方案中选择依赖较少、操作稳定、风险较低且适合目标环境的路径。
- 同时存在直接使用和开发者路径时，默认先推荐直接使用；只有用户明确需要修改源码或开发时才进入构建流程。
- 使用用户当前对话语言回复；命令、代码、路径和项目名称保留原文。
- 第一轮只读取和分析，不安装依赖、不执行构建、不拉取大型镜像、不连接服务器、不修改环境。
- 每个决策节点只询问当前必需的 1～3 个问题，不提前索取后续阶段的秘密信息。
- 不猜测凭据、域名、路径、访问范围、付费服务或生产配置。
- 不要求用户在对话中粘贴密码、Token、API Key、私钥、Cookie 或完整连接字符串。
- 保护无关服务、数据、端口、证书和配置，不在输出、日志或部署记录中暴露秘密信息。
- 安装、更新或移除 `lander` Skill 自身时，回答 Skills CLI 维护命令，不进入项目部署流程。

## 稳定主流程

### 1. 项目识别

读取 `references/project-recognition.md`。检查 README、官方安装说明、官方 docs、配置样例和必要的部署文件。

识别项目是否要求环境变量、默认账号、初始密码、API 凭据、私钥或生产配置。发现这些信号时，同时读取 `references/secret-safety.md`。

直接读取不足时，可以克隆到临时分析目录；只做读取和搜索，不安装、不构建、不执行项目代码。分析后删除临时副本，除非用户将其选为正式目录。

### 2. 项目分析

识别项目类型、官方使用方式、主要依赖、资源级别和敏感配置风险。不要仅因存在 Dockerfile 就认定 Docker 是首选。

第一轮只输出项目说明、官方方式、初步建议、敏感配置风险和当前 1～3 个必要问题，然后停止。只报告秘密名称、用途和证据位置，不报告值。

### 3. 制定方案

用户确认继续后，读取 `references/artifact-contracts.md` 并创建 `PROJECT_SUMMARY.md`。读取 `references/deployment-strategies.md`，确认目标设备、使用方式、生产要求和当前阶段需要的配置。

目标为 VPS、WSL2 或远程 Linux 主机时，只在目标已确认后连接。先运行 `scripts/preflight.sh basic`，再判断为适合部署、勉强可部署或不建议部署。

仅在对应路线已选择时运行附加预检：

- Docker 路线：`scripts/preflight.sh docker`
- 公网访问：`scripts/preflight.sh ingress`
- 既有面板、反向代理、证书体系或 80/443 端口需要共存判断：`scripts/preflight.sh web-stack`

### 4. 配置与执行

第一次修改状态前创建 `DEPLOYMENT_LOG.md`。每次只执行一个已确认阶段，采用官方命令和可恢复配置，验证通过后再继续。

涉及秘密信息时，先列出变量名、用途、官方依据、建议保存位置和最小权限。让用户在目标终端、受限文件或平台 Secret 管理界面中填写真实值；不要通过对话、命令参数或可回显日志收集。

Docker/Compose 启动前检查配置有效性、端口、挂载目录、权限、持久化和秘密注入方式；启动后再检查健康状态、日志和应用响应。

### 5. 公网与生产门

网络服务需要公网访问时读取 `references/security-and-access.md`。

出现以下任一情况时，不得开放公网或宣布生产就绪：

- 默认账号或初始密码尚未处理；
- 调试模式、开发服务器或测试凭据仍在使用；
- 管理入口、身份验证、监听范围或允许来源未确认；
- HTTPS、安全 Cookie、数据持久化、备份或恢复方式未确认；
- 外部 API 的环境、权限、额度或费用风险未确认。

本机隔离试运行可以继续，但必须明确剩余风险和进入生产前的待办。

### 6. 验证与交接

验证进程或容器状态、应用响应、访问方式、数据持久化、资源限制和重要现有服务健康状态。验证秘密配置时只检查是否加载、权限是否合理和功能是否成功，不输出真实值。

部署成功或在稳定节点暂停时，创建或更新 `DEPLOYMENT_REPORT.md`。只记录秘密保存位置、权限、处理状态和轮换责任。部署记录默认私有，不自动提交到 GitHub、Issue、PR、Release 或 CI 制品。

## 条件路由

- 项目识别后读取 `references/deployment-strategies.md`，选择可运行或可导入路线。
- 出现 `.env`、Token、API Key、账号密码、私钥、Cookie、Webhook、数据库凭据、默认账号或生产配置时，读取 `references/secret-safety.md`。
- 项目提供网络服务并需要选择或配置访问方式时，读取 `references/security-and-access.md`。
- 检测到既有 Web 面板、反向代理、证书续签体系、80/443 占用或已有站点时，读取 `references/managed-web-stack-conflicts.md`。
- 用户确认继续，或记录到达规定创建节点时，读取 `references/artifact-contracts.md`。
- 只有官方资料不足、兼容性不明或具体错误需要深入排查时，才读取 Release、Issue、相关源码和第三方资料。

## 安全约束

- 将“仅检查”视为不可修改环境。
- 公网暴露、DNS、防火墙、证书替换、破坏性迁移或付费操作前，先说明影响并获得确认。
- 优先固定 Release 或记录 commit，限制秘密文件权限，明确持久化，并备份会被覆盖的配置。
- 不通过大范围停止容器、清空防火墙、删除证书或关闭安全机制解决单个项目冲突。
- 用户在对话中误发秘密时，不复述内容；提醒立即撤销或轮换。
- 反复失败时保留准确错误和当前状态，升级证据来源，不重复尝试同类命令变体。

## 资源

- `references/project-recognition.md`：可信来源、第一轮行为、分类和资源判断。
- `references/deployment-strategies.md`：路线选择、执行顺序和验证。
- `references/secret-safety.md`：秘密信息、默认凭据和生产切换门槛。
- `references/security-and-access.md`：私有/公网访问、反向代理、TLS 和续签。
- `references/managed-web-stack-conflicts.md`：既有 Web 入口和证书体系共存。
- `references/artifact-contracts.md`：记录位置、字段和脱敏规则。
- `scripts/preflight.sh`：只读的 `basic`、`docker`、`ingress` 和 `web-stack` 检查。
- `assets/templates/`：在规定生命周期节点使用的 Markdown 模板。
