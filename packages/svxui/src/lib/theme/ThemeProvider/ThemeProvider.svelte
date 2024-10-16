<script lang="ts">
    import { readonly } from 'svelte/store';
    import { defaultThemeProviderProps } from './ThemeProvider.props.js';

    import { onMount } from 'svelte';
    import { hasThemeContext, setThemeContext } from '../theme.context.js';
    import type { ThemeProviderProps } from './ThemeProvider.types.js';
    import ThemeScript from './ThemeScript.svelte';
    import { createThemeProvider, systemeThemeStore } from './theme.store.js';

    type $$Props = ThemeProviderProps;
    export let defaultStrategy: $$Props['defaultStrategy'] = defaultThemeProviderProps.defaultStrategy;
    export let defaultRadius: $$Props['defaultRadius'] = defaultThemeProviderProps.defaultRadius;
    export let hasBackground: $$Props['hasBackground'] = defaultThemeProviderProps.hasBackground;

    const isRoot = !hasThemeContext();
    const { theme, strategy, radius } = createThemeProvider({
        isRoot,
        defaultStrategy,
        defaultRadius,
        systemeTheme: systemeThemeStore
    });

    setThemeContext({
        isRoot,
        theme: readonly(theme),
        strategy: readonly(strategy),
        radius: readonly(radius),
        setStrategy: strategy.set,
        setRadius: radius.set
    });

    onMount(() => {
        if (isRoot) {
            systemeThemeStore.track(true);
            systemeThemeStore.update();
        }
    });
</script>

{#if isRoot}
    <ThemeScript strategy={$strategy} theme={$theme} />
{/if}

<div
    class="svxui {$theme}"
    data-theme-root={isRoot}
    data-theme={$theme}
    data-has-background={hasBackground}
    data-radius={$radius}
    data-color="gray"
>
    <slot />
</div>
