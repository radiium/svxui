---
title: ThemeProvider
description:
---

<script>
    import {docThemeProviderPropsDefs} from '$lib/theme/ThemeProvider/ThemeProvider.props.ts';
    import ThemeSelect from '$lib/theme/ThemeSelect/ThemeSelect.svelte';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';

</script>

## Description

The <CodeInline>`<ThemeProvider/>`</CodeInline> is the entry point of <CodeInline>svxui</CodeInline>.  
It allows you to configure and initialize the light/dark themes.

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

<ApiReference data={docThemeProviderPropsDefs}></ApiReference>

## Types

Theme strategy provided as prop of <CodeInline>`<ThemeProvider/>`</CodeInline>

```typescript
type ThemeStrategyType = 'dark' | 'light' | 'system';
```

Theme resolved by selected strategy

```typescript
type ThemeSchemeType = 'dark' | 'light';
```
