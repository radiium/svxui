---
title: ThemeSelect
description: Customize theme of components
---

<script>
    import ThemeSelect from '$lib/theme/ThemeSelect/ThemeSelect.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import {docThemeSelectPropsDefs} from '$lib/theme/ThemeSelect/ThemeSelect.props.ts';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {};
</script>

## Description

The <CodeInline>`<ThemeSelect/>`</CodeInline> is a utility component allowing you to change the theme strategy dynamically.
You can also build your own with by retrieving the <CodeInline>`ThemeContext`</CodeInline>

## Usage

```svelte
<script>
    import { ThemeSelect } from 'svxui';
</script>

<ThemeSelect />
```

## Playground

<Playground>
    <ThemeSelect slot="component" {...props}/>
    <PlaygroundForm slot="form" bind:props schema={docThemeSelectPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docThemeSelectPropsDefs}></ApiReference>
