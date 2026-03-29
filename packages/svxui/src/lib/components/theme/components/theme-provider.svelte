<script lang="ts">
    import { ThemeSystem } from '../constants.js';
    import ThemeScript from '../internals/theme-script.svelte';
    import { createThemeContext } from '../states/theme-context.svelte.js';
    import type { ThemeProviderProps } from '../types.js';

    let {
        mode = ThemeSystem,
        radius = undefined,
        color = undefined,
        transitions = false,
        script = true,
        systemTracking = true,
        metaColors = undefined,
        storage = undefined,
        children
    }: ThemeProviderProps = $props();

    const state = createThemeContext({
        get mode() {
            return mode;
        },
        get color() {
            return color;
        },
        get radius() {
            return radius;
        },
        get transitions() {
            return transitions;
        },
        get systemTracking() {
            return systemTracking;
        },
        get metaColors() {
            return metaColors;
        },
        get storage() {
            return storage;
        }
    });
</script>

{#if script}
    <ThemeScript
        theme={state.theme}
        modeKey={state.modeKey}
        mode={state.mode}
        radiusKey={state.radiusKey}
        radius={state.radius}
        colorKey={state.colorKey}
        color={state.color}
    />
{/if}

{@render children?.(state)}
