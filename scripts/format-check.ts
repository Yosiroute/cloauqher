import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".ts")) out.push(p);
  }
}

const files: string[] = [];
for (const root of ["src", "tests", "scripts"]) {
  try {
    walk(root, files);
  } catch {}
}
for (const extra of ["bu.ts", "fi.ts"]) {
  try {
    statSync(extra);
    files.push(extra);
  } catch {}
}

let errs = 0;
for (const f of files) {
  const content = readFileSync(f, "utf8");
  if (content.includes("\t")) {
    console.error(`${f}: tabs not allowed`);
    errs++;
  }
  for (const line of content.split("\n")) {
    if (line.length > 0 && /[ \t]$/.test(line)) {
      console.error(`${f}: trailing whitespace`);
      errs++;
      break;
    }
  }
  if (!content.endsWith("\n")) {
    console.error(`${f}: missing final newline`);
    errs++;
  }
}

if (errs > 0) {
  console.error(`format: ${errs} issue(s)`);
  process.exit(1);
}
console.log(`format ok (${files.length} files)`);
