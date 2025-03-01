import { defaulThemeConfig } from './default-theme-config';
import { filterThemeConfig } from './filter-theme-config';
import { generateAliasColorCss } from './generate-alias-color-css';

/**
 *
 * @param {Partial<ThemeConfig>} themeColors
 * @returns {string}
 */
export function generateCssFile(themeColors = defaulThemeConfig) {
    return Object.entries({ ...defaulThemeConfig, ...themeColors })
        .filter(filterThemeConfig)
        .map(generateAliasColorCss)
        .join('\n');
}
