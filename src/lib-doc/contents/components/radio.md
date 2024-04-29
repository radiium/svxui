---
title: Radio
description: Radio button component
---

<script lang="ts">
    import Radio from '$lib/components/Radio/Radio.svelte';
    import {docRadioPropsDefs} from '$lib/components/Radio/Radio.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';

    let props = {}
</script>

## Playground

<Playground>
    <Radio slot="component" {...props}/>
    <PlaygroundForm slot="form" bind:props schema={docRadioPropsDefs} />
</Playground>

## API Reference

Extend <CodeInline>`HTMLInputAttributes`</CodeInline>

<ApiReference data={docRadioPropsDefs}></ApiReference>
