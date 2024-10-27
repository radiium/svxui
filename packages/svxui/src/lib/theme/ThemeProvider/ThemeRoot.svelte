<script lang="ts">
    import '../../styles/index.css';
    import '../../styles/colors.css';


    import { storageKeyStrategy } from '../theme.constant.js';
    import {
        ThemeColorDark,
        ThemeColorLight,
        ThemeDark,
        ThemeLight,
        type StrategyType,
        type ThemeType
    } from '../theme.types.js';

    type InitThemeConfig = {
        defaultStrategy: StrategyType;
        storageKeyStrategy: string;
        darkName: string;
        darkColor: string;
        lightName: string;
        lightColor: string;
    };

    export let strategy: StrategyType;
    export let theme: ThemeType;

    $: themeColor = theme === ThemeLight ? ThemeColorLight : ThemeColorDark;
    $: initThemeConfig = {
        defaultStrategy: strategy,
        storageKeyStrategy: storageKeyStrategy,
        darkName: ThemeDark,
        darkColor: ThemeColorDark,
        lightName: ThemeLight,
        lightColor: ThemeColorLight
    };

    $: initSvxui = ({
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
    };
</script>

<svelte:head>
    <meta name="theme-color" content={themeColor} />
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `<script>(` + initSvxui.toString() + `)(` + JSON.stringify(initThemeConfig) + `);</script>`}
</svelte:head>
