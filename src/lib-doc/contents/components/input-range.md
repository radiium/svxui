---
title: InputRange
description: InputRange component
---

<script lang="ts">
    import InputRange from '$lib/components/InputRange/InputRange.svelte';
    import {docInputRangePropsDefs} from '$lib/components/InputRange/InputRange.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';

    let props = {}
</script>

## Playground

<Playground>
    <InputRange slot="component" {...props}/>
    <PlaygroundForm slot="form" bind:props schema={docInputRangePropsDefs} />
</Playground>

## API Reference

Extend <CodeInline>`HTMLInputAttributes`</CodeInline>

<ApiReference data={docInputRangePropsDefs}></ApiReference>
