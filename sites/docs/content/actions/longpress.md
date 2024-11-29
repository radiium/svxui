---
title: longPress
description: Listen Long Press on interactable HTMLElement
category: actions
---

<script lang="ts">
    import { Card, Flexbox, Button, Text, longpressAction } from 'svxui';

    let isLongPressed = $state(false);

    function onstartlongpress(event: CustomEvent<void>): void {
        isLongPressed = true;
    }

    function onendlongpress(event: CustomEvent<void>): void {
        isLongPressed = false;
    }
</script>

## Example

<Card>
<Flexbox gap="3" align="center">
<div use:longpressAction={800} {onstartlongpress} {onendlongpress}>
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

## Type

### Parameters

```ts
export type LongpressParameters = {
    /**
     * Enable/disable lock scroll
     * @default true
     */
    enabled?: boolean;
    /**
     * Time in milliseconds before start longpress
     * @default 800
     */
    duration?: number;
};
```

### Attributes

```ts
export type LongpressAttributes = {
    /**
     * Event fired when longpress start
     */
    onstartlongpress?: (e: CustomEvent<void>) => void;
    /**
     * Event fired when longpress end
     */
    onendlongpress?: (e: CustomEvent<void>) => void;
};
```
