---
title: clickOutside
description: Listen click outside given HTMLElement
category: doc
---

<script lang="ts">
    import { Card, Text, clickOutsideAction } from 'svxui';

    let isClickedOutside = $state(undefined);
    function onClickInside(event: CustomEvent<MouseEvent>): void {
        console.log('click inside', event.detail);
        isClickedOutside = false;
    }

    function onClickOutside(event: CustomEvent<MouseEvent>): void {
        console.log('click outside', event.detail.pointerType, event.detail);
        isClickedOutside = true;
    }
</script>

## Example

<Card>
<div
    use:clickOutsideAction={{
        enabled: true,
        event: 'pointerdown',
        options: true
    }}
    onclickinside={onClickInside}
    onclickoutside={onClickOutside}
>
    <Card variant="outline" class="p-7">
        <Text>
            Clicked:
            {#if isClickedOutside === true}
                <Text color="green">outside</Text>
            {:else if isClickedOutside === false}
                <Text color="red">inside</Text>
            {:else}
                <Text disabled>idle</Text>
            {/if}
        </Text>
    </Card>
</div>
</Card>

## Usage

```svelte
<script lang="ts">
    import { clickOutsideAction } from 'svxui';

    function onclickinside(event: CustomEvent<MouseEvent>): void {
        console.log('click inside', event.detail);
    }

    function onclickoutside(event: CustomEvent<MouseEvent>): void {
        console.log('click outside', event.detail);
    }
</script>

<div use:clickOutsideAction {onclickinside} {onclickoutside}>
    Content
</div>
```

## Type

### Parameters

```ts
export type ClickOutsideParameters = {
    /**
     * Enable/disable click event
     * @default true
     */
    enabled?: boolean;
    /**
     * Type of event
     * @default 'click'
     */
    event?: 'click' | 'mousedown' | 'pointerdown';
    /**
     * Options of event listener or boolean for capture
     * @default true
     */
    options?: AddEventListenerOptions | boolean;
};
```

### Attributes

```ts
export type ClickOutsideAttributes = {
    /**
     * Event fired when click inside
     */
    onclickinside: (e: CustomEvent<MouseEvent>) => void;
    /**
     * Event fired when click outside
     */
    onclickoutside: (e: CustomEvent<MouseEvent>) => void;
};
```
