<div align="center">

# 🚀 lander

**Turn a GitHub repository into a runnable, deployable, or importable project with a stable agent workflow**

[![Skills CLI](https://img.shields.io/badge/Skills%20CLI-compatible-2563eb)](https://github.com/vercel-labs/skills)
[![Skill](https://img.shields.io/badge/single%20skill-lander-16a34a)](SKILL.md)
[![Agent](https://img.shields.io/badge/agent-Codex-111827)](agents/openai.yaml)
[![License](https://img.shields.io/badge/license-pending-lightgrey)](#-license)

[简体中文](README.md) · **English**

</div>

---

## ✨ What It Does

`lander` is an Agent Skill for GitHub projects. It helps an agent read official documentation, classify the project, choose a stable path, and move through installation, deployment, verification, and handoff in stages.

- 📖 Reads README files, install docs, Docker/Compose files, package manifests, and environment examples when relevant.
- 🧭 Classifies a repository as runnable, deployable, or importable before choosing a route.
- 🪶 Prefers official paths with fewer dependencies, simpler operations, and lower operational risk.
- 🖥️ Runs read-only preflight checks before touching VPS, WSL2, or remote Linux environments.
- 🌐 Handles private access, SSH tunnels, domains, reverse proxies, HTTPS, and certificate renewal coexistence.
- 🧩 Recognizes templates, plugins, Skills, MCPs, browser extensions, and other importable artifacts.
- 📝 Creates concise, private-by-default, redacted deployment records at the right lifecycle points.

`SKILL.md` stays intentionally thin. It carries the main workflow and routing rules, while task-specific details live in first-level `references/` files that are loaded only when needed.

## 📦 Install

Install with the Skills CLI:

```powershell
npx skills@latest add hajimi2024/lander -g
```

List the available skill without installing:

```powershell
npx skills@latest add hajimi2024/lander --list
```

Install only for Codex and skip prompts:

```powershell
npx skills@latest add hajimi2024/lander -g -a codex --skill lander -y
```

Install a copied snapshot instead of a symlink:

```powershell
npx skills@latest add hajimi2024/lander -g -a codex --skill lander --copy -y
```

After installation, restart the target agent or start a new task if it does not discover newly installed skills immediately.

## 🧭 Interactive Choices

The Skills CLI will guide you through these choices:

- **Skill**: choose `lander`.
- **Agent**: choose the agents you actually use, such as `codex`, `claude-code`, `cursor`, or `opencode`. The complete list is maintained by the current Skills CLI release.
- **Scope**: Global is the recommended default because `lander` is useful across repositories and projects. Choose Project only when a repository should carry its own fixed skill installation.
- **Method**: Symlink is the recommended default because it is easier to update. Choose Copy when symlinks are unavailable, you need a fixed snapshot, or you are preparing a team handoff.

## 💬 Usage

Invoke it explicitly:

```text
/lander analyze and deploy https://github.com/owner/repository
```

Only identify and plan, without changing the environment:

```text
/lander inspect https://github.com/owner/repository. First round only: analyze, do not modify the environment.
```

Deploy to a VPS with a read-only preflight first:

```text
/lander deploy https://github.com/owner/repository to my VPS, and run a read-only preflight check first.
```

Natural language also works. If the task involves recognizing, installing, deploying, validating, or importing a GitHub project, the agent can choose `lander` automatically.

## 🛡️ Safety Boundaries

- Do not guess passwords, tokens, API keys, domains, target paths, or paid-service choices.
- Treat "check only" as read-only and do not modify the target environment.
- Do not disable firewalls, stop all containers, delete certificates, or replace existing proxy/certificate systems without an explicit plan and confirmation.
- Keep deployment records private by default and out of GitHub, issues, PRs, releases, and CI artifacts.
- When a deployment record must be shared publicly, keep the private original and generate a separately redacted public copy.

## 🗂️ Structure

This is a single Skill repository. The root `SKILL.md` is the installable skill entrypoint.

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

No license has been selected yet. Do not treat this repository as freely redistributable until a license is added.
