---
title: Accordion
description: Headless collapsible component.
category: doc
---

<script lang="ts">
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import Playground from '$lib/content/components/accordion/playground.svelte';
    import { accordionGroupSchema, accordionItemSchema } from '$lib/content/components/accordion/schema.js';
</script>

## Playground

<Playground/>

## API Reference

### AccordionGroup

<ApiReferenceComponent schema={accordionGroupSchema}/>

### AccordionItem

<ApiReferenceComponent schema={accordionItemSchema}/>
