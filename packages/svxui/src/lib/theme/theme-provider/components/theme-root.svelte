<script lang="ts">
    import { ThemeColorDark, ThemeColorLight, ThemeDark, ThemeLight } from '$lib/shared.types.js';
    import '../../../styles/colors.css';
    import '../../../styles/index.css';
    import { storageKeyStrategy } from '../theme.utils.js';
    import { type InitThemeConfig, type StrategyType, type ThemeType } from '../types.js';

    interface Props {
        strategy: StrategyType;
        theme: ThemeType;
    }

    let { strategy, theme }: Props = $props();

    let themeColor = $derived(theme === ThemeLight ? ThemeColorLight : ThemeColorDark);
    let initThemeConfig = $derived({
        defaultStrategy: strategy,
        storageKeyStrategy: storageKeyStrategy,
        darkName: ThemeDark,
        darkColor: ThemeColorDark,
        lightName: ThemeLight,
        lightColor: ThemeColorLight
    });

    let initSvxui = $derived(
        ({
            defaultStrategy,
            storageKeyStrategy,
            darkName,
            darkColor,
            lightName,
            lightColor
        }: InitThemeConfig) => {
            const htmlEl = document.documentElement;
            const themeColorEl = document.querySelector('meta[name="theme-color"]');

            const strategy = localStorage.getItem(storageKeyStrategy) || defaultStrategy;

            const isLight =
                strategy === 'light' ||
                (strategy === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

            if (isLight) {
                htmlEl.classList.remove(darkName);
                htmlEl.classList.add(lightName);
                htmlEl.style.colorScheme = lightName;
                htmlEl.setAttribute('data-theme', lightName);
                themeColorEl?.setAttribute('content', lightColor);
            } else {
                htmlEl.classList.remove(lightName);
                htmlEl.classList.add(darkName);
                htmlEl.style.colorScheme = darkName;
                htmlEl.setAttribute('data-theme', darkName);
                themeColorEl?.setAttribute('content', darkColor);
            }
            htmlEl.classList.add('svxui');
        }
    );
</script>

<svelte:head>
    <meta name="theme-color" content={themeColor} />
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `<script>(` + initSvxui.toString() + `)(` + JSON.stringify(initThemeConfig) + `);</script>`}
</svelte:head>
