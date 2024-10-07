---
title: Portal
description: Transfert HTMLElement to another container
category: doc
---

<script lang="ts">
    import { Card, Flexbox, Text, portalAction } from 'sveltr';

    let isEnabled = false;
</script>

## Example

<Card>
<Flexbox gap="3" wrap="nowrap">
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
    import { portalAction } from 'sveltr';
</script>

<div id="destination">destination</div>

<div use:portalAction="#destination">Content</div>
```
