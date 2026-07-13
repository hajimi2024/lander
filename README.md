# 🚀 Lander（落地者）

Lander 是一个面向 GitHub 开源项目的 Agent Skill。它帮助 Agent 读取官方文档、识别项目类型、选择稳定的落地方式，并分阶段完成安装、部署、验证与交接。

> 核心目标：把一个 GitHub Repository 安全、清晰地落地为可运行、可使用或可导入的项目。

## ✨ 能做什么

- 📖 阅读 `README`、安装说明、`Dockerfile`、Compose 和环境变量示例。
- 🧭 识别 Docker、Native、本地、WSL2、VPS 或可导入项目路线。
- 🪶 优先推荐依赖最少、操作最简单、风险最低的官方方案。
- 🖥️ 对服务器执行只读环境预检，评估 CPU、内存、磁盘和现有服务余量。
- 🌐 按需协助配置私有访问、SSH 隧道、域名、反向代理和 HTTPS。
- 🔐 支持 Cloudflare DNS-01、证书自动续签及续签后的服务重载方案。
- 🧩 识别 Plugin、Skill、MCP、模板和浏览器扩展等可导入项目。
- ✅ 验证进程、容器、端口、HTTP/API、页面访问和数据持久化。
- 📝 在适当阶段生成简洁、默认私有且经过脱敏的部署记录。

## 🌳 工作流程

```text
GitHub Repository
→ 项目识别
→ 项目分析
→ 制定方案
→ 执行落地
→ 验证与交接
```

第一轮只分析核心官方资料、概括项目并提出当前必要问题，不会立即安装、构建或连接服务器。后续每个阶段完成后先验证，再继续下一阶段。

## 📦 安装

### Codex Desktop / CLI（Windows）

需要先安装并登录 [GitHub CLI](https://cli.github.com/)：

```powershell
gh auth login
gh repo clone hajimi2024/lander "$env:USERPROFILE\.codex\skills\lander"
```

### Codex CLI（macOS / Linux）

```bash
gh auth login
gh repo clone hajimi2024/lander "${CODEX_HOME:-$HOME/.codex}/skills/lander"
```

安装后重新启动或新建 Codex 任务，让 Agent 重新发现 Skill。

更新已安装版本：

```powershell
git -C "$env:USERPROFILE\.codex\skills\lander" pull
```

## 💬 如何调用

在 Codex 中直接使用 `$lander`：

```text
使用 $lander 分析并部署 https://github.com/owner/repository
```

只进行项目识别，不执行部署：

```text
使用 $lander 检查 https://github.com/owner/repository，第一轮只分析，不修改环境。
```

部署到 VPS：

```text
使用 $lander 将 https://github.com/owner/repository 部署到我的 VPS，并先执行只读环境检查。
```

安装 Plugin、Skill 或 MCP：

```text
使用 $lander 识别并安装这个仓库；如果它属于可导入项目，请选择对应路线：https://github.com/owner/repository
```

也可以使用自然语言描述需求。只要任务涉及 GitHub 项目的识别、安装、部署或导入，Agent 就可以自动选择 Lander。

## 🛡️ 安全原则

- 不猜测密码、Token、API Key、域名或目标路径。
- “仅检查”阶段不修改目标环境。
- 不擅自关闭防火墙、停止全部容器或替换现有证书体系。
- 部署记录默认保存在本地，不自动提交到 GitHub 或公开位置。
- 公开分享部署资料时，保留私有原件并另行生成脱敏副本。
- 涉及公网暴露、DNS、证书、付费操作或破坏性修改时，先向用户说明。

## 🗂️ 目录结构

```text
lander/
├── SKILL.md
├── README.md
├── agents/
│   └── openai.yaml
├── references/
├── scripts/
│   └── preflight.sh
└── assets/
    └── templates/
```

## 🎯 适用场景

适合 GitHub 开源应用、Docker 服务、CLI 工具、静态模板、Plugin、Skill、MCP，以及需要部署到本地电脑、WSL2 或远程 Linux VPS 的项目。

Lander 不承诺无条件自动解决所有问题。遇到账号授权、秘密信息、付费服务、安全边界或重要方案选择时，它会暂停并向用户确认。

## 📄 License

当前仓库尚未添加 License。在明确授权协议前，请勿默认将其视为可自由再分发的软件。
