<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import { resolveSpace } from '../internals/resolve-space.js';
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
        children,
        ...rest
    }: BoxProps<ElementTag> = $props();

    function toStyle(props: Record<string, string | undefined>): string | undefined {
        const parts = Object.entries(props)
            .filter((e): e is [string, string] => e[1] !== undefined && e[1] !== '')
            .map(([k, v]) => `${k}: ${v}`);
        return parts.length > 0 ? parts.join('; ') + ';' : undefined;
    }

    let cssStyle = $derived.by(() => {
        const boxStyle = toStyle({
            display,
            'padding-top': resolveSpace(pt ?? py ?? p),
            'padding-right': resolveSpace(pr ?? px ?? p),
            'padding-bottom': resolveSpace(pb ?? py ?? p),
            'padding-left': resolveSpace(pl ?? px ?? p),
            'margin-top': resolveSpace(mt ?? my ?? m),
            'margin-right': resolveSpace(mr ?? mx ?? m),
            'margin-bottom': resolveSpace(mb ?? my ?? m),
            'margin-left': resolveSpace(ml ?? mx ?? m),
            width,
            'max-width': maxWidth,
            'min-width': minWidth,
            height,
            'max-height': maxHeight,
            'min-height': minHeight,
            'flex-basis': flexBasis,
            'flex-grow': flexGrow,
            'flex-shrink': flexShrink,
            'overflow-x': overflowX ?? overflow,
            'overflow-y': overflowY ?? overflow
        });
        const callerStyle = rest.style as string | undefined;
        return [boxStyle, callerStyle].filter(Boolean).join(' ') || undefined;
    });
</script>

<svelte:element this={as} {...rest} bind:this={ref} style={cssStyle}>
    {@render children?.()}
</svelte:element>
