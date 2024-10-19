---
title: ThemeSelect
description: Customize theme of components
category: theme
---

<script>
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import Playground from '$lib/content/theme/theme-select/playground.svelte';
    import { themeSelectSchema } from '$lib/content/theme/theme-select/schema.ts';
</script>

## Description

The `<ThemeSelect/>{:svelte}` is a utility component allowing you to change the theme strategy dynamically.
You can also build your own with by retrieving the `ThemeContext`

## Playground

<Playground />

## API Reference

<ApiReferenceComponent schema={themeSelectSchema} />
