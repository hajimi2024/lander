<div align="center">

# 🚀 lander

**把 GitHub 仓库稳定落地为可运行、可部署、可导入的项目**

[English](README.en.md) · [安装](#-安装) · [更新](#-更新) · [使用方式](#-使用方式)

</div>

---

## ✨ 能做什么

`lander` 给 Agent 一套面对陌生 GitHub 仓库时的落地判断流程。

它会先识别项目形态，再从官方文档中选择可执行路径，最后按阶段完成安装、配置、访问、验证和交接。适合把一个仓库交给 Agent 后，需要得到清晰路线并把结果变成可用状态的场景。

**工作方式**

- 🔎 **仓库研判**：读取 README、安装说明、Compose、Dockerfile、包管理清单和环境示例，判断项目是应用、服务、CLI、Skill、MCP、浏览器扩展，还是其它需要特殊处理的仓库。

- 🧭 **路线选择**：只在官方支持的方案中选择路径。优先选择依赖更少、操作更稳、风险更低的方式；能直接使用时，不默认进入开发或构建流程。

- 🖥️ **环境预检**：在远程主机或长期运行环境上，先做 CPU、内存、磁盘、Docker、端口、代理和证书体系的只读检查，再决定是否进入修改阶段。

- ✅ **阶段验证**：每一步执行后验证真实结果，包括进程、容器、端口、HTTP/API 响应、数据持久化，以及现有服务是否保持健康。

- 📝 **交接记录**：在合适节点生成简洁、默认私有、经过脱敏的部署记录。这些记录用于后续维护，不会自动发布到 GitHub 或公开渠道。

**更适合这些仓库**

- 🐳 **Docker / Compose 自托管服务**：适合面板、API 服务、Web App、数据库配套服务和个人工具。`lander` 会在拉起服务前检查 Docker、容器、端口、挂载、资源和健康状态。

- 🌐 **Web 服务、后端服务和全栈应用**：适合有明确启动方式的前后端项目。`lander` 会先按项目文档确认运行入口、环境变量和依赖，再决定本地运行、Docker、VPS 或其它官方方案。

- 🛰️ **VPS 长期运行服务**：适合需要公网入口、HTTPS、反向代理、DNS-01、续签迁移和已有站点共存的服务。`lander` 会先确认现有入口和证书体系，避免为了接入一个新服务破坏现有服务。

- 💻 **本机试运行项目**：适合先在当前电脑或 WSL2 里跑起来的小型服务、命令行工具和开发工具。`lander` 会先确认官方命令和所需环境，再决定是否安装依赖、启动服务或切换到 Linux 环境。

- 🧩 **Agent / MCP / 浏览器扩展 / CLI 工具**：适合有明确安装入口的工具型仓库。`lander` 会确认装到哪里、用什么命令安装、如何验证可用；如果只是普通附件或手工上传类项目，只做识别和说明，不把它包装成部署任务。

`SKILL.md` 保持轻量，只负责主流程和条件路由；具体细节放在一级 `references/` 文件中，按需加载。

## 📦 安装

使用 Skills CLI 进入交互式安装流程：

```powershell
npx skills@latest add hajimi2024/lander -g
```

安装后，如果 Agent 没有立即发现新 Skill，请重启目标 Agent 或新建任务。

## 🔄 更新

如果 GitHub 仓库里的 `lander` 有新版本，在终端执行：

```powershell
npx skills@latest update lander -g
```

这会更新全局安装的 `lander`。如果你当初选择的是 Project 安装，请在对应项目目录中执行，并把 `-g` 换成 `-p`。

## 🧭 交互选择

安装时 Skills CLI 会引导你选择：

- **Skill**：选择 `lander`。
- **Agent**：选择你实际使用的 Agent，例如 `codex`、`claude-code`、`cursor`、`opencode`。完整列表以 Skills CLI 当前交互为准。
- **Scope**：默认推荐 Global，因为 `lander` 常用于跨项目分析、安装和部署；只有需要把 Skill 固定在某个仓库里时，才选择 Project。
- **Method**：默认推荐 Symlink，方便后续更新；如果系统不支持软链接、你需要固定快照，或准备团队交付，则选择 Copy。

## 💬 使用方式

显式调用：

```text
/lander 分析并部署 https://github.com/owner/repository
```

只做识别和规划，不修改环境：

```text
/lander 检查 https://github.com/owner/repository，第一轮只分析，不修改环境。
```

部署到 VPS，并先做只读环境检查：

```text
/lander 将 https://github.com/owner/repository 部署到我的 VPS，并先执行只读环境检查。
```

也可以直接用自然语言描述需求。只要任务涉及 GitHub 项目的识别、安装、部署、验证或导入，Agent 可以自动选择 `lander`。

## 🛡️ 安全边界

- 不猜测密码、Token、API Key、域名、目标路径或付费服务选择。
- “仅检查”阶段视为只读，不修改目标环境。
- 不擅自关闭防火墙、停止全部容器、删除证书或替换现有代理/证书体系。
- 部署记录默认保存在本地私有位置，不自动提交到 GitHub、Issue、PR、Release 或 CI 制品。
- 需要公开分享部署资料时，先保留私有原件，再生成经过再次脱敏的公开副本。

## 🗂️ 目录结构

这是一个单 Skill 仓库，根目录 `SKILL.md` 就是可安装入口。

```text
lander/
├── SKILL.md
├── README.md
├── README.en.md
├── agents/
│   └── openai.yaml
├── references/
├── scripts/
│   └── preflight.sh
└── assets/
    └── templates/
```

## 📄 License

当前仓库尚未选择 License。在明确授权协议前，请不要默认将它视为可自由再分发的软件。
