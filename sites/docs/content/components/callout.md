---
title: Callout
description: Highlighted short message.
category: doc
---

<script lang="ts">
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import Playground from '$lib/content/components/callout/playground.svelte';
    import { calloutSchema } from '$lib/content/components/callout/schema.js';
</script>

## Playground

<Playground/>

## API Reference

<ApiReferenceComponent schema={calloutSchema}/>
