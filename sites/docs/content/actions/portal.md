---
title: portalAction
description: Transfert HTMLElement to another container
category: actions
---

<script lang="ts">
    import { isMobile } from '$lib/utils/reponsive.js';
    import { Card, Flexbox, Button, Text, portalAction } from 'svxui';

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
        portal is 
        <Text color={enabled ? 'green' : 'red'}>
            {#if enabled} enabled {:else} disabled {/if}
        </Text>
    </Text>
</Flexbox>
<Flexbox gap="3" wrap="nowrap" direction={$isMobile ? 'column' : 'row'}>
<Card variant="outline" style="min-height: 100%">
    <Flexbox gap="3" direction="column" >
    <Text>Source container</Text>
    <div use:portalAction={{enabled, target: "#destination"}}>
    <Card variant="surface">Portal content</Card>
    </div>
    </Flexbox>
</Card>

<Card variant="outline">
    <Flexbox gap="3" direction="column" >
    <Text>Destination container</Text>
    <div id="destination"></div>
    </Flexbox>
</Card>
</Flexbox>

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