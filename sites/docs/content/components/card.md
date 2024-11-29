---
title: Card
description: Simple content container with multiple variants.
category: components
---

<script lang="ts">
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import Playground from '$lib/content/components/card/playground.svelte';
    import { cardSchema } from '$lib/content/components/card/schema.js';
</script>

## Playground

<Playground/>

## API Reference

<ApiReferenceComponent schema={cardSchema}/>
