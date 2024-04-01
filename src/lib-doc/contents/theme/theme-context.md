---
title: ThemeContext
description: 
---

<script>
    import Badge from '$lib/components/Badge/Badge.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';
</script>

## Description  
The <CodeInline>```useThemeContext()```</CodeInline> allows access to the context of the closest <CodeInline>```<ThemeProvider/>```</CodeInline> component. Will generate an error if used outside of a <CodeInline>```<ThemeProvider/>```</CodeInline>.

## Usage

```svelte
<script>
    import { useThemeContext } from 'svxui';

    const { isRoot, scheme, strategy, updateStrategy } = useThemeContext();
</script>
```

## Type

```typescript
interface ThemeContext {
    /**
     * true if we are inde root <ThemeProvider/>
     */
    isRoot: boolean;

    /**
     * Readable store of current strategy
     */
    strategy: Readable<ThemeStrategyType>;

    /**
     * Readable store of current resolved theme
     */
    scheme: Readable<ThemeSchemeType>;

    /**
     * function for manualy update strategy of near parent <ThemeProvider>
     */
    updateStrategy: (strategy: ThemeStrategyType) => void;
}
```
