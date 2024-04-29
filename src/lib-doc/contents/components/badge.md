---
title: Badge
description: Badge component
---

<script lang="ts">
    import Badge from '$lib/components/Badge/Badge.svelte';
    import {docBadgePropsDefs} from '$lib/components/Badge/Badge.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';

    let props = {}
</script>

## Playground

<Playground >
<Badge {...props} slot="component">badge</Badge>
<PlaygroundForm bind:props schema={docBadgePropsDefs} slot="form" />
</Playground>

## API Reference

Extend <CodeInline>`HTMLAttributes<HTMLSpanElement>`</CodeInline>

<ApiReference data={docBadgePropsDefs}></ApiReference>
