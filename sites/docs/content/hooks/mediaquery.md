---
title: useMediaQuery
description: Create floating action
category: hook
---

<script lang="ts">
    import { isMobile } from '$lib/utils/reponsive.js';
    import { Card, Flexbox, Button, Text, useMediaQuery } from 'svxui';

    const isSmallScreen = useMediaQuery('(max-width: 520px)');
    const prefersColorScheme = useMediaQuery("(prefers-color-scheme: dark)");
</script>

## Example


<Card>
<Card variant="outline" class="p-7">
<Flexbox>
<Text>
    isSmallScreen:
    {#if $isSmallScreen}
        <Text color="green">true</Text>
    {:else}
        <Text disabled>false</Text>
    {/if}
</Text>
</Flexbox>

<Flexbox>
<Text>
    prefersColorScheme:
    {#if $prefersColorScheme}
        <Text color="green">true</Text>
    {:else}
        <Text disabled>false</Text>
    {/if}
</Text>
</Flexbox>
</Card>
</Card>

## Usage

```svelte
<script lang="ts">
    import { portalAction } from 'svxui';
</script>

<div id="destination">destination</div>

<div 
    use:portalAction={{
        target: "#destination"
    }}>
    Content
</div>
```

## Types

### Parameters

```ts
export type PortalParameters = {
    /**
     * Enable/disable portal
     * @default true
     */
    enabled?: boolean;
    /**
     * Portal target
     * @default 'body'
     */
    target?: HTMLElement | string | undefined;
};
```