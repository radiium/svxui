<script lang="ts">
    import ThemeColorsDefault from '../internals/components/theme-colors-default.svelte';
    import ThemeColors from '../internals/components/theme-colors.svelte';
    import ThemeScript from '../internals/components/theme-script.svelte';
    import { createThemeRootContext } from '../states/context.svelte.js';
    import { MetaThemeColors, ThemeSystem, type ThemeRootProviderProps } from '../types.js';

    let {
        defaultStrategy = ThemeSystem,
        defaultRadius = 'medium',
        defaultColor = 'neutral',
        metaThemeColors = MetaThemeColors,
        disableTransitions = true,
        hasBackground = true,
        track = true,
        disableHeadScriptInjection = false,
        customThemeColors = undefined,
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
    {@render children?.(themeRootState)}
</div>

<style>
    div {
        display: contents;
    }
</style>
