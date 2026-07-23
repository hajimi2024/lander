<div align="center">

# 🚀 lander

**把 GitHub 仓库稳定落地为可运行、可部署、可导入的项目**

[![Skills CLI](https://img.shields.io/badge/Skills%20CLI-compatible-2563eb)](https://github.com/vercel-labs/skills)
[![Skill](https://img.shields.io/badge/single%20skill-lander-16a34a)](SKILL.md)
[![Agent](https://img.shields.io/badge/agent-Codex-111827)](agents/openai.yaml)
[![License](https://img.shields.io/badge/license-pending-lightgrey)](#-license)

<img alt="简体中文" src="https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-current-111827?style=for-the-badge">
<a href="README.en.md"><img alt="English" src="https://img.shields.io/badge/English-switch-2563eb?style=for-the-badge"></a>

</div>

---

## ✨ 能做什么

`lander` 是一个面向 GitHub 项目的 Agent Skill。它帮助 Agent 读取官方文档、识别项目类型、选择稳定路径，并分阶段完成安装、部署、验证与交接。

- 📖 阅读 README、安装说明、Docker/Compose、包管理清单和环境变量示例。
- 🧭 先判断项目是可运行、可部署，还是可导入，再选择路线。
- 🪶 优先采用官方支持、依赖更少、操作更简单、风险更低的方案。
- 🖥️ 在 VPS、WSL2 或远程 Linux 主机上先做只读预检，再进入执行阶段。
- 🌐 处理私有访问、SSH 隧道、域名、反向代理、HTTPS 与证书续签的共存问题。
- 🧩 识别模板、插件、Skill、MCP、浏览器扩展等可导入项目。
- 📝 在合适节点生成简洁、默认私有、经过脱敏的部署记录。

`SKILL.md` 保持轻量，只负责主流程和条件路由；具体细节放在一级 `references/` 文件中，按需加载。

## 📦 安装

使用 Skills CLI 安装：

```powershell
npx skills@latest add hajimi2024/lander -g
```

查看仓库里可安装的 Skill：

```powershell
npx skills@latest add hajimi2024/lander --list
```

只安装到 Codex，并跳过交互确认：

```powershell
npx skills@latest add hajimi2024/lander -g -a codex --skill lander -y
```

安装为复制快照，而不是软链接：

```powershell
npx skills@latest add hajimi2024/lander -g -a codex --skill lander --copy -y
```

安装后，如果 Agent 没有立即发现新 Skill，请重启目标 Agent 或新建任务。

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
