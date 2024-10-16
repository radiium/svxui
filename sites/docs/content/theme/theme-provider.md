---
title: ThemeProvider
description:
category: theme
---

<script>
    import { ThemeSelect } from 'svxui';
    import { themeProviderSchema } from '$lib/content/theme/theme-provider/schema.ts';
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
</script>

## Description

The `<ThemeProvider/>{:svelte}` is the entry point of `svxui`.  
It allows you to configure the global light/dark themes and radius.

## Usage

```svelte
<script>
    import { ThemeProvider } from 'svxui';
</script>

<ThemeProvider>
    <!-- Content -->
</ThemeProvider>
```

## API Reference

<ApiReferenceComponent schema={themeProviderSchema}/>
