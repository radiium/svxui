<script lang="ts">
    import { createThemeScope } from '../states/theme-context.svelte.js';
    import { type ThemeScopeProps } from '../types.js';

    let {
        ref = $bindable(),
        mode = undefined,
        radius = undefined,
        color = undefined,
        hasBackground = undefined,
        children,
        ...rest
    }: ThemeScopeProps = $props();

    const state = createThemeScope({
        get mode() {
            return mode;
        },
        get color() {
            return color;
        },
        get radius() {
            return radius;
        },
        get hasBackground() {
            return hasBackground;
        }
    });

    let cssClass = $derived([rest.class, state.theme]);
</script>

<div {...rest} {...state.attrs} bind:this={ref} class={cssClass}>
    {@render children?.(state)}
</div>
