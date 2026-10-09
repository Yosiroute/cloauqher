import { readdirSync, readFileSync, statSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CACHE_DIR = ".bun-cache";

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".") || entry === "node_modules") continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".ts")) out.push(p);
  }
  return out;
}

// Keep a last-run marker for incremental-lint tooling: downstream wrappers can
// skip walking files whose mtime is older than this stamp.
if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
writeFileSync(join(CACHE_DIR, "last-run"), new Date().toISOString());

const files = [...walk("src"), ...walk("tests")];
let bad = 0;
for (const p of files) {
  const src = readFileSync(p, "utf8");
  if (src.includes("\t")) { console.log(`tab in ${p}`); bad++; }
  if (/[ \t]+\n/.test(src)) { console.log(`trailing ws in ${p}`); bad++; }
}
if (bad > 0) process.exit(1);
console.log(`format ok (${files.length} files)`);
