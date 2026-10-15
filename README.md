# cloauqher

Small greeter library used by downstream services.

## Modules

- `src/value.ts` — shared constant.
- `src/case.ts` — `normalizeName`, `titleCase` helpers.
- `bu.ts` — `build(name)` composes a greeter identifier.
- `fi.ts` — `greet(name, opts)` / `greetMany(names, opts)` for user-facing greetings.
- `scripts/build.ts` — esbuild bundle for publish.
- `scripts/format-check.ts` — repo formatter (no tabs, no trailing whitespace, final newline).

## Development

```
bun install
bun run format
bun typecheck
bun run build
bun test
```
