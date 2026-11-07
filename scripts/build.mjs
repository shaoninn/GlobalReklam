#!/usr/bin/env node
/**
 * Hostinger-oriented production build:
 * - Force NODE_ENV=production (panel often injects development)
 * - Use webpack (required on Hostinger for Next 16.3.3+)
 * - Cap process/thread fan-out (Hostinger PID/thread limits)
 */
import { spawnSync } from "node:child_process";

process.env.NODE_ENV = "production";
// Soft-cap native / UV pools so collect-page-data doesn't spawn dozens of threads.
process.env.UV_THREADPOOL_SIZE ??= "2";
process.env.NEXT_TELEMETRY_DISABLED ??= "1";

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });
  return result.status ?? 1;
}

let code = run("node", ["scripts/optimize-images.mjs"]);
if (code !== 0) process.exit(code);

code = run("npx", ["prisma", "generate"]);
if (code !== 0) process.exit(code);

// Hostinger: Turbopack PostCSS IPC + glibc / 60+ workers blow the thread budget.
code = run("npx", ["next", "build", "--webpack"]);
process.exit(code);
