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

## Example

<SamplePortal/>

## Usage

```svelte
<script>
    import { Portal, Card, Text } from 'svxui';
</script>

<Portal target="#portal-target">
    <Text color="primary">Portal content</Text>
</Portal>

...
<!-- elsewhere in your application -->
<div id="portal-target">Portal target</div>
```

## API Reference

<ApiReferenceComponent schema={portalSchema}/>
