<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import { styleObjectToString } from '$lib/internals/style-object-to-string.js';
    import { toSpaceVar } from '$lib/internals/to-space-var.js';
    import type { LayoutSpacing } from '$lib/shared.types.js';
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { SwitcherProps } from '../types.js';

    let {
        as = 'div' as ElementTag,
        ref = $bindable(),
        threshold = '600px',
        gap = '4' as LayoutSpacing,
        children,
        ...rest
    }: SwitcherProps<ElementTag> = $props();

    let resolvedGap = $derived(toSpaceVar(gap) ?? '1rem');

    // flag classes activate the matching CSS rule
    let cssClass = $derived([
        'switcher',
        rest.class,
        {
            'switcher-threshold': threshold !== undefined,
            'switcher-gap': resolvedGap !== undefined
        }
    ]);

    // CSS vars carry the computed values to the scoped CSS rules
    let cssStyle = $derived.by(() => {
        const allStyles = styleObjectToString({
            '--switcher-threshold': threshold,
            '--switcher-gap': resolvedGap
        });
        const callerStyle = rest.style as string | undefined;
        return [allStyles, callerStyle].filter(Boolean).join(' ') || undefined;
    });
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
<svelte:element this={as} {...rest} bind:this={ref} class={cssClass} style={cssStyle}>
    {@render children?.()}
</svelte:element>

<style>
    .switcher {
        display: flex;
        flex-wrap: wrap;

        &.switcher-gap {
            gap: var(--switcher-gap, 1rem);
        }

        &.switcher-threshold > :global(*) {
            flex-grow: 1;
            flex-basis: calc((var(--switcher-threshold, 600px) - 100%) * 999);
        }
    }
</style>
