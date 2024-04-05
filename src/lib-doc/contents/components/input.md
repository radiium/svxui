---
title: Input
description: Input component
---

<script lang="ts">
    import Input from '$lib/components/Input/Input.svelte';
    import {docInputPropsDefs} from '$lib/components/Input/Input.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {}
</script>

## Playground

<Playground>
    <Input slot="component" {...props} bind:value={props.value}/>
    <PlaygroundForm slot="form" bind:props schema={docInputPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docInputPropsDefs}></ApiReference>
