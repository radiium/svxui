<script lang="ts">
    import { clsx } from '$lib/utils/clsx.js';
    import { onMount } from 'svelte';
    import { readonly } from 'svelte/store';
    import { hasThemeContext, setThemeContext } from '../theme.context.js';
    import { createThemeProvider, systemeThemeStore } from './theme.store.js';
    import { defaultThemeProviderProps } from './ThemeProvider.props.js';
    import type { ThemeProviderProps } from './ThemeProvider.types.js';
    import ThemeRoot from './ThemeRoot.svelte';

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

    $: cssClass = clsx($$restProps.class, 'svxui', $theme);
</script>

{#if isRoot}
    <ThemeRoot strategy={$strategy} theme={$theme} />
{/if}

<div
    style={$$restProps.style}
    class={cssClass}
    data-theme-root={isRoot}
    data-theme={$theme}
    data-has-background={hasBackground}
    data-radius={$radius}
    data-color="gray"
>
    <slot />
</div>
