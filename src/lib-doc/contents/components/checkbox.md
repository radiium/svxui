---
title: Checkbox
description: Checkbox component
---

<script lang="ts">
    import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
    import {docCheckboxPropsDefs} from '$lib/components/Checkbox/Checkbox.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {}
</script>

## Playground

<Playground>
    <Checkbox slot="component" {...props} bind:checked={props.checked}/>
    <PlaygroundForm slot="form" bind:props schema={docCheckboxPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docCheckboxPropsDefs}></ApiReference>
