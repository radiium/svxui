---
title: LockScroll
description: Block Scroll of given HTMLElement
category: doc
---

<script lang="ts">
    import { Card, Flexbox, Button, Text, lockscrollAction } from 'svxui';

    let isEnabled = $state(false);
</script>

## Example

<Card>
<Flexbox gap="3" align="center" class="mb-5">
    <Button
        variant="surface"
        onclick={() => (isEnabled = !isEnabled)}
    >
        toggle
    </Button>
    <Text>
        scroll is 
        <Text color={isEnabled ? 'red' : 'green'}>
            {#if isEnabled} disabled {:else} enabled {/if}
        </Text>
    </Text>
</Flexbox>

<Card variant="outline" size="0" style="display: block;">
    <ul use:lockscrollAction={isEnabled} class="py-3" style="height: 100px; display: flex; flex-direction: column; overflow: scroll;">
        {#each Array(10) as _, i}
            <li>{i} item</li>
        {/each}
    </ul>
</Card>
</Card>

## Usage

```svelte
<script lang="ts">
    import { Button, lockscroll } from 'svxui';

    let enabled = false;
    function onLockScrollChange(event: CustomEvent<HTMLElement>): void {
        console.log(event.detail);
    }
</script>

<button onclick={() => (enabled = !enabled)}>{enabled ? : 'disable' : 'enable'}</button>

<div use:lockscrollAction={enabled} onlockscrollchange={onLockScrollChange}>Content</div>
```
