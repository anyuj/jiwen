# Jiwen

Jiwen is a Turborepo workspace for the Jiwen product suite.

## Workspace

- `apps/app`: main web app
- `apps/docs`: documentation site
- `apps/form`: form frontend page
- `packages/auth`: shared auth helpers
- `packages/db`: database schema and migrations
- `packages/email`: transactional email templates
- `packages/lib`: shared constants, config, helpers, and types
- `packages/ui`: shared UI components and styles
- `packages/tsconfig`: shared TypeScript configs

Internal package imports use the `@jiwen/*` scope.

## Commands

```sh
bun install
bun run dev
bun run build
bun run check-types
bun run lint
```
