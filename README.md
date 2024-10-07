# sveltr

This library is an attempt to port the great [Radix UI Themes](https://www.radix-ui.com/themes/docs/overview/getting-started) to svelte using html tags whenever possible

Features: 
-  [x] 23 components (some from Radix UI Themes others not)
-  [x] Color based on [Radix Colors](https://www.radix-ui.com/colors)
-  [x] Support system/Light/dark Themes
-  [x] No flash of unstyled content
-  [x] Configurable radius, global or by component 
-  [x] Theme persisted in localstorage
-  [ ] Customizable colors palette (gray/primary/green/blue/yellow/orange/red) **soon**
-  [ ] Compatible ssr/ssg **soon**

## Installation

```bash
npm install sveltr
pnpm install sveltr
yarn add sveltr
```

## Documentation

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

Some parts of this lib come from the following:  
(thanks to the developers for their incredible work!)

-   [Radix UI](https://www.radix-ui.com/)
-   [Svecosystem](https://github.com/svecosystem)
-   [sthemer](https://github.com/ivanhofer/sthemer)
-   [svelte-portal](https://github.com/romkor/svelte-portal)
-   [trap-focus-svelte](https://github.com/henrygd/trap-focus-svelte)
-   [clsx](https://github.com/lukeed/clsx)
