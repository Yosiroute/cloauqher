import { build } from "esbuild";
import { existsSync, mkdirSync } from "node:fs";

if (!existsSync("dist")) mkdirSync("dist", { recursive: true });

const result = await build({
  entryPoints: ["bu.ts", "fi.ts"],
  bundle: true,
  format: "esm",
  target: "es2022",
  platform: "neutral",
  outdir: "dist",
  sourcemap: true,
  logLevel: "warning",
});

if (result.errors.length > 0) {
  for (const e of result.errors) console.error(e.text);
  process.exit(1);
}
console.log("build ok");
