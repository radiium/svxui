# svxui

An alternative Svelte 5 component library

--- 

[Documentation](https://svxui.vercel.app/)

## Overview

Svxui is a component library for Svelte 5 inspired by [@radix-ui/themes](https://www.radix-ui.com). Proposed as an alternative to Tailwincss-based solutions, the library offers developers a different approach to creating modern interfaces.

## Components

The library includes a collection of +20 UI components and an assortment of handy utility functions/classes.

## Color System

The library implements a color system based on [@radix-ui/colors](https://www.radix-ui.com/colors). Comes with default color palettes, the system offers developers the ability to incorporate additional color aliases from the full range of Radix palettes to meet specific design requirements.

## Theming System

The library include theming system with support for light, dark, and system preference modes. This implementation draws inspiration from Svelte 5 [mode-watcher](https://mode-watcher.sveco.dev/) library.

Key features of the theming system include:

- Full compatibility with server-side rendering (SSR) and static site generation (SSG)
- Prevention of Flash Of Unstyled Content (FOUC) during theme transitions
- Active monitoring of system preference changes to maintain synchronization
- Smooth visual transitions when switching between themes

## Developer Experience

Built specifically for Svelte 5, the library offers a straightforward development experience with TypeScript support. Developers will find helpful autocompletion, type checking, and inline documentation to make implementation easier.

## Extensibility

While providing a comprehensive set of pre-designed components, the library remains highly extensible. Developers can customize existing components or build upon them to create specialized variants that match specific design requirements.

## Installation

```bash
npm install svxui
pnpm install svxui
yarn add svxui
```

## Development

### Install 

```bash
pnpm install
```

### Serve docs site + lib

```bash
pnpm run dev
```

### Serve lib only

```bash
pnpm run dev:lib
```

## Credits

Some parts of this library are inspired or derived from:
- [@radix-ui/themes](https://www.radix-ui.com/themes/)
- [@radix-ui/colors](https://www.radix-ui.com/colors/)
- [bits-ui](https://www.bits-ui.com/)
- [melt](https://www.melt-ui.com/)
- [mode-watcher](https://mode-watcher.sveco.dev/)
- [runed](https://runed.dev/)
- [svelte-portal](https://github.com/romkor/svelte-portal)
- [trap-focus-svelte](https://github.com/henrygd/trap-focus-svelte)