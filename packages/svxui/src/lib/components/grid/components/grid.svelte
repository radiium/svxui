<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import { isIntegerString } from '$lib/internals/is.js';
    import { resolveBoxModel } from '$lib/internals/resolve-box-model.js';
    import { toSpaceVar } from '$lib/internals/to-space-var.js';
    import { styleObjectToString } from '$lib/internals/style-object-to-string.js';
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { GridProps } from '../types.js';

    // grid-auto-flow uses "row dense" / "column dense" (space-separated), not hyphens
    const FLOW_MAP: Record<string, string> = {
        'row-dense': 'row dense',
        'column-dense': 'column dense'
    };

    let {
        as = 'div' as ElementTag,
        ref = $bindable(),
        display = 'grid',
        cols = undefined,
        rows = undefined,
        areas = undefined,
        gap = undefined,
        rowGap = undefined,
        colGap = undefined,
        autoFill = undefined,
        autoFit = undefined,
        autoRows = undefined,
        flow = undefined,
        align = undefined,
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
    }: GridProps<ElementTag> = $props();

    // autoFill/autoFit take precedence over cols
    function templateCols(cols?: string, autoFill?: string, autoFit?: string): string | undefined {
        if (autoFill) return `repeat(auto-fill, minmax(${autoFill}, 1fr))`;
        if (autoFit) return `repeat(auto-fit, minmax(${autoFit}, 1fr))`;
        if (cols) return isIntegerString(cols) ? `repeat(${cols}, 1fr)` : cols;
    }

    // integer shorthand: "3" → repeat(3, 1fr)
    const templateRows = (rows?: string) =>
        rows ? (isIntegerString(rows) ? `repeat(${rows}, 1fr)` : rows) : undefined;

    // computed once, used in both cssClass flags and cssStyle vars
    const resolvedCols = $derived(templateCols(cols, autoFill, autoFit));
    const resolvedRows = $derived(templateRows(rows));

    // flag classes activate the matching CSS rule — prevents inheritance between nested Grids
    let cssClass = $derived([
        'grid',
        rest.class,
        {
            'grid-display': display !== 'grid',
            'grid-cols': resolvedCols !== undefined,
            'grid-rows': resolvedRows !== undefined,
            'grid-areas': areas !== undefined,
            'grid-gap': gap !== undefined,
            'grid-row-gap': rowGap !== undefined,
            'grid-col-gap': colGap !== undefined,
            'grid-auto-rows': autoRows !== undefined,
            'grid-flow': flow !== undefined,
            'grid-align': align !== undefined
        }
    ]);

    // CSS vars carry the computed values to the scoped CSS rules
    // Box model props are applied as inline styles alongside the CSS vars
    let cssStyle = $derived.by(() => {
        const allStyles = styleObjectToString({
            '--grid-display': display !== 'grid' ? display : undefined,
            '--grid-cols': resolvedCols,
            '--grid-rows': resolvedRows,
            '--grid-areas': areas,
            '--grid-gap': toSpaceVar(gap),
            '--grid-row-gap': toSpaceVar(rowGap),
            '--grid-col-gap': toSpaceVar(colGap),
            '--grid-auto-rows': autoRows,
            '--grid-flow': flow ? (FLOW_MAP[flow] ?? flow) : undefined,
            '--grid-align': align,
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
    .grid {
        display: grid;

        &.grid-display {
            display: var(--grid-display);
        }
        &.grid-cols {
            grid-template-columns: var(--grid-cols);
        }
        &.grid-rows {
            grid-template-rows: var(--grid-rows);
        }
        &.grid-areas {
            grid-template-areas: var(--grid-areas);
        }
        &.grid-gap {
            row-gap: var(--grid-gap);
            column-gap: var(--grid-gap);
        }
        &.grid-row-gap {
            row-gap: var(--grid-row-gap);
        }
        &.grid-col-gap {
            column-gap: var(--grid-col-gap);
        }
        &.grid-auto-rows {
            grid-auto-rows: var(--grid-auto-rows);
        }
        &.grid-flow {
            grid-auto-flow: var(--grid-flow);
        }
        &.grid-align {
            align-items: var(--grid-align);
        }
    }
</style>
