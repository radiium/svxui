---
title: lockScrollAction
description: Block Scroll of given HTMLElement
category: actions
---

<script lang="ts">
    import { Card, Flexbox, Button, Text, lockScrollAction } from 'svxui';

    let enabled = $state(false);
    function onlockscrollchange(event: CustomEvent<boolean>): void {
        console.log('lock scroll', event.detail);
    }
</script>

## Example

<Card>
<Flexbox gap="3" align="center" class="mb-5">
    <Button
        variant="surface"
        onclick={() => (enabled = !enabled)}
    >
        toggle
    </Button>
    <Text>
        lock scroll is 
        <Text color={enabled ? 'green' : 'red'}>
            {#if enabled} enabled {:else} disabled {/if}
        </Text>
    </Text>
</Flexbox>

<Card variant="outline" size="0" style="display: block;">
    <ul use:lockScrollAction={{enabled}} {onlockscrollchange} class="py-3" style="height: 100px; display: flex; flex-direction: column; overflow: scroll;">
        {#each Array(10) as _, i}
            <li>{i} item</li>
        {/each}
    </ul>
</Card>
</Card>

## Usage

```svelte
<script lang="ts">
    import { Button, lockScrollAction } from 'svxui';

    let enabled = false;
    function onlockscrollchange(event: CustomEvent<boolean>): void {
        console.log('lock scroll', event.detail);
    }
</script>

<button onclick={() => (enabled = !enabled)}>{enabled ? : 'disable' : 'enable'}</button>

<div use:lockScrollAction={{enabled}} {onlockscrollchange}>Content</div>
```

## Types

### Parameters

```ts
export type LockScrollParameters = {
    /**
     * Enable/disable lock scroll
     * @default true
     */
    enabled?: boolean;
};
```

### Attributes

```ts
export type LockScrollAttributes = {
    /**
     * Event fired when lock scroll enabled/disabled change
     */
    onlockscrollchange?: (e: CustomEvent<boolean>) => void;
};
```