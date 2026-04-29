<script lang="ts">
    import type { Color, Mode, Radius, Theme } from '$lib/shared.types.js';
    import { MetaThemeColors, ThemeDark, ThemeLight } from '../constants.js';

    type ThemeScriptProps = {
        theme: Theme;
        modeKey: string;
        mode: Mode;
        radiusKey: string;
        radius: Radius;
        colorKey: string;
        color: Color;
    };

    type InitThemeConfig = {
        modeKey: string;
        defaultMode: Mode;
        radiusKey: string;
        defaultRadius: Radius;
        colorKey: string;
        defaultColor: string;
        darkClass: string;
        darkColor: string;
        lightClass: string;
        lightColor: string;
    };

    let { theme, modeKey, mode, radiusKey, radius, colorKey, color }: ThemeScriptProps = $props();

    let themeColor = $derived(theme === ThemeLight ? MetaThemeColors.light : MetaThemeColors.dark);
    let initThemeConfig: InitThemeConfig = $derived({
        modeKey,
        defaultMode: mode,
        radiusKey,
        defaultRadius: radius,
        colorKey,
        defaultColor: color,
        darkClass: ThemeDark,
        darkColor: MetaThemeColors.dark,
        lightClass: ThemeLight,
        lightColor: MetaThemeColors.light
    });

    let initTheme = $derived(
        ({
            modeKey,
            defaultMode,
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
            const metaThemeEl = document.querySelector('meta[name="theme-color"]');

            const svxuiMode = localStorage.getItem(modeKey) ?? defaultMode;
            const svxuiRadius = localStorage.getItem(radiusKey) ?? defaultRadius;
            const svxuiColor = localStorage.getItem(colorKey) ?? defaultColor;

            const isLight =
                svxuiMode === 'light' ||
                (svxuiMode === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

            rootEl.setAttribute('data-theme-root', '');
            rootEl.setAttribute('data-radius', svxuiRadius);
            rootEl.setAttribute('data-color', svxuiColor);

            if (isLight) {
                rootEl.classList.remove(darkClass);
                rootEl.classList.add(lightClass);
                rootEl.style.colorScheme = lightClass;
                rootEl.setAttribute('data-theme', lightClass);
                metaThemeEl?.setAttribute('content', lightColor);
            } else {
                rootEl.classList.remove(lightClass);
                rootEl.classList.add(darkClass);
                rootEl.style.colorScheme = darkClass;
                rootEl.setAttribute('data-theme', darkClass);
                metaThemeEl?.setAttribute('content', darkColor);
            }
        }
    );
</script>

<svelte:head>
    <meta name="theme-color" content={themeColor} />
    <!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags, prefer-template --><!-- svelte-ignore hydration_html_changed -->
    {@html `<script>(` + initTheme.toString() + `)(` + JSON.stringify(initThemeConfig) + `);</script>`}
</svelte:head>
