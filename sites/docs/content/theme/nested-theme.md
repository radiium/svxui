---
title: Nested theme
description:
category: theme
---

<script>
    import { ThemeProvider } from 'svxui';
    import SampleFormCard from '$lib/components/samples/SampleFormCard.svelte';
</script>

## Description

The `<ThemeProvider/>{:svelte}` component can be nested.

> Only the root `<ThemeProvider/>{:svelte}` will respond to the `<ThemeSelect/>{:svelte}` change.

## Usage

```svelte
<script>
    import { ThemeProvider } from 'svxui';
</script>

<!-- Root theme, default to system -->
<ThemeProvider>
    ...

    <!-- Nested theme, forced dark -->
    <ThemeProvider defaultStrategy="dark">
        ...

        <!-- Nested theme, forced light -->
        <ThemeProvider defaultStrategy="light">...</ThemeProvider>
    </ThemeProvider>
</ThemeProvider>
```

## Example

<ThemeProvider defaultStrategy="dark">
    <SampleFormCard title="Forced dark theme">
        <ThemeProvider defaultStrategy="light" hasBackground={false}>
            <SampleFormCard title="Forced light theme">
                <ThemeProvider defaultStrategy="system" hasBackground={false}>
                    <SampleFormCard  title="Forced sytem theme"/>
                </ThemeProvider>
            </SampleFormCard>
        </ThemeProvider>
    </SampleFormCard>
</ThemeProvider>
