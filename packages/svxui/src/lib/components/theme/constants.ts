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
export const Modes = [ThemeSystem, ThemeDark, ThemeLight] as const;

/**
 * Resolved theme values (excludes system)
 */
export const Themes = [ThemeDark, ThemeLight] as const;

/**
 * All supported border-radius scale values
 */
export const Radiuses = ['none', 'small', 'medium', 'large', 'full'] as const;
