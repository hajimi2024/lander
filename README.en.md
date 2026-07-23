<div align="center">

# 🚀 lander

**Turn a GitHub repository into a runnable, deployable, or importable project with a stable agent workflow**

[简体中文](README.md) · [Install](#-install) · [Update](#-update) · [Usage](#-usage)

</div>

---

## ✨ What It Does

`lander` is built for a common failure point: you give an agent a GitHub repository, and it must first understand what the project is, how the maintainers expect it to be used, where it should run, and only then move into installation, configuration, verification, and handoff.

Its core strength is separating repository analysis from environment changes. The agent reads the official sources first, chooses a confirmed route, and proceeds in stages instead of immediately installing dependencies, pulling images, editing servers, or exposing services.

- 🔎 **Repository assessment**: reads README files, install docs, Compose files, Dockerfiles, package manifests, and environment examples to classify apps, services, CLIs, templates, plugins, Skills, MCPs, and browser extensions.
- 🧭 **Route selection**: chooses the lowest-risk official path that satisfies the goal; when direct use is enough, it does not default to development or build workflows.
- 🧩 **Multiple landing paths**: routes work across local machines, WSL2, remote Linux hosts, VPS targets, Docker/Compose, native installs, and importable artifacts.
- 🖥️ **Environment preflight**: runs read-only checks for CPU, memory, disk, Docker, ports, proxies, and certificate systems before touching remote or long-running environments.
- 🌐 **Access and certificate coexistence**: handles SSH tunnels, public ingress, reverse proxies, HTTPS, DNS-01, renewal migration, and existing sites without disrupting unrelated services.
- ✅ **Stage-by-stage verification**: validates real outcomes after each step, including processes, containers, ports, HTTP/API responses, persistence, and the health of existing services.
- 📝 **Handoff records**: creates concise, private-by-default, redacted deployment records at the right lifecycle points, without publishing them to GitHub or public channels automatically.

`SKILL.md` stays intentionally thin. It carries the main workflow and routing rules, while task-specific details live in first-level `references/` files that are loaded only when needed.

## 📦 Install

Start the interactive Skills CLI installer:

```powershell
npx skills@latest add hajimi2024/lander -g
```

After installation, restart the target agent or start a new task if it does not discover newly installed skills immediately.

## 🔄 Update

When this GitHub repository has a newer version of `lander`, run this in your terminal:

```powershell
npx skills@latest update lander -g
```

This updates the globally installed `lander`. If you originally chose Project scope, run it from that project directory and replace `-g` with `-p`.

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
