<script lang="ts" generics="Tag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import { resolveSpace } from '../internals/resolve-space.js';
    import type { LayoutSpacing, SidebarProps } from '../types.js';

    let {
        as = 'div' as Tag,
        ref = $bindable(),
        side = 'left',
        sideWidth = '240px',
        contentMin = '50%',
        gap = '4' as LayoutSpacing,
        sidebar,
        content,
        children,
        ...rest
    }: SidebarProps<Tag> = $props();

    let resolvedGap = $derived(resolveSpace(gap) ?? '1rem');

    let cssStyle = $derived(
        `--sidebar-width: ${sideWidth}; --content-min: ${contentMin}; --sidebar-gap: ${resolvedGap};`
    );
</script>

<!--
  Sidebar: two-column layout with a fixed-width sidebar and a fluid content area.

  Uses an intrinsic flex layout trick (Every Layout):
  - Sidebar: flex-basis fixed, flex-grow 1
  - Content: flex-basis 0, flex-grow 999, min-width = contentMin

  When the viewport is too narrow to satisfy contentMin, the layout
  wraps to a stack automatically — NO media queries, NO JavaScript.

  Uses Svelte 5 named snippets for sidebar and content regions.

  @example
  <Sidebar sideWidth="240px" contentMin="60%">
    {#snippet sidebar()}<nav>...</nav>{/snippet}
    {#snippet content()}<main>...</main>{/snippet}
  </Sidebar>
-->
<svelte:element
    this={as}
    {...rest}
    bind:this={ref}
    class={['sidebar-layout', (rest as { class?: string }).class]}
    style={cssStyle}
>
    {#if side === 'left'}
        {#if sidebar}
            <div class="sidebar-layout__side">{@render sidebar()}</div>
        {/if}
        <div class="sidebar-layout__content">
            {#if content}
                {@render content()}{:else}{@render children?.()}
            {/if}
        </div>
    {:else}
        <div class="sidebar-layout__content">
            {#if content}
                {@render content()}{:else}{@render children?.()}
            {/if}
        </div>
        {#if sidebar}
            <div class="sidebar-layout__side">{@render sidebar()}</div>
        {/if}
    {/if}
</svelte:element>

<style>
    .sidebar-layout {
        display: flex;
        flex-wrap: wrap;
        gap: var(--sidebar-gap, 1rem);
    }

    /* Fixed-width side */
    .sidebar-layout__side {
        flex-basis: var(--sidebar-width, 240px);
        flex-grow: 1;
    }

    /*
     * Fluid content: flex-grow 999 makes it take all remaining space.
     * min-width: contentMin forces the layout to wrap when there is not
     * enough room — no media query needed.
     */
    .sidebar-layout__content {
        flex-basis: 0;
        flex-grow: 999;
        min-width: var(--content-min, 50%);
    }
</style>
