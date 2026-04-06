<script lang="ts" generics="Tag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import { resolveSpace } from '../internals/resolve-space.js';
    import type { FlexProps } from '../types.js';

    const JUSTIFY_MAP: Record<string, string> = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly',
        stretch: 'stretch'
    };

    const ALIGN_MAP: Record<string, string> = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        stretch: 'stretch',
        baseline: 'baseline'
    };

    let {
        as = 'div' as Tag,
        ref = $bindable(),
        display = 'flex',
        direction = undefined,
        justify = undefined,
        align = undefined,
        wrap = undefined,
        gap = undefined,
        rowGap = undefined,
        colGap = undefined,
        children,
        ...rest
    }: FlexProps<Tag> = $props();

    let cssClass = $derived(rest.class);

    let cssStyle = $derived.by(() => {
        const parts: string[] = [];
        const add = (prop: string, val: string | undefined) => {
            if (val !== undefined) parts.push(`${prop}: ${val}`);
        };
        add('display', display);
        add('flex-direction', direction);
        add('justify-content', justify ? (JUSTIFY_MAP[justify] ?? justify) : undefined);
        add('align-items', align ? (ALIGN_MAP[align] ?? align) : undefined);
        add('flex-wrap', wrap);
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
