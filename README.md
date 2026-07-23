# lander

lander is a single Agent Skill for turning a GitHub repository into something usable: a runnable app, a deployable service, or an importable artifact.

It guides an agent through repository recognition, official documentation review, route selection, staged execution, verification, and handoff. The default bias is conservative: use the official path with the fewest dependencies, the simplest operation, and the lowest operational risk.

## What It Does

- Reads repository README files, install docs, Docker/Compose files, package manifests, and environment examples when they are relevant.
- Classifies projects as runnable or importable before choosing a route.
- Handles local, WSL2, VPS, Docker/Compose, native install, template, plugin, Skill, MCP, and browser-extension paths.
- Performs read-only server preflight checks before deployment work.
- Guides private access, SSH tunnels, domains, reverse proxies, HTTPS, and certificate renewal without replacing existing infrastructure blindly.
- Creates concise, private-by-default deployment records only at the appropriate lifecycle points.

## Install

Install with the Skills CLI:

```powershell
npx skills@latest add hajimi2024/lander -g
```

During interactive installation:

- Skill: choose `lander`.
- Agent: choose the agents you actually use, such as `codex`, `claude-code`, `cursor`, or `opencode`. The full list is maintained by the Skills CLI.
- Scope: choose Global for normal use. Choose Project only when a repository should carry its own fixed Skill installation.
- Method: choose Symlink by default. Choose Copy if symlinks are not supported, you want a fixed snapshot, or you are preparing a team handoff.

List available skills without installing:

```powershell
npx skills@latest add hajimi2024/lander --list
```

Install non-interactively for Codex:

```powershell
npx skills@latest add hajimi2024/lander -g -a codex --skill lander -y
```

Install a copied snapshot for Codex:

```powershell
npx skills@latest add hajimi2024/lander -g -a codex --skill lander --copy -y
```

After installation, restart the target agent or start a new task if it does not discover newly installed skills immediately.

## Use

Invoke it explicitly:

```text
/lander 分析并部署 https://github.com/owner/repository
```

Only identify and plan, without changing an environment:

```text
/lander 检查 https://github.com/owner/repository，第一轮只分析，不修改环境。
```

Deploy to a VPS with a read-only preflight first:

```text
/lander 将 https://github.com/owner/repository 部署到我的 VPS，并先执行只读环境检查。
```

Natural language also works. If the task involves recognizing, installing, deploying, validating, or importing a GitHub project, the agent can choose lander automatically.

## Structure

This is a single Skill repository. The root `SKILL.md` is the installable skill entrypoint.

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

`SKILL.md` stays intentionally thin. It routes the agent to first-level reference files only when the task needs them.

## Safety

- Do not guess passwords, tokens, API keys, domains, target paths, or paid-service choices.
- Treat "check only" as read-only.
- Do not disable firewalls, stop all containers, delete certificates, or replace existing proxy/certificate systems without an explicit plan and confirmation.
- Keep deployment records private by default and out of GitHub, issues, PRs, releases, and CI artifacts unless the user explicitly asks for a redacted public copy.

## License

No license has been selected yet. Do not treat this repository as freely redistributable until a license is added.
