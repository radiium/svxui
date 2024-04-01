---
title: Nested theme
description:
---

<script>
    import ThemeProvider from '$lib/theme/ThemeProvider/ThemeProvider.svelte';
    import SampleFormCard from './SampleFormCard.svelte';
    import CodeInline from '$lib-doc/components/CodeInline.svelte';

</script>

## Description

The <CodeInline>`<ThemeProvider/>`</CodeInline> component can be nested.  
Only the root <CodeInline>`<ThemeProvider/>`</CodeInline> will respond to the <CodeInline>`<ThemeSelect/>`</CodeInline> change.

## Usage

```svelte
<script>
    import { ThemeProvider } from 'svxui';
</script>

<!-- Root theme, default to system -->
<ThemeProvider>
    ...

    <!-- Nested theme, forced dark -->
    <ThemeProvider strategy="dark">
        ...

        <!-- Nested theme, forced light -->
        <ThemeProvider strategy="light">...</ThemeProvider>
    </ThemeProvider>
</ThemeProvider>
```

## Example

<ThemeProvider strategy="dark">
    <SampleFormCard title="Forced dark theme">
        <ThemeProvider strategy="light">
            <SampleFormCard title="Forced light theme">
                <ThemeProvider strategy="system">
                    <SampleFormCard  title="Forced sytem theme"/>
                </ThemeProvider>
            </SampleFormCard>
        </ThemeProvider>
    </SampleFormCard>
</ThemeProvider>
