<script lang="ts" generics="Tag extends keyof SvelteHTMLElements = 'div'">
    import { cssVar } from '$lib/internals/css-var.js';
    import { resolveSpace } from '$lib/internals/resolve-space.js';
    import type { LayoutSpacing } from '$lib/shared.types.js';
    import type { SvelteHTMLElements } from 'svelte/elements';
    import type { CenterProps } from '../types.js';

    let {
        as = 'div' as Tag,
        ref = $bindable(),
        maxWidth = '65ch',
        gutters = undefined as LayoutSpacing | undefined,
        intrinsic = false,
        children,
        ...rest
    }: CenterProps<Tag> = $props();

    // flag classes activate the matching CSS rule
    let cssClass = $derived([
        'center',
        rest.class,
        {
            'center-gutters': gutters !== undefined,
            'center-intrinsic': intrinsic
        }
    ]);

    // CSS vars carry the computed values to the scoped CSS rules
    let cssStyle = $derived.by(
        () =>
            [
                cssVar('--center-max-width', maxWidth),
                cssVar('--center-gutters', gutters ? resolveSpace(gutters) : undefined),
                rest.style as string | undefined
            ]
                .filter(Boolean)
                .join('; ') || undefined
    );
</script>

<!-- Center: horizontally centers content within a max-width constraint. -->
<svelte:element this={as} {...rest} bind:this={ref} class={cssClass} style={cssStyle}>
    {@render children?.()}
</svelte:element>

<style>
    .center {
        box-sizing: content-box;
        margin-left: auto;
        margin-right: auto;
        max-width: var(--center-max-width);

        &.center-gutters {
            padding-left: var(--center-gutters);
            padding-right: var(--center-gutters);
        }

        &.center-intrinsic {
            width: fit-content;
        }
    }
</style>
