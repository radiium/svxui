---
title: Link
description: Customisable anchor component.
category: doc
---

<script lang="ts">
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import Playground from '$lib/content/components/link/playground.svelte';
    import { linkSchema } from '$lib/content/components/link/schema.js';
</script>

## Playground

<Playground/>

## API Reference

<ApiReferenceComponent schema={linkSchema}/>
