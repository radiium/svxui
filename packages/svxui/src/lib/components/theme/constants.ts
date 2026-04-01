import type { Color, Mode, Radius, Theme } from '$lib/shared.types.js';

// Theme mode keys
export const ThemeSystem = 'system' as const;
export const ThemeDark = 'dark' as const;
export const ThemeLight = 'light' as const;

/**
 * Default content values for the `<meta name="theme-color">` tag
 */
export const MetaThemeColors = { light: '#fcfcfc', dark: '#111111' } as const;

/**
 * All supported mode values (including system)
 */
export const Modes: Mode[] = [ThemeSystem, ThemeDark, ThemeLight] as const;

/**
 * Resolved theme values (excludes system)
 */
export const Themes: Theme[] = [ThemeDark, ThemeLight] as const;

/**
 * All supported border-radius scale values
 */
export const Radiuses: Radius[] = ['none', 'small', 'medium', 'large', 'full'] as const;

/**
 * All radix colors value
 */
export const AllRadixColors: Color[] = [
    'neutral',
    'gray',
    'mauve',
    'slate',
    'sage',
    'olive',
    'sand',
    'tomato',
    'red',
    'ruby',
    'crimson',
    'pink',
    'plum',
    'purple',
    'violet',
    'iris',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'jade',
    'green',
    'grass',
    'bronze',
    'gold',
    'brown',
    'orange',
    'amber',
    'yellow',
    'lime',
    'mint',
    'sky'
] as Color[];
