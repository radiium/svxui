<script lang="ts">
    import { useThemeChildContext } from '../states/context.svelte.js';
    import { type ThemeChildProviderProps } from '../types.js';

    let {
        strategy = undefined,
        radius = undefined,
        color = undefined,
        hasBackground = undefined,
        children,
        ...rest
    }: ThemeChildProviderProps = $props();

    const themeChildState = useThemeChildContext({
        get color() {
            return color;
        },
        get strategy() {
            return strategy;
        },
        get radius() {
            return radius;
        },
        get hasBackground() {
            return hasBackground;
        }
    });

    let cssClass = $derived([rest.class, 'svxui', themeChildState.theme]);
</script>

<div {...rest} {...themeChildState.attrs} class={cssClass}>
    {@render children?.()}
</div>
