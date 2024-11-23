---
title: hotkey
description: Listen hot key shortcut
category: doc
---

<script lang="ts">
    import { Card, Flexbox, Button, Text, hotkeyAction } from 'svxui';
    import { onMount } from 'svelte';

    let enabled = $state(true);
    let logs = $state([])
    let hotkey;

    function log({key, modifier}: {key: string; modifier: string;}): void {
        logs.unshift(`${new Date().toLocaleString()}: ${modifier} + ${key} pressed!`);
        if (logs.length > 10) {
            logs.pop()
        }
    }


    onMount(() => {
        const hotkey = hotkeyAction(window, {
            enabled: true,
            trigger: [
                {
                    key: 'c',
                    modifier: 'ctrl',
                    enabled: true,
                    callback: (detail) => {
                        console.log(detail)
                        log(detail.trigger);
                    }
                },
                {
                    key: 'v',
                    modifier: 'ctrl',
                    enabled: true,
                    callback: (detail) => {
                        log(detail.trigger);
                    }
                }
            ]
        });

        return () => hotkey.destroy();
    });
</script>

## Example

<Card>
<Flexbox gap="3">
    <Flexbox gap="1" direction="column" class="flex-fill">
        <Text>
            Press 
            <Text color="primary">Ctrl + c</Text>
            or
            <Text color="primary">Ctrl + v</Text>
        </Text>
    </Flexbox>
    <Card variant="surface" size="1" radius="small" class="flex-fill">
        <Flexbox gap="1" direction="column">
            {#each logs as line}
                <Text as="div" disabled>{line}</Text>
            {/each}
        </Flexbox>
    </Card>
</Flexbox>
</Card>

## Usage

```svelte
<script lang="ts">
    import { hotkeyAction } from 'svxui';
</script>

<svelte:window
    use:hotkeyAction={{
        trigger: [
            {
                key: 'k',
                modifier: ['ctrl', 'meta'],
                callback: (detail) => {
                    console.log(detail)
                    console.log('Ctrl + k pressed!')
                }
            },
            {
                key: 'v',
                modifier: ['ctrl', 'meta'],
                callback: (detail) => {
                    console.log('Ctrl + v pressed!')
                }
            }
        ]
    }}
/>
```

## Type

### Parameters

```ts
export type HotkeyParameters = {
    /**
     * Enable/disable hot key
     * @default true
     */
    enabled?: boolean;
    /**
     * Hot keys config
     * @default 'keydown'
     */
    trigger: Array<ShortcutTrigger> | ShortcutTrigger;
    /**
     * Event type
     * @default 'keydown'
     */
    type?: 'keydown' | 'keyup';
};
```

### Attributes

```ts
export type HotkeyAttributes = {
    /**
     * Event fired when hotkey pressed
     */
    onhotkey?: (event: CustomEvent<ShortcutEventDetail>) => void;
};
```

### Others

```ts
export interface ShortcutEventDetail {

    node: HTMLElement;
    trigger: ShortcutTrigger;
    originalEvent: KeyboardEvent;
}

export type HotkeyAttributes = {
    /**
     * Event fired when hotkey pressed
     */
    onhotkey?: (event: CustomEvent<ShortcutEventDetail>) => void;
};
```
