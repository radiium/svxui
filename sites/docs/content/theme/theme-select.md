---
title: ThemeSelect
description: Customize theme of components
category: theme
---

<script>
    import { ThemeSelect, Flexbox } from 'sveltr';
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { themeSelectSchema } from '$lib/content/theme/theme-select/schema.ts';

    let props = {};
</script>

## Description

The `<ThemeSelect/>{:svelte}` is a utility component allowing you to change the theme strategy dynamically.
You can also build your own with by retrieving the `ThemeContext`

## Usage

```svelte
<script>
    import { ThemeSelect } from 'sveltr';
</script>

<ThemeSelect />
```

## Playground

<Playground>
    <ThemeSelect slot="component" {...props}/>
    <PlaygroundForm slot="form" bind:props schema={themeSelectSchema} />
</Playground>

## API Reference

<ApiReferenceComponent schema={themeSelectSchema}/>
