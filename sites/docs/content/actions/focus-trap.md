---
title: Focus Trap
description: Traps focus inide given HTMLElement
category: doc
---

<script lang="ts">
    import { Card, Flexbox, Text, Button, Input, focusTrapAction } from 'svxui';

    let isEnabled = false;
</script>

## Example

<Card>
<Flexbox gap="3" align="center" class="mb-5">
    <Button
        variant="surface"
        on:click={() => (isEnabled = !isEnabled)}
    >
        toggle
    </Button>
    <Text>
        focusTrap is 
        <Text color={isEnabled ? 'green' : 'red'}>
            {#if isEnabled} enabled {:else} disabled {/if}
        </Text>
    </Text>
</Flexbox>

<Card variant="outline" style="display: block; max-width: 200px;">
<div use:focusTrapAction={isEnabled} style="display: flex; flex-direction: column; gap: 10px;">
    <Input placeholder="login"/>
    <Input placeholder="password"/>
    <Button>sign in</Button>
</div>
</Card>
</Card>

## Usage

```svelte
<script lang="ts">
    import { focusTrapAction } from 'svxui';

    let enabled = false;
</script>

<button on:click={() => (enabled = !enabled)}>toggle</button>

<div use:focusTrapAction={enabled}>
    <input />
</div>
```
