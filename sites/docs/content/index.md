---
title: Introduction
description:
category: index
---

## SveltR

SveltR is free and open-source UI component library for svelte app.
Most components are directly based on their [Radix UI Themes](https://www.radix-ui.com/themes/docs/overview/getting-started) equivalent (without any affiliation).

## Features

-   [x] 23 strictly typed components (some from [Radix UI Themes](https://www.radix-ui.com/themes/docs/overview/getting-started) others not)
-   [x] Color based on [Radix Colors](https://www.radix-ui.com/colors)
-   [x] Support system/Light/dark Themes
-   [x] No flash of unstyled content
-   [x] Configurable radius, global or by component
-   [x] Theme persisted in localstorage
-   [ ] Customizable colors palette (gray/primary/green/blue/yellow/orange/red) **_soon_**
-   [ ] Compatible SvelteKit ssr/ssg **_soon_**

<style lang="scss">
    :global(ul.contains-task-list li a),
    :global(p.markdown a) {
        color: var(--teal-a11);
    }

    :global(ul.contains-task-list li a:hover),
    :global(p.markdown a:hover) {
        text-decoration: underline;
    }

    :global(ul.contains-task-list li strong em ) {
        color: var(--teal-a11);
        padding: calc(var(--space-1)* 0.5) calc(var(--space-1)* 1.5);
        box-shadow: inset 0px 0px 0px 1px var(--teal-a8);
        border-radius: max(var(--radius-1), var(--radius-full));
        font-size: var(--font-size-1);
        line-height: var(--line-height-1);
        letter-spacing: var(--letter-spacing-1);
    }
</style>
