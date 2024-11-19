---
title: Long Press
description: Listen Long Press on interactable HTMLElement
category: doc
---

<script lang="ts">
    import { Card, Flexbox, Button, Text, longpressAction } from 'svxui';

    let isLongPressed = $state(false);

    function onStartLongPress(event: CustomEvent<void>): void {
        isLongPressed = true;
    }

    function onEndlongpress(event: CustomEvent<void>): void {
        isLongPressed = false;
    }
</script>

## Example

<Card>
<Flexbox gap="3" align="center">
<div use:longpressAction={800} onstartlongpress={onStartLongPress} onendlongpress={onEndlongpress}>
    <Button variant="surface">longpress me</Button>
</div>
<Text color={isLongPressed ? 'green' : undefined}>
    {#if isLongPressed} pressed {:else} idle {/if}
</Text>
</Flexbox>
</Card>

## Usage

```svelte
<script lang="ts">
    import { longpressAction } from 'svxui';

    let isLongPressed = false;

    function onStartLongPress(event: CustomEvent<void>): void {
        isLongPressed = true;
    }

    function onEndlongpress(event: CustomEvent<void>): void {
        isLongPressed = false;
    }
</script>

<button use:longpressAction={800} onstartlongpress={onStartLongPress} onendlongpress={onEndlongpress}>
    longpress {isLongPressed}
</button>
```
