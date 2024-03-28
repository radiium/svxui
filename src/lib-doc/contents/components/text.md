---
title: Text
description: Text component
---

<script lang="ts">
    import Card from '$lib/components/Card/Card.svelte';
    import Text from '$lib/components/Text/Text.svelte';
    import {docTextPropsDefs} from '$lib/components/Text/Text.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {}
</script>

## Playground

<Playground>
    <Text slot="component" {...props}>Super sample text !</Text>
    <PlaygroundForm slot="form" bind:props schema={docTextPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docTextPropsDefs}></ApiReference>
