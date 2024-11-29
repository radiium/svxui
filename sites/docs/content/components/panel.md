---
title: Panel
description: Simple content container with multiple variants.
category: components
---

<script lang="ts">
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import Playground from '$lib/content/components/panel/playground.svelte';
    import { panelSchema } from '$lib/content/components/panel/schema.js';
</script>

## Playground

<Playground/>

## API Reference

<ApiReferenceComponent schema={panelSchema}/>
