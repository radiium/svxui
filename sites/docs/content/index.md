---
title: Introduction
description:
category: index
---
<script lang="ts>
    import { Text, Separator } from 'svxui';
</script>

## Svxui

<Text size="5">
    Svxui is free and open-source UI component library for svelte app.
</Text>

<Separator size="4" class="mt-9 mb-5"/>

## Features

### 23 customizable components:
- Type-safe with TypeScript.
- Most components are based on [Radix UI Themes](https://www.radix-ui.com/themes/docs/overview/getting-started).

### Accessible colors:
- Based on [Radix Colors](https://www.radix-ui.com/colors).
- Intuitive aliases `gray`/`primary`/`blue`/`green`/`yellow`/`orange`/`red`.
  
### Light & Dark themes:
- Prevent FLOUC (Flash Of Unstyled Content).
- Real time system theme tracking.
- ssr/ssg compatible

<style lang="scss">
    :global(ul li a),
    :global(p.markdown a) {
        color: var(--teal-a11);
    }

    :global(ul li a:hover),
    :global(p.markdown a:hover) {
        text-decoration: underline;
    }

    :global(ul li strong em ) {
        color: var(--teal-a11);
        padding: calc(var(--space-1)* 0.5) calc(var(--space-1)* 1.5);
        box-shadow: inset 0px 0px 0px 1px var(--teal-a8);
        border-radius: max(var(--radius-1), var(--radius-full));
        font-size: var(--font-size-1);
        line-height: var(--line-height-1);
        letter-spacing: var(--letter-spacing-1);
    }
</style>
