<script lang="ts">
    import { MetaThemeColors, ThemeDark, ThemeLight } from '../../types.js';
    import type { InitThemeConfig, ThemeScriptProps } from '../types.js';

    let { strategyKey, strategy, radiusKey, radius, colorKey, color, theme }: ThemeScriptProps = $props();

    let themeColor = $derived(theme === ThemeLight ? MetaThemeColors.light : MetaThemeColors.dark);
    let initThemeConfig: InitThemeConfig = $derived({
        strategyKey,
        defaultStrategy: strategy,
        radiusKey,
        defaultRadius: radius,
        colorKey,
        defaultColor: color,
        darkClass: ThemeDark,
        darkColor: MetaThemeColors.dark,
        lightClass: ThemeLight,
        lightColor: MetaThemeColors.light
    });

    let initSvxui = $derived(
        ({
            strategyKey,
            defaultStrategy,
            radiusKey,
            defaultRadius,
            colorKey,
            defaultColor,
            darkClass,
            darkColor,
            lightClass,
            lightColor
        }: InitThemeConfig) => {
            const rootEl = document.documentElement;
            const themeMetaEl = document.querySelector('meta[name="theme-color"]');

            const strategy = localStorage.getItem(strategyKey) || defaultStrategy;
            const radius = localStorage.getItem(radiusKey) || defaultRadius;
            const color = localStorage.getItem(colorKey) || defaultColor;

            const isLight =
                strategy === 'light' ||
                (strategy === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

            rootEl.setAttribute('data-radius', radius);
            rootEl.setAttribute('data-color', color);

            if (isLight) {
                rootEl.classList.remove(darkClass);
                rootEl.classList.add(lightClass);
                rootEl.style.colorScheme = lightClass;
                rootEl.setAttribute('data-theme', lightClass);
                themeMetaEl?.setAttribute('content', lightColor);
            } else {
                rootEl.classList.remove(lightClass);
                rootEl.classList.add(darkClass);
                rootEl.style.colorScheme = darkClass;
                rootEl.setAttribute('data-theme', darkClass);
                themeMetaEl?.setAttribute('content', darkColor);
            }
            // htmlEl.classLit.add('svxui');
        }
    );
</script>

<svelte:head>
    <meta name="theme-color" content={themeColor} />
    <!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `<script>(` + initSvxui.toString() + `)(` + JSON.stringify(initThemeConfig) + `);</script>`}
</svelte:head>
