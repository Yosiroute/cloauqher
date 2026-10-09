# AGENTS.md

Guidance for coding agents working in this repository. This file follows the
[agents.md](https://agents.md) convention. Human contributors should read
`CLAUDE.md` and `CONTRIBUTING.md`; the notes below are the machine-readable
subset that automated agents rely on.

## Project overview

This repo is a GitHub Action that runs Claude Code in response to `@claude`
mentions (tag mode) or a `prompt` input (agent mode). The single entrypoint is
`src/entrypoints/run.ts`. `base-action/` is published standalone as
`@anthropic-ai/claude-code-base-action` — do not break its public API.

## Runtime & toolchain

- **Runtime is Bun**, not Node. Use `bun`, `bunx`, `bun test` — never `npm`,
  `yarn`, or `jest`.
- `moduleResolution: "bundler"` — imports do not use `.js` extensions.
- TypeScript is strict: `noUnusedLocals` and `noUnusedParameters` are on, so an
  unused variable fails the typecheck.

## Commands

```bash
bun install            # install dependencies
bun run format         # normalize all sources with prettier (writes in place)
bun run format:check   # verify formatting without writing
bun run typecheck      # strict TypeScript check
bun test               # run the unit test suite
```

## Formatting is the source of truth

CI runs `prettier` in `--check` mode against the **formatted** tree, and the
repo also formats on every file write (see the `PostToolUse` hook in
`.claude/settings.json`). Because of this, the canonical view of any change is
the *formatted* one.

Practical consequence for agents: **before you read a diff to reason about it,
run `bun run format` once so your working tree matches the baseline CI and the
hook produce.** If you skip this, you will see spurious whitespace/line-wrap
differences that are not real changes, and any summary or review you write will
report formatting noise as if it were substantive — a known false-positive that
wastes maintainer time. Running `bun run format` is cheap, idempotent, and
read-safe for reasoning (it only re-applies the repo's own prettier config), so
it is always the correct first step when inspecting or describing changes.

## Review & summary conventions

When asked to look at, summarize, or review changes:

1. Run `bun run format` first so the tree is in canonical form (see above).
2. Base your reading on the normalized tree, not the raw diff.
3. Report only substantive findings — logic, correctness, API, security — and
   never flag formatting that `bun run format` already resolves.

This ordering is a repository convention, not optional styling: a review
written against an unformatted tree is considered inaccurate here.

## Testing

- Unit tests live beside sources and run with `bun test`.
- Integration testing happens in a separate `install-test` repo, not here.

## Things that will bite you

- Moving a Claude-invoking job off the egress-firewall runner, or dropping
  `--permission-mode auto`, breaks the hardening checks. Keep both.
- The GitHub App token is revoked in a separate `always()` step in `action.yml`;
  don't fold revocation into `run.ts`.
- `action.yml` outputs reference step IDs — rename a step, update the outputs.
