<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import { resolveBoxModel } from '$lib/internals/resolve-box-model.js';
    import { styleObjectToString } from '$lib/internals/style-object-to-string.js';
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { BoxProps } from '../types.js';

    let {
        as = 'div' as ElementTag,
        ref = $bindable(),
        display = undefined,
        p = undefined,
        px = undefined,
        py = undefined,
        pt = undefined,
        pr = undefined,
        pb = undefined,
        pl = undefined,
        m = undefined,
        mx = undefined,
        my = undefined,
        mt = undefined,
        mr = undefined,
        mb = undefined,
        ml = undefined,
        width = undefined,
        maxWidth = undefined,
        minWidth = undefined,
        height = undefined,
        maxHeight = undefined,
        minHeight = undefined,
        flexBasis = undefined,
        flexGrow = undefined,
        flexShrink = undefined,
        overflow = undefined,
        overflowX = undefined,
        overflowY = undefined,
        gridArea = undefined,
        gridColumn = undefined,
        gridRow = undefined,
        children,
        ...rest
    }: BoxProps<ElementTag> = $props();

    let cssStyle = $derived.by(() => {
        const boxStyle = styleObjectToString({
            display,
            ...resolveBoxModel({
                p,
                px,
                py,
                pt,
                pr,
                pb,
                pl,
                m,
                mx,
                my,
                mt,
                mr,
                mb,
                ml,
                width,
                maxWidth,
                minWidth,
                height,
                maxHeight,
                minHeight,
                flexBasis,
                flexGrow,
                flexShrink,
                overflow,
                overflowX,
                overflowY,
                gridArea,
                gridColumn,
                gridRow
            })
        });
        const callerStyle = rest.style as string | undefined;
        return [boxStyle, callerStyle].filter(Boolean).join(' ') || undefined;
    });
</script>

<svelte:element this={as} {...rest} bind:this={ref} style={cssStyle}>
    {@render children?.()}
</svelte:element>
