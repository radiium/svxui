---
title: Getting started
description: Installation
category: guide
---

<script>
    import { Badge, TabGroup, TabTrigger, TabPanel, Card, Flexbox, Button } from 'svxui';

    let selectedTab = $state('pnpm')
</script>

### 1. Install svxui

Install `svxui` with the package manager of your choice

<TabGroup bind:selected={selectedTab}>
    <Flexbox gap="1" class="p-1 mb-1">
    <TabTrigger value="pnpm">
        {#snippet children({ isActive, select})}
        <Button variant={isActive ? 'soft' : 'clear'} size="2" onclick={select}>pnpm</Button>
        {/snippet}
    </TabTrigger>
    <TabTrigger value="npm">
        {#snippet children({ isActive, select})}
        <Button variant={isActive ? 'soft' : 'clear'} size="2" onclick={select}>npm</Button>
        {/snippet}
    </TabTrigger>
    <TabTrigger value="yarn">
        {#snippet children({ isActive, select})}
        <Button variant={isActive ? 'soft' : 'clear'} size="2" onclick={select}>yarn</Button>
        {/snippet}
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

```svelte title="+page.svelte"
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
