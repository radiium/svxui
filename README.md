# svxui

A modern alternative Svelte 5 component library

> **Documentation:** [svxui.vercel.app →](https://svxui.vercel.app/)

## Overview

Svxui is a Svelte 5 component library inspired by the design system and DX of [@radix-ui/themes](https://www.radix-ui.com), powered by the [Radix color system](https://www.radix-ui.com/colors). It offers a prop-driven component API and a minimal CSS utility set — no Tailwind required.

The library is organized into five layers, from ready-to-use to fully custom:

- **Layouts** — Composable layout primitives (Box, Flex, Grid, Center, Sidebar, Switcher)
- **Components** — Pre-built, styled UI components
- **Builders** — Headless class-based state managers to build your own components
- **Attachments** — Composable Svelte 5 attachments for common behaviors
- **Utilities** — Standalone helper modules

## Features

- **Svelte 5 Native** — Built with runes (`$props`, `$state`, `$derived`, `$effect`) and Svelte 5 attachments
- **Fully Typed** — Complete TypeScript support with strict mode
- **Accessible** — ARIA compliant components with keyboard navigation
- **Color System** — 6 default palettes + all 32 Radix Colors palettes. Extend with custom palettes and semantic aliases via TypeScript namespace augmentation
- **Scoped Theming** — Global theming via `<ThemeProvider/>`, local overrides via `<ThemeScope/>`, runtime updates via `useTheme()`
- **Tree-shakeable** — Granular export map, import only what you need
- **Headless Builders** — Class-based state managers to build fully custom components with full a11y
- **Lightweight** — Single runtime dependency (`@floating-ui/dom`)

## Installation

```bash
npm install svxui
# or
pnpm add svxui
# or
yarn add svxui
```

## Requirements

- Node.js >= 22
- Svelte >= 5.54.0

## Contributing

Please follow our coding conventions.
See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License & Credits

This project is licensed under the MIT License.
See [NOTICE.md](./NOTICE.md) for a list of third-party code and credits.
