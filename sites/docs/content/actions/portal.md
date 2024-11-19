---
title: Portal
description: Transfert HTMLElement to another container
category: doc
---

<script lang="ts">
    import { isMobile } from '$lib/utils/reponsive.js';
    import { Card, Flexbox, Text, portalAction } from 'svxui';

    let isEnabled = $state(false);
</script>

## Example

<Card>
<Flexbox gap="3" wrap="nowrap" direction={$isMobile ? 'column' : 'row'}>
<Card variant="outline" style="min-height: 100%">
    <Flexbox gap="3" direction="column" >
    <Text>Source container</Text>
    <div use:portalAction={"#destination"}>
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

<div use:portalAction="#destination">Content</div>
```
