---
title: Separator
description:
---

<script lang="ts">
    import Separator from '$lib/components/Separator/Separator.svelte';
    import {docSeparatorPropsDefs} from '$lib/components/Separator/Separator.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {}
</script>

## Playground

<Playground>
    <Separator slot="component" {...props}/>
    <PlaygroundForm slot="form" bind:props schema={docSeparatorPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docSeparatorPropsDefs}></ApiReference>
