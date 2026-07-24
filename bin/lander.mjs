#!/usr/bin/env node

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const RESET = "\u001b[0m";
const GRAY = "\u001b[38;5;245m";
const WHITE = "\u001b[38;5;255m";
const GREEN = "\u001b[38;5;46m";
const BANNER_GRADIENT = [
  "\u001b[38;5;255m",
  "\u001b[38;5;252m",
  "\u001b[38;5;250m",
  "\u001b[38;5;248m",
  "\u001b[38;5;246m",
  "\u001b[38;5;244m"
];

export const BANNER = [
  "██╗      █████╗ ███╗   ██╗██████╗ ███████╗██████╗ ",
  "██║     ██╔══██╗████╗  ██║██╔══██╗██╔════╝██╔══██╗",
  "██║     ███████║██╔██╗ ██║██║  ██║█████╗  ██████╔╝",
  "██║     ██╔══██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗",
  "███████╗██║  ██║██║ ╚████║██████╔╝███████╗██║  ██║",
  "╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝"
];

export const DIVIDER = "──────────────●─────●──────●──────────";
export const TAGLINE = "• Lander • Agent Skills  • Codex • Cursor • Grok Build";
export const SOURCE = "hajimi2024/lander";

const wait = (ms) => new Promise((resolveWait) => setTimeout(resolveWait, ms));

export function supportsAnimation(env = process.env, stdout = process.stdout) {
  return Boolean(
    stdout.isTTY &&
      env.NO_COLOR === undefined &&
      env.TERM !== "dumb" &&
      env.CI === undefined &&
      env.LANDER_ANIMATION !== "0"
  );
}

export function buildSkillsCommand(extraArgs = [], platform = process.platform) {
  const skillsArgs = ["skills@latest", "add", SOURCE, ...extraArgs];
  if (platform === "win32") {
    return {
      executable: "cmd.exe",
      args: ["/d", "/s", "/c", "npx.cmd", ...skillsArgs]
    };
  }

  return {
    executable: "npx",
    args: skillsArgs
  };
}

export function buildSpawnOptions(platform = process.platform, env = process.env) {
  return {
    stdio: "inherit",
    shell: false,
    env
  };
}

function color(text, code, enabled) {
  return enabled ? `${code}${text}${RESET}` : text;
}

async function renderBanner(animated) {
  process.stdout.write("\n");

  for (const [index, line] of BANNER.entries()) {
    process.stdout.write(`${color(line, BANNER_GRADIENT[index] ?? GRAY, animated)}\n`);
    if (animated) await wait(55);
  }

  process.stdout.write("\n");
  if (animated) {
    let visible = "";
    for (const character of DIVIDER) {
      visible += character;
      process.stdout.write(`\r${color(visible, WHITE, true)}`);
      await wait(20);
    }
    process.stdout.write("\n");
    await wait(100);
  } else {
    process.stdout.write(`${DIVIDER}\n`);
  }

  process.stdout.write(`${color(TAGLINE, WHITE, animated)}\n\n`);
  if (animated) await wait(180);
  process.stdout.write(`${color("◇", GREEN, animated)} Starting Skills CLI\n\n`);
}

export async function main(extraArgs = process.argv.slice(2)) {
  const animated = supportsAnimation();
  await renderBanner(animated);

  const command = buildSkillsCommand(extraArgs);
  if (process.env.LANDER_INSTALLER_DRY_RUN === "1") {
    process.stdout.write(`${JSON.stringify(command)}\n`);
    return 0;
  }

  return await new Promise((resolveExit) => {
    const child = spawn(command.executable, command.args, {
      ...buildSpawnOptions()
    });

    child.once("error", (error) => {
      process.stderr.write(`Unable to start Skills CLI: ${error.message}\n`);
      resolveExit(1);
    });

    child.once("exit", (code, signal) => {
      if (signal) {
        process.stderr.write(`Skills CLI stopped by signal ${signal}.\n`);
        resolveExit(1);
        return;
      }
      resolveExit(code ?? 1);
    });
  });
}

const isDirectRun =
  process.argv[1] !== undefined &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  process.exitCode = await main();
}
