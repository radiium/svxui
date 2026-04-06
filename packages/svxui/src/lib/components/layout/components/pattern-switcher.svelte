<script lang="ts" generics="Tag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import { resolveSpace } from '../internals/resolve-space.js';
    import type { LayoutSpacing, SwitcherProps } from '../types.js';

    let {
        as = 'div' as Tag,
        ref = $bindable(),
        threshold = '600px',
        gap = '4' as LayoutSpacing,
        children,
        ...rest
    }: SwitcherProps<Tag> = $props();

    let resolvedGap = $derived(resolveSpace(gap) ?? '1rem');

    let cssStyle = $derived(`--switcher-threshold: ${threshold}; --switcher-gap: ${resolvedGap};`);
</script>

<!--
  Switcher: arranges children in a row, switching to a column stack
  when the container width falls below `threshold`.

  Uses an intrinsic flex-basis mathematical trick (Every Layout):

    flex-basis: calc((threshold - 100%) * 999)

  When container > threshold → flex-basis is negative → clamped to 0 → ROW
  When container < threshold → flex-basis is huge → items stack → COLUMN

  NO media queries. NO container queries. NO JavaScript.
-->
<svelte:element
    this={as}
    {...rest}
    bind:this={ref}
    class={['switcher', (rest as { class?: string }).class]}
    style={cssStyle}
>
    {@render children?.()}
</svelte:element>

<style>
    .switcher {
        display: flex;
        flex-wrap: wrap;
        gap: var(--switcher-gap, 1rem);
    }

    /*
     * Apply the intrinsic layout hack to every direct child.
     * flex-basis: calc((threshold - 100%) * 999)
     *   → positive (huge) when container < threshold → item fills full width → stacks
     *   → negative (clamped to 0) when container > threshold → items share the row
     */
    .switcher > :global(*) {
        flex-grow: 1;
        flex-basis: calc((var(--switcher-threshold, 600px) - 100%) * 999);
    }
</style>
