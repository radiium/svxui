---
title: Portal
description: Portal component
---

<script lang="ts">
    import Portal from '$lib/components/Portal/Portal.svelte';
    import Card from '$lib/components/Card/Card.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import {docPortalPropsDefs} from '$lib/components/Portal/Portal.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
</script>

## API Reference

<ApiReference data={docPortalPropsDefs}></ApiReference>

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

```svelte example column
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
