---
title: ThemeProvider
description:
category: theme
---

<script>
    import { ThemeSelect } from 'sveltr';
    import { themeProviderSchema } from '$lib/content/theme/theme-provider/schema.ts';
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
</script>

## Description

The `<ThemeProvider/>{:svelte}` is the entry point of `sveltr`.  
It allows you to configure the global light/dark themes and radius.

## Usage

```svelte
<script>
    import { ThemeProvider } from 'sveltr';
</script>

<ThemeProvider>
    <!-- Content -->
</ThemeProvider>
```

## API Reference

<ApiReferenceComponent schema={themeProviderSchema}/>
