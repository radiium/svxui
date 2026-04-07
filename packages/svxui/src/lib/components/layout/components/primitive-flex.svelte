<script lang="ts" generics="ElementTag extends keyof SvelteHTMLElements = 'div'">
    import type { SvelteHTMLElements } from 'svelte/elements';
    import { cssVar } from '../internals/css-var.js';
    import { resolveSpace } from '../internals/resolve-space.js';
    import type { FlexAlign, FlexJustify, FlexProps } from '../types.js';

    const ALIGN_MAP: Record<FlexAlign, string> = {
        start:    'flex-start',
        end:      'flex-end',
        center:   'center',
        baseline: 'baseline',
        stretch:  'stretch',
        normal:   'normal'
    };

    const JUSTIFY_MAP: Record<FlexJustify, string> = {
        start:    'flex-start',
        end:      'flex-end',
        center:   'center',
        around:   'space-around',
        between:  'space-between',
        evenly:   'space-evenly',
        baseline: 'baseline',
        stretch:  'stretch',
        normal:   'normal'
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
        fullWidth = false,
        fullHeight = false,
        children,
        ...rest
    }: FlexProps<ElementTag> = $props();

    // flag classes activate the matching CSS rule
    let cssClass = $derived([
        'flex',
        rest.class,
        {
            'flex-display':       display !== 'flex',
            'flex-direction':     direction !== undefined,
            'flex-justify':       justify !== undefined,
            'flex-align':         align !== undefined,
            'flex-align-content': alignContent !== undefined,
            'flex-wrap':          wrap !== undefined,
            'flex-gap':           gap !== undefined,
            'flex-row-gap':       rowGap !== undefined,
            'flex-col-gap':       colGap !== undefined,
            'flex-full-width':    fullWidth,
            'flex-full-height':   fullHeight
        }
    ]);

    // CSS vars carry the computed values to the scoped CSS rules
    let cssStyle = $derived.by(
        () =>
            [
                cssVar('--flex-display',        display !== 'flex' ? display : undefined),
                cssVar('--flex-direction',       direction),
                cssVar('--flex-justify',         justify ? JUSTIFY_MAP[justify] : undefined),
                cssVar('--flex-align',           align ? ALIGN_MAP[align] : undefined),
                cssVar('--flex-align-content',   alignContent ? ALIGN_MAP[alignContent] : undefined),
                cssVar('--flex-wrap',            wrap),
                cssVar('--flex-gap',             resolveSpace(gap)),
                cssVar('--flex-row-gap',         resolveSpace(rowGap)),
                cssVar('--flex-col-gap',         resolveSpace(colGap)),
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
        &.flex-full-width {
            width: 100%;
        }
        &.flex-full-height {
            height: 100%;
        }
    }
</style>
