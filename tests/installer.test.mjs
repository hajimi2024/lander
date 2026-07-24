import test from "node:test";
import assert from "node:assert/strict";
import {
  BANNER,
  DIVIDER,
  TAGLINE,
  buildSkillsCommand,
  buildSpawnOptions,
  isDirectRunPath,
  supportsAnimation
} from "../bin/lander.mjs";

test("banner contains the requested identity and subtitle", () => {
  assert.equal(BANNER.length, 6);
  assert.equal(DIVIDER, "─────●─────────────●─────────────●────────●───────●───────");
  assert.equal((DIVIDER.match(/●/g) ?? []).length, 5);
  assert.equal(TAGLINE, "• Lander • Any Agent Skills  • Codex • Cursor • Grok");
  assert.match(TAGLINE, /Lander/);
  assert.match(TAGLINE, /Any Agent Skills/);
  assert.match(TAGLINE, /Codex/);
  assert.match(TAGLINE, /Cursor/);
  assert.match(TAGLINE, /Grok/);
});

test("installer delegates to the official Skills CLI without forcing global scope", () => {
  assert.deepEqual(buildSkillsCommand([], "win32"), {
    executable: "cmd.exe",
    args: ["/d", "/s", "/c", "npx.cmd", "skills@latest", "add", "hajimi2024/lander"]
  });
  assert.deepEqual(buildSkillsCommand(["--copy"], "linux"), {
    executable: "npx",
    args: ["skills@latest", "add", "hajimi2024/lander", "--copy"]
  });
});

test("installer avoids shell execution when launching command shims", () => {
  assert.equal(buildSpawnOptions("win32", {}).shell, false);
  assert.equal(buildSpawnOptions("linux", {}).shell, false);
});

test("direct-run detection follows npm bin symlinks", () => {
  const modulePath = new URL("../bin/lander.mjs", import.meta.url).pathname;
  const shimPath = "node_modules/.bin/lander";
  const realpath = (path) => (path === shimPath ? modulePath : path);

  assert.equal(isDirectRunPath(modulePath, modulePath), true);
  assert.equal(isDirectRunPath(shimPath, modulePath, realpath), true);
});

test("animation is disabled for non-interactive and no-color output", () => {
  assert.equal(supportsAnimation({}, { isTTY: false }), false);
  assert.equal(supportsAnimation({ NO_COLOR: "1" }, { isTTY: true }), false);
  assert.equal(supportsAnimation({ TERM: "dumb" }, { isTTY: true }), false);
  assert.equal(supportsAnimation({ LANDER_ANIMATION: "0" }, { isTTY: true }), false);
  assert.equal(supportsAnimation({}, { isTTY: true }), true);
});
