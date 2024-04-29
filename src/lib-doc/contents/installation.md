---
title: Installation
description:
---

<script>
    import Badge from '$lib/components/Badge/Badge.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';
</script>

### 1. Install svxui

Install <CodeInline>`svxui`</CodeInline> with the package manager of your choice

```bash
npm install svxui
pnpm install svxui
yarn add svxui
```

### 2. Add the ThemeProvider component

Wrap your application with the <CodeInline>`<ThemeProvider/>`</CodeInline> component in the root <CodeInline>`+layout.svelte`</CodeInline>.

```svelte
<script>
    import { ThemeProvider } from 'svxui';
</script>

<ThemeProvider>
    <slot />
</ThemeProvider>
```

### 3. start building

Your app is ready for use <CodeInline>`svxui`</CodeInline>!

```svelte
<script>
    import { Button } from 'svxui';
</script>

<Button>Button</Button>
```
