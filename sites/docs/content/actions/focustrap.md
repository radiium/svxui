---
title: focusTrap
description: Traps focus inide given HTMLElement
category: actions
---

<script lang="ts">
    import { Card, Flexbox, Text, Button, Input, focusTrapAction } from 'svxui';

    let enabled = $state(false);
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
        focusTrap is 
        <Text color={enabled ? 'green' : 'red'}>
            {#if enabled} enabled {:else} disabled {/if}
        </Text>
    </Text>
</Flexbox>

<Card variant="outline" style="display: block; max-width: 200px;">
<div use:focusTrapAction={{enabled}} style="display: flex; flex-direction: column; gap: 10px;">
    <Input placeholder="login"/>
    <Input placeholder="password" disabled/>
    <Button>sign in</Button>
</div>
</Card>
</Card>

## Usage

```svelte
<script lang="ts">
    import { focusTrapAction } from 'svxui';

    let enabled = $state(false);
</script>

<button onclick={() => (enabled = !enabled)}>toggle</button>

<div use:focusTrapAction={{enabled}}>
    <input />
</div>
```

## Type

### Parameters

```ts
export type FocusTrapParameters = {
    /**
     * Enable/disable focus trap
     * @default true
     */
    enabled?: boolean;
};
```