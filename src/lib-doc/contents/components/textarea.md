---
title: Textarea
description: Textarea component
---

<script lang="ts">
    import Textarea from '$lib/components/Textarea/Textarea.svelte';
    import {docTextareaPropsDefs} from '$lib/components/Textarea/Textarea.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {}
</script>

## Playground

<Playground>
    <Textarea slot="component" {...props} bind:value={props.value} />
    <PlaygroundForm slot="form" bind:props schema={docTextareaPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docTextareaPropsDefs}></ApiReference>
