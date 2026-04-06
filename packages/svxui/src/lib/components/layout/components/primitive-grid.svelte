<script lang="ts" generics="Tag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import { resolveSpace } from '../internals/resolve-space.js';
    import type { GridProps } from '../types.js';

    let {
        as = 'div' as Tag,
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
        children,
        ...rest
    }: GridProps<Tag> = $props();

    let cssClass = $derived(rest.class);

    let cssStyle = $derived.by(() => {
        const parts: string[] = [];
        const add = (prop: string, val: string | undefined) => {
            if (val !== undefined) parts.push(`${prop}: ${val}`);
        };

        add('display', display);

        // auto-fill / auto-fit take precedence over cols
        if (autoFill) {
            add('grid-template-columns', `repeat(auto-fill, minmax(${autoFill}, 1fr))`);
        } else if (autoFit) {
            add('grid-template-columns', `repeat(auto-fit, minmax(${autoFit}, 1fr))`);
        } else if (cols !== undefined) {
            const colsVal = /^\d+$/.test(cols) ? `repeat(${cols}, 1fr)` : cols;
            add('grid-template-columns', colsVal);
        }

        if (rows !== undefined) {
            const rowsVal = /^\d+$/.test(rows) ? `repeat(${rows}, 1fr)` : rows;
            add('grid-template-rows', rowsVal);
        }

        if (areas !== undefined) {
            add('grid-template-areas', areas);
        }

        add('gap', resolveSpace(gap));
        add('row-gap', resolveSpace(rowGap));
        add('column-gap', resolveSpace(colGap));

        const base = parts.length > 0 ? parts.join('; ') + ';' : undefined;
        const callerStyle = rest.style as string | undefined;
        return [base, callerStyle].filter(Boolean).join('') || undefined;
    });
</script>

<svelte:element this={as} {...rest} bind:this={ref} class={cssClass} style={cssStyle}>
    {@render children?.()}
</svelte:element>
