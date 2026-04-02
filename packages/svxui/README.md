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

Add the required CSS and wrap your app with `<ThemeProvider/>`. All svxui components must be used inside it.

`theme.default.css` and `tokens.css` are required. The others are optional.

```svelte
<!-- src/routes/+layout.svelte -->
<script>
    import 'svxui/styles/theme.default.css'; // Required
    import 'svxui/styles/tokens.css'; // Required
    import 'svxui/styles/normalize.css'; // Optional
    import 'svxui/styles/utilities.css'; // Optional
    import { ThemeProvider } from 'svxui';

    let { children } = $props();
</script>

<ThemeProvider>
    {@render children?.()}
</ThemeProvider>
```

**2. Start building**

```svelte
<!-- src/routes/+page.svelte -->
<script>
    import { Button } from 'svxui';
</script>

<Button>Hello</Button>
```

## Imports

Import everything from the root entry point:

```ts
import { Button, Badge, Dialog } from 'svxui';
```

Each layer also has its own entry point for granular imports:

```ts
// Components
import { Button } from 'svxui/components/button';

// Builders
import { TabsBuilder } from 'svxui/builders/tabs';
import { DialogBuilder } from 'svxui/builders/dialog';

// Attachments
import { clickoutside } from 'svxui/attachments/clickoutside';
import { focustrap } from 'svxui/attachments/focustrap';

// Utilities
import { hotkeys } from 'svxui/utilities/hotkeys';
import { PersistedState } from 'svxui/utilities/persisted-state';
```

## Theming

Configure the global theme with `<ThemeProvider/>` and override it locally with `<ThemeScope/>`:

```svelte
<script>
    import { ThemeProvider, ThemeScope, Button } from 'svxui';
</script>

<!-- Global theme: dark mode, blue accent, large radius -->
<ThemeProvider mode="dark" color="blue" radius="large">

    <!-- Local override: neutral color for this subtree -->
    <ThemeScope color="neutral">
        <Button>Neutral button</Button>
    </ThemeScope>

</ThemeProvider>
```

Update the theme at runtime with `useTheme()`:

```svelte
<script>
    import { useTheme } from 'svxui';

    const theme = useTheme();
</script>

<button onclick={() => theme.setMode('dark')}>Dark mode</button>
<button onclick={() => theme.setColor('blue')}>Blue</button>
<button onclick={() => theme.setRadius('full')}>Full radius</button>
```

## Color system

6 palettes are included by default: `neutral`, `blue`, `green`, `yellow`, `orange`, `red`.

All 32 [Radix Colors](https://www.radix-ui.com/colors) palettes are available as individual CSS files:

```js
import 'svxui/styles/colors/crimson.css';
import 'svxui/styles/colors/violet.css';
```

You can also define custom palettes and semantic aliases (`primary`, `danger`, `info`) with TypeScript namespace augmentation. See [Colors](https://svxui.vercel.app/docs/colors) in the docs.

## License & Credits

MIT License.
See [NOTICE.md](https://github.com/radiium/svxui/blob/main/NOTICE.md) for third-party credits.
