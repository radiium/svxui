---
title: Create Floating
description: Create floating action
category: doc
---

<script lang="ts">
    import { Card, Flexbox, Button, createFloating } from 'svxui';
    import { fade } from 'svelte/transition';

    let isOpen = false;

    const {
        actions: { referenceAction, floatingAction, arrowAction },
        states: { updateProps, props, state }
    } = createFloating({
        strategy: 'absolute',
        transform: true,
        autoUpdate: true,
        placement: 'top',
        arrow: false,
        offset: 10
    });
</script>

## Exemple

<Card style="overflow: visible;">
<Flexbox direction="column" align="start" justify="start">
<div use:referenceAction>
<Button variant="surface" on:click={() => (isOpen = !isOpen)}>Open</Button>
</div>

{#if isOpen}

<div 
    use:floatingAction 
    transition:fade={{ duration: 100 }}
 class="floating">
    <Card style="background: var(--gray-2)">Content</Card>
</div>
{/if}
</Flexbox>
</Card>

## Usage

```svelte
<script lang="ts">
    import { createFloating } from 'svxui';
    import { fade } from 'svelte/transition';

    let isOpen = false;

    const {
        actions: { referenceAction, floatingAction, arrowAction },
        states: { updateProps, props, state }
    } = createFloating({
        strategy: 'absolute',
        transform: true,
        autoUpdate: true,
        placement: 'top',
        arrow: false,
        offset: 10
    });
</script>

<button use:referenceAction on:click={() => (isOpen = !isOpen)}>Open</button>

{#if isOpen}
    <div use:floatingAction transition:fade class="floating">Content</div>
{/if}
```

<style lang="scss">
    .floating {
        position: absolute;
        width: max-content;
        top: 0;
        left: 0;
    }
</style>
