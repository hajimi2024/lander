import test from "node:test";
import assert from "node:assert/strict";
import {
  BANNER,
  DIVIDER,
  TAGLINE,
  buildSkillsCommand,
  buildSpawnOptions,
  supportsAnimation
} from "../bin/lander.mjs";

test("banner contains the requested identity and subtitle", () => {
  assert.equal(BANNER.length, 6);
  assert.equal(DIVIDER, "──●────●────●────●────●────●────●────●──────");
  assert.equal(TAGLINE, "lander • AI Skills for Codex • Cursor • Grok Build");
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

test("animation is disabled for non-interactive and no-color output", () => {
  assert.equal(supportsAnimation({}, { isTTY: false }), false);
  assert.equal(supportsAnimation({ NO_COLOR: "1" }, { isTTY: true }), false);
  assert.equal(supportsAnimation({ TERM: "dumb" }, { isTTY: true }), false);
  assert.equal(supportsAnimation({ LANDER_ANIMATION: "0" }, { isTTY: true }), false);
  assert.equal(supportsAnimation({}, { isTTY: true }), true);
});
