---
title: Getting started
description: Installation
category: guide
---

<script>
    import { Badge, TabGroup, TabTrigger, TabPanel, Card, Flexbox, Button } from 'svxui';

let selectedTab = 'npm'
</script>

### 1. Install svxui

Install `svxui` with the package manager of your choice

<TabGroup>
    <Flexbox gap="1" class="p-1 mb-3">
    <TabTrigger value="pnpm" let:isActive let:select>
        <Button variant={isActive ? 'soft' : 'clear'} size="2" on:click={select}>pnpm</Button>
    </TabTrigger>
    <TabTrigger value="npm" let:isActive let:select>
        <Button variant={isActive ? 'soft' : 'clear'} size="2" on:click={select}>npm</Button>
    </TabTrigger>
    <TabTrigger value="yarn" let:isActive let:select>
        <Button variant={isActive ? 'soft' : 'clear'} size="2" on:click={select}>yarn</Button>
    </TabTrigger>
    </Flexbox>

<TabPanel value="pnpm">

```bash
pnpm install svxui
```

</TabPanel>
<TabPanel value="npm">

```bash
npm install svxui
```

</TabPanel>
<TabPanel value="yarn">

```bash
yarn add svxui
```

</TabPanel>
</TabGroup>

### 2. Add the ThemeProvider component

Wrap your application with the `<ThemeProvider/>{:svelte}` component in the root `+layout.svelte`.

```svelte title="+layout.svelte"
<script>
    import { ThemeProvider } from 'svxui';
</script>

<ThemeProvider>
    <slot />
</ThemeProvider>
```

### 3. start building

Your app is ready for use **svxui**!

```svelte
<script>
    import { Button } from 'svxui';
</script>

<Button>Button</Button>
```

<style>
    figure {
        margin-bottom: var(--space-3);
    }
</style>
