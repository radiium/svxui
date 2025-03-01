import { accentColors, aliasNames, grayColors } from './constant';

/**
 *
 * @param {[string, Color]} param0
 * @returns {boolean}
 */
export function filterThemeConfig([alias, color]) {
    return aliasNames.includes(alias) && [...accentColors, ...grayColors].includes(color);
}
