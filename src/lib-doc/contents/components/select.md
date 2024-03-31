---
title: Select
description: Select component
---

<script lang="ts">
    import {Select} from '$lib/index.js';
    import {docSelectPropsDefs} from '$lib/components/Select/Select.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {}
    let options = [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2' },
        { label: 'Option 3', value: 'Option 3' },
        { label: 'Option 4', value: 'Option 4' },
        { label: 'Option 5', value: 'Option 5' },
    ]
</script>

## Playground

<Playground>
    <Select slot="component" {...props} {options} />
    <PlaygroundForm slot="form" bind:props schema={docSelectPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docSelectPropsDefs}></ApiReference>
