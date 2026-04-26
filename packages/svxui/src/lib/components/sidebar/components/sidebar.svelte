<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import { styleObjectToString } from '$lib/internals/style-object-to-string.js';
    import { toSpaceVar } from '$lib/internals/to-space-var.js';
    import type { LayoutSpacing } from '$lib/shared.types.js';
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { SidebarProps } from '../types.js';

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

    let resolvedGap = $derived(toSpaceVar(gap) ?? '1rem');

    // flag classes activate the matching CSS rule
    let cssClass = $derived([
        'sidebar',
        rest.class,
        {
            'sidebar-right': side === 'right',
            'sidebar-width': sideWidth !== undefined,
            'sidebar-content-min': contentMin !== undefined,
            'sidebar-gap': resolvedGap !== undefined
        }
    ]);

    // CSS vars carry the computed values to the scoped CSS rules
    let cssStyle = $derived.by(() => {
        const allStyles = styleObjectToString({
            '--sidebar-width': sideWidth,
            '--content-min': contentMin,
            '--sidebar-gap': resolvedGap
        });
        const callerStyle = rest.style as string | undefined;
        return [allStyles, callerStyle].filter(Boolean).join(' ') || undefined;
    });
</script>

<!--
  Sidebar: fixed-width sidebar + fluid content area.
  Wraps to a stack when the content falls below `contentMin` — no media queries.
  Visual order (left/right) is controlled via CSS `order`, not DOM order.
-->
<svelte:element this={as} bind:this={ref} {...rest} class={cssClass} style={cssStyle}>
    {#if sidebar}
        <div class="sidebar-side">{@render sidebar()}</div>
    {/if}
    <div class="sidebar-content">
        {#if children}
            {@render children?.()}
        {/if}
    </div>
</svelte:element>

<style>
    .sidebar {
        display: flex;
        flex-wrap: wrap;

        &.sidebar-gap {
            gap: var(--sidebar-gap, 1rem);
        }

        & .sidebar-side {
            flex-grow: 1;
        }

        &.sidebar-width {
            & .sidebar-side {
                flex-basis: var(--sidebar-width, 240px);
            }
        }

        & .sidebar-content {
            flex-basis: 0;
            flex-grow: 999;
        }

        &.sidebar-content-min {
            & .sidebar-content {
                min-width: var(--content-min, 50%);
            }
        }

        &.sidebar-right {
            & .sidebar-side {
                order: 1;
            }
        }
    }
</style>
