---
title: Flexbox
description: Switch component
---

<script lang="ts">
    import Card from '$lib/components/Card/Card.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import {docFlexboxPropsDefs} from '$lib/components/Flexbox/Flexbox.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';

    let props = {}
</script>

## Playground

<Playground >
    <Card slot="component" size="1" style="width: 100%; height: 100%;">
        <Flexbox {...props}  style="width: 100%; height: 100%;">
            {#each [1, 2, 3] as n}
            <div style="width: 50px; height: 50px; background: var(--accent-9); border-radius: 6px; display: flex; align-items: center; justify-content: center;" data-color="gray">{n}</div>
            {/each}
        </Flexbox>
    </Card>
<PlaygroundForm bind:props schema={docFlexboxPropsDefs} slot="form" />
</Playground>

## API Reference

Extend <CodeInline>`HTMLAttributes<HTMLDivElement>`</CodeInline>

<ApiReference data={docFlexboxPropsDefs}></ApiReference>
