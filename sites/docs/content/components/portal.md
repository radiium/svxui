---
title: Portal
description: Simple portal component
category: doc
---

<script lang="ts">
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import SamplePortal from '$lib/content/components/portal/SamplePortal.svelte';
    import {portalSchema} from '$lib/content/components/portal/schema.js';
</script>

## API Reference

<ApiReferenceComponent schema={portalSchema}/>

<!-- <Flexbox gap="3" >
    <Flexbox gap="3" direction="column" class="flex-grow-1">
        <h4>Portal source</h4>
        <Card class="flex-grow-1">
            <Portal target="#portal-targete">
                Portal content
            </Portal>
        </Card>
    </Flexbox>
    <Flexbox gap="3" direction="column" class="flex-grow-1">
        <h4>Portal target</h4>
        <Card id="portal-targete"></Card>
    </Flexbox>
</Flexbox> -->

## Example

<SamplePortal/>

```svelte title="lala"
<script>
    import { Portal, Card, Text } from 'svxui';
</script>

<Portal target="#portal-target">
    <Text color="primary">Portal content</Text>
</Portal>

<Card id="portal-target">Portal target</Card>
```

<!-- #### Portal source
<Card class="mb-5">
    <Portal target="#portal-target">
        Portal content
    </Portal>
</Card>

#### Portal target
<Card id="portal-target"></Card> -->
