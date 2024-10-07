---
title: ThemeContext
description:
category: theme
---

## Description

The `getThemeContext(){:ts}` allows access to the context of the closest `<ThemeProvider/>{:svelte}`.

> Will generate an error if used outside of a `<ThemeProvider/>{:svelte}`.

## Usage

```svelte
<script>
    import { getThemeContext } from 'sveltr';

    const { isRoot, scheme, strategy, radius, setStrategy, setRadius } = getThemeContext();
</script>
```

## Type

```typescript
type ThemeContext = {
    /**
     * true if we are inside root <ThemeProvider/>
     */
    isRoot: boolean;

    /**
     * Readable store of current strategy
     */
    strategy: Readable<StrategyType>;

    /**
     * Readable store of current resolved theme
     */
    theme: Readable<ThemeType>;

    /**
     * Readable store of current radius
     */
    radius: Readable<RadiusType>;

    /**
     * function for manualy update strategy of near parent <ThemeProvider>
     */
    setStrategy: (strategy: StrategyType) => void;

    /**
     * function for manualy update radius of near parent <ThemeProvider>
     */
    setRadius: (radius: RadiusType) => void;
};
```
