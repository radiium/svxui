<script lang="ts">
    import { clsx } from '$lib/utils/clsx.js';
    import { onMount } from 'svelte';
    import { readonly } from 'svelte/store';
    import { hasThemeContext, setThemeContext } from '../context.svelte.js';
    import { defaultThemeProviderProps } from '../props.js';
    import { createThemeProvider, systemThemeStore } from '../theme.store.js';
    import ThemeRoot from './theme-root.svelte';
    import type { ThemeProviderProps } from '../types.js';

    let {
        defaultStrategy = defaultThemeProviderProps.defaultStrategy,
        defaultRadius = defaultThemeProviderProps.defaultRadius,
        hasBackground = defaultThemeProviderProps.hasBackground,
        children,
        ...rest
    }: ThemeProviderProps = $props();

    const isRoot = !hasThemeContext();
    const { theme, strategy, radius } = createThemeProvider({
        isRoot,
        defaultStrategy,
        defaultRadius,
        systemeTheme: systemThemeStore
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
            systemThemeStore.track(true);
            systemThemeStore.update();
        }
    });

    let cssClass = $derived(clsx(rest.class, 'svxui', $theme));
</script>

{#if isRoot}
    <ThemeRoot strategy={$strategy} theme={$theme} />
{/if}

<div
    style={rest.style}
    class={cssClass}
    data-theme-root={isRoot}
    data-theme={$theme}
    data-has-background={hasBackground}
    data-radius={$radius}
    data-color="gray"
>
    {@render children?.()}
</div>
