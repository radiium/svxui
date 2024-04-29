---
title: Card
description: Card component
---

<script lang="ts">
    import Card from '$lib/components/Card/Card.svelte';
    import {docCardPropsDefs} from '$lib/components/Card/Card.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';

    let props = {}
</script>

## Playground

<Playground >
<Card {...props} slot="component">Card content</Card>
<PlaygroundForm bind:props schema={docCardPropsDefs} slot="form" />
</Playground>

## API Reference

Extend <CodeInline>`HTMLAttributes<HTMLDivElement>`</CodeInline>

<ApiReference data={docCardPropsDefs}></ApiReference>
