---
title: Accordion
description: Headless collapsible component.
category: components
---

<script lang="ts">
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import Playground from '$lib/content/components/accordion/playground.svelte';
    import { accordionGroupSchema, accordionSchema } from '$lib/content/components/accordion/schema.js';
</script>

## Playground

<Playground/>

## API Reference

### AccordionGroup

<ApiReferenceComponent schema={accordionGroupSchema}/>

### Accordion

<ApiReferenceComponent schema={accordionSchema}/>
