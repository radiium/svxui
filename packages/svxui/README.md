# svxui

Svxui is a Svelte 5 component library inspired by the design system and DX of [@radix-ui/themes](https://www.radix-ui.com), powered by the [Radix color system](https://www.radix-ui.com/colors). It takes a prop-driven approach to customization — for those who'd rather not count utility classes for a living.

> **Documentation:** [svxui.vercel.app →](https://svxui.vercel.app/)

## Installation

```bash
npm install svxui
# or
pnpm add svxui
# or
yarn add svxui
```

## Quick start

**1. Set up your root layout**

Add the required CSS and wrap your app with `<ThemeRootProvider/>`. All svxui components must be used inside it.

`tokens.css` and `theme.default.css` are required. The others are optional.

```svelte
<!-- src/routes/+layout.svelte -->
<script>
    import 'svxui/styles/tokens.css'; // Required
    import 'svxui/styles/theme.default.css'; // Required
    import 'svxui/styles/normalize.css'; // Optional
    import 'svxui/styles/utilities.css'; // Optional
    import { ThemeRootProvider } from 'svxui';

    let { children } = $props();
</script>

<ThemeRootProvider>
    {@render children?.()}
</ThemeRootProvider>
```

**2. Start building**

```svelte
<!-- src/routes/+page.svelte -->
<script>
    import { Button } from 'svxui';
</script>

<Button>Hello</Button>
```

## License & Credits

MIT License.
See [NOTICE.md](https://github.com/radiium/svxui/blob/main/NOTICE.md) for third-party credits.
