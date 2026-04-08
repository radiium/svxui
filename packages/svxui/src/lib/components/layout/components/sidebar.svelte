<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import { cssVar } from '$lib/internals/css-var.js';
    import { resolveSpace } from '$lib/internals/resolve-space.js';
    import type { LayoutSpacing, SidebarProps } from '../types.js';

    let {
        as = 'div' as ElementTag,
        ref = $bindable(),
        side = 'left',
        sideWidth = '240px',
        contentMin = '50%',
        gap = '4' as LayoutSpacing,
        sidebar,
        children,
        ...rest
    }: SidebarProps<ElementTag> = $props();

    let resolvedGap = $derived(resolveSpace(gap) ?? '1rem');

    // flag classes activate the matching CSS rule
    let cssClass = $derived([
        'sidebar-layout',
        rest.class,
        {
            'sidebar-layout-right': side === 'right',
            'sidebar-layout-width': sideWidth !== undefined,
            'sidebar-layout-content-min': contentMin !== undefined,
            'sidebar-layout-gap': resolvedGap !== undefined
        }
    ]);

    // CSS vars carry the computed values to the scoped CSS rules
    let cssStyle = $derived.by(
        () =>
            [
                cssVar('--sidebar-width', sideWidth),
                cssVar('--content-min', contentMin),
                cssVar('--sidebar-gap', resolvedGap),
                rest.style as string | undefined
            ]
                .filter(Boolean)
                .join('; ') || undefined
    );
</script>

<!--
  Sidebar: fixed-width sidebar + fluid content area.
  Wraps to a stack when the content falls below `contentMin` — no media queries.
  Visual order (left/right) is controlled via CSS `order`, not DOM order.
-->
<svelte:element this={as} {...rest} bind:this={ref} class={cssClass} style={cssStyle}>
    {#if sidebar}
        <div class="sidebar-layout-side">{@render sidebar()}</div>
    {/if}
    <div class="sidebar-layout-content">
        {#if children}
            {@render children?.()}
        {/if}
    </div>
</svelte:element>

<style>
    .sidebar-layout {
        display: flex;
        flex-wrap: wrap;

        &.sidebar-layout-gap {
            gap: var(--sidebar-gap, 1rem);
        }

        & .sidebar-layout-side {
            flex-grow: 1;
        }

        &.sidebar-layout-width {
            & .sidebar-layout-side {
                flex-basis: var(--sidebar-width, 240px);
            }
        }

        & .sidebar-layout-content {
            flex-basis: 0;
            flex-grow: 999;
        }

        &.sidebar-layout-content-min {
            & .sidebar-layout-content {
                min-width: var(--content-min, 50%);
            }
        }

        &.sidebar-layout-right {
            & .sidebar-layout-side {
                order: 1;
            }
        }
    }
</style>
