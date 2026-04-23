<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import { resolveBoxModel } from '$lib/internals/resolve-box-model.js';
    import { resolveSpace } from '$lib/internals/resolve-space.js';
    import { styleObjectToString } from '$lib/internals/style-object-to-string.js';
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { FlexAlign, FlexJustify, FlexProps } from '../types.js';

    const ALIGN_MAP: Record<FlexAlign, string> = {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        baseline: 'baseline',
        stretch: 'stretch',
        normal: 'normal'
    };

    const JUSTIFY_MAP: Record<FlexJustify, string> = {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        around: 'space-around',
        between: 'space-between',
        evenly: 'space-evenly',
        baseline: 'baseline',
        stretch: 'stretch',
        normal: 'normal'
    };

    let {
        ref = $bindable(),
        as = 'div' as ElementTag,
        display = 'flex',
        direction = undefined,
        justify = undefined,
        align = undefined,
        alignContent = undefined,
        wrap = undefined,
        gap = undefined,
        rowGap = undefined,
        colGap = undefined,
        // BoxModelProps
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
    }: FlexProps<ElementTag> = $props();

    // flag classes activate the matching CSS rule — prevents inheritance between nested Flex
    let cssClass = $derived([
        'flex',
        rest.class,
        {
            'flex-display': display !== 'flex',
            'flex-direction': direction !== undefined,
            'flex-justify': justify !== undefined,
            'flex-align': align !== undefined,
            'flex-align-content': alignContent !== undefined,
            'flex-wrap': wrap !== undefined,
            'flex-gap': gap !== undefined,
            'flex-row-gap': rowGap !== undefined,
            'flex-col-gap': colGap !== undefined
        }
    ]);

    // CSS vars carry the computed values to the scoped CSS rules
    // Box model props are applied as inline styles alongside the CSS vars
    let cssStyle = $derived.by(() => {
        const allStyles = styleObjectToString({
            '--flex-display': display !== 'flex' ? display : undefined,
            '--flex-direction': direction,
            '--flex-justify': justify ? JUSTIFY_MAP[justify] : undefined,
            '--flex-align': align ? ALIGN_MAP[align] : undefined,
            '--flex-align-content': alignContent ? ALIGN_MAP[alignContent] : undefined,
            '--flex-wrap': wrap,
            '--flex-gap': resolveSpace(gap),
            '--flex-row-gap': resolveSpace(rowGap),
            '--flex-col-gap': resolveSpace(colGap),
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
        return [allStyles, callerStyle].filter(Boolean).join(' ') || undefined;
    });
</script>

<svelte:element this={as} {...rest} bind:this={ref} class={cssClass} style={cssStyle}>
    {@render children?.()}
</svelte:element>

<style>
    .flex {
        display: flex;

        &.flex-display {
            display: var(--flex-display);
        }
        &.flex-direction {
            flex-direction: var(--flex-direction);
        }
        &.flex-justify {
            justify-content: var(--flex-justify);
        }
        &.flex-align {
            align-items: var(--flex-align);
        }
        &.flex-align-content {
            align-content: var(--flex-align-content);
        }
        &.flex-wrap {
            flex-wrap: var(--flex-wrap);
        }
        &.flex-gap {
            gap: var(--flex-gap);
        }
        &.flex-row-gap {
            row-gap: var(--flex-row-gap);
        }
        &.flex-col-gap {
            column-gap: var(--flex-col-gap);
        }
    }
</style>
