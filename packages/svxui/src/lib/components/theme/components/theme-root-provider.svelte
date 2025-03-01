<script lang="ts">
    import { createThemeRootContext } from '../context.svelte.js';
    import ThemeColorsDefault from '../internals/components/theme-colors-default.svelte';
    import ThemeColors from '../internals/components/theme-colors.svelte';
    import ThemeScript from '../internals/components/theme-script.svelte';
    import { defaultThemeRootProviderProps } from '../props.js';
    import { type ThemeRootProviderProps } from '../types.js';

    let {
        defaultStrategy = defaultThemeRootProviderProps.defaultStrategy,
        defaultRadius = defaultThemeRootProviderProps.defaultRadius,
        defaultColor = defaultThemeRootProviderProps.defaultColor,
        metaThemeColors = defaultThemeRootProviderProps.metaThemeColors,
        disableTransitions = defaultThemeRootProviderProps.disableTransitions,
        hasBackground = defaultThemeRootProviderProps.hasBackground,
        track = defaultThemeRootProviderProps.track,
        disableHeadScriptInjection = defaultThemeRootProviderProps.disableHeadScriptInjection,
        customThemeColors,
        children,
        ...rest
    }: ThemeRootProviderProps = $props();

    const themeRootState = createThemeRootContext({
        get defaultColor() {
            return defaultColor;
        },
        get defaultStrategy() {
            return defaultStrategy;
        },
        get defaultRadius() {
            return defaultRadius;
        },
        get metaThemeColors() {
            return metaThemeColors;
        },
        get disableTransitions() {
            return disableTransitions;
        },
        get hasBackground() {
            return hasBackground;
        },
        get track() {
            return track;
        }
    });

    let cssClass = $derived([rest.class, 'svxui', themeRootState.theme]);
</script>

{#if !disableHeadScriptInjection}
    <ThemeScript
        strategyKey={themeRootState.strategyKey}
        strategy={themeRootState.strategy}
        radiusKey={themeRootState.radiusKey}
        radius={themeRootState.radius}
        colorKey={themeRootState.colorKey}
        color={themeRootState.color}
        theme={themeRootState.theme!}
    />
{/if}

{#if customThemeColors}
    <ThemeColors themeColors={customThemeColors} />
{:else}
    <ThemeColorsDefault />
{/if}

<div {...rest} {...themeRootState.attrs} class={cssClass}>
    {@render children?.()}
</div>

<style>
    div {
        display: contents;
    }
</style>
