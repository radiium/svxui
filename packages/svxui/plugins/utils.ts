import { defaulThemeConfig } from './preprocessors/utils/constant';
import { accentColors, Alias, aliasNames, Color, grayColors, ThemeConfig } from './types';

export function filterThemeConfig(config: [Alias, Color]): config is [Alias, Color] {
    return aliasNames.includes(config[0]) && [...accentColors, ...grayColors].includes(config[1]);
}

export function generateAliasColorCss([alias, color]: [Alias, Color]): string {
    return `
[data-color='${alias}'] {
    --accent-1: var(--${color}-1);
    --accent-2: var(--${color}-2);
    --accent-3: var(--${color}-3);
    --accent-4: var(--${color}-4);
    --accent-5: var(--${color}-5);
    --accent-6: var(--${color}-6);
    --accent-7: var(--${color}-7);
    --accent-8: var(--${color}-8);
    --accent-9: var(--${color}-9);
    --accent-10: var(--${color}-10);
    --accent-11: var(--${color}-11);
    --accent-12: var(--${color}-12);

    --accent-a1: var(--${color}-a1);
    --accent-a2: var(--${color}-a2);
    --accent-a3: var(--${color}-a3);
    --accent-a4: var(--${color}-a4);
    --accent-a5: var(--${color}-a5);
    --accent-a6: var(--${color}-a6);
    --accent-a7: var(--${color}-a7);
    --accent-a8: var(--${color}-a8);
    --accent-a9: var(--${color}-a9);
    --accent-a10: var(--${color}-a10);
    --accent-a11: var(--${color}-a11);
    --accent-a12: var(--${color}-a12);

    --accent-contrast: var(---contrast);
    --accent-surface: var(--${color}-surface);
    --accent-indicator: var(--${color}-indicator);
    --accent-track: var(--${color}-track);

    --accent-box-shadow: 0px 0px 0px 1px var(--accent-a5);
    --accent-box-shadow-hover: 0px 0px 0px 1px var(--accent-a8);
    --accent-box-shadow-focus: 0px 0px 0px 1px var(--accent-8);
}`.trim();
}

export function generateCssFile(config: Partial<ThemeConfig> = defaulThemeConfig) {
    const resolvedConfig = Object.entries({ ...defaulThemeConfig, ...config }) as Array<[Alias, Color]>;
    return resolvedConfig
        .filter(filterThemeConfig) //
        .map(generateAliasColorCss)
        .join('\n');
}
