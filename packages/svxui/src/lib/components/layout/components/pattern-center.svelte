<script lang="ts" generics="Tag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import { resolveSpace } from '../internals/resolve-space.js';
    import type { CenterProps, LayoutSpacing } from '../types.js';

    let {
        as = 'div' as Tag,
        ref = $bindable(),
        maxWidth = '65ch',
        gutters = undefined as LayoutSpacing | undefined,
        intrinsic = false,
        children,
        ...rest
    }: CenterProps<Tag> = $props();

    let cssStyle = $derived.by(() => {
        const parts = [
            'box-sizing: content-box',
            'margin-left: auto',
            'margin-right: auto',
            `max-width: ${maxWidth}`
        ];
        if (gutters) {
            const g = resolveSpace(gutters);
            parts.push(`padding-left: ${g}`, `padding-right: ${g}`);
        }
        if (intrinsic) {
            parts.push('width: fit-content');
        }
        const callerStyle = (rest as { style?: string }).style;
        return [...parts, callerStyle].filter(Boolean).join('; ') + ';';
    });
</script>

<!--
  Center: horizontally centers content within a max-width constraint.
  No JavaScript, no media queries.
-->
<svelte:element this={as} {...rest} bind:this={ref} style={cssStyle}>
    {@render children?.()}
</svelte:element>
