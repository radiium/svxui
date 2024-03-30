---
title: InputNumber
description: InputNumber component
---

<script lang="ts">
    import InputNumber from '$lib/components/InputNumber/InputNumber.svelte';
    import {docInputNumberPropsDefs} from '$lib/components/InputNumber/InputNumber.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {}
</script>

## Playground

<Playground>
    <InputNumber slot="component" {...props} bind:value={props.value}/>
    <PlaygroundForm slot="form" bind:props schema={docInputNumberPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docInputNumberPropsDefs}></ApiReference>
