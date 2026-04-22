<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import { isIntegerString } from '$lib/internals/is.js';
    import { cssVar } from '$lib/internals/css-var.js';
    import { resolveSpace } from '$lib/internals/resolve-space.js';
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
        fullWidth = false,
        fullHeight = false,
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
            'grid-align': align !== undefined,
            'grid-full-width': fullWidth,
            'grid-full-height': fullHeight
        }
    ]);

    // CSS vars carry the computed values to the scoped CSS rules
    let cssStyle = $derived.by(
        () =>
            [
                cssVar('--grid-display', display !== 'grid' ? display : undefined),
                cssVar('--grid-cols', resolvedCols),
                cssVar('--grid-rows', resolvedRows),
                cssVar('--grid-areas', areas),
                cssVar('--grid-gap', resolveSpace(gap)),
                cssVar('--grid-row-gap', resolveSpace(rowGap)),
                cssVar('--grid-col-gap', resolveSpace(colGap)),
                cssVar('--grid-auto-rows', autoRows),
                cssVar('--grid-flow', flow ? (FLOW_MAP[flow] ?? flow) : undefined),
                cssVar('--grid-align', align),
                rest.style as string | undefined
            ]
                .filter(Boolean)
                .join('; ') || undefined
    );
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
        &.grid-full-width {
            width: 100%;
        }
        &.grid-full-height {
            height: 100%;
        }
    }
</style>
