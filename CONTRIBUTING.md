# Contributing

## Project Structure

```
├── apps
│   └── docs                # Documentation site
└── packages
    ├── svxui               # The svxui library
    ├── svxui-docgen        # Library doc json generator
    └── svxui-eslint-rules  # Shared eslint rules
```

## Library structure

```
packages/svxui/src/lib/
├── attachments/     # Svelte attachments
├── builders/        # Headless state management
├── components/      # UI components
└── utilities/       # Helper modules
```

## Folder Structure

Each module follows this structure:

### Attachments
```
[module-name]/
├── internals/                      # Internal helpers (not exported)
├── [module-name].svelte.ts         # Implementation
├── [module-name].svelte.test.ts    # Tests
├── types.ts                        # Type definitions
└── index.ts                        # Public exports
```

### Components
```
[module-name]/
├── components/*.svelte             # Implementation(s)
├── [module-name].svelte.test.ts    # Tests
├── types.ts                        # Type definitions
└── index.ts                        # Public exports
```

### Builders
```
[module-name]/
├── internals/                      # Internal helpers (not exported)
├── [module-name]-builder.svelte.ts # Implementation
├── [module-name]-builder.svelte.test.ts # Tests
├── types.ts                        # Type definitions
└── index.ts                        # Public exports
```

### Utilities
```
[module-name]/
├── [module-name].ts                # Implementation
├── [module-name].test.ts           # Tests
├── types.ts                        # Type definitions
└── index.ts                        # Public exports
```

## Setup

```bash
pnpm install
```

To develop the library:

```bash
cd packages/svxui
pnpm run dev
```

To develop the documentation site:

```bash
cd apps/docs
pnpm run dev
```

## Commands

From the repo root:

```bash
pnpm run check       # Type-check all packages
pnpm run lint        # Lint all packages
pnpm run lint:fix    # Auto-fix lint issues
pnpm run format      # Format with Prettier
```

From `packages/svxui`:

```bash
pnpm run test:unit          # Run unit tests (watch)
pnpm run test:unit -- --run # Run unit tests once
pnpm run test:e2e           # Run Playwright E2E tests
```

## Code conventions

- **Svelte 5 only** — use runes (`$props`, `$state`, `$derived`, `$effect`). No Svelte 4 syntax.
- **TypeScript strict** — all props and return types must be typed. Keep types in `types.ts`.
- **Every test must have at least one assertion.**
- **Formatting** — Prettier is enforced (4 spaces, single quotes, semicolons, 110 char width). Run `pnpm run format` before committing.
- Components must extend the relevant native HTML attributes and expose a bindable `ref` prop.

## Submitting a PR

1. Run `pnpm run check && pnpm run lint && pnpm run test:unit -- --run` and make sure everything passes.
2. Keep the PR focused — one feature or fix per PR.
3. If you add a component or builder, include tests.
