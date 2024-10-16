import type { Radius } from '$lib/shared.types.js';
import type { Readable } from 'svelte/store';

export const ThemeSystem = 'system' as const;
export const ThemeDark = 'dark' as const;
export const ThemeLight = 'light' as const;

export const Strategies = [ThemeSystem, ThemeDark, ThemeLight] as const;
export const Themes = [ThemeDark, ThemeLight] as const;

export const ThemeColorLight = '#fcfcfc' as const;
export const ThemeColorDark = '#111111' as const;

export type StrategyType = (typeof Strategies)[number];
export type ThemeType = (typeof Themes)[number];
export type RadiusType = (typeof Radius)[number];

export type ThemeContext = {
    /**
     * true if we are inside root <ThemeProvider/>
     */
    isRoot: boolean;

    /**
     * Readable store of current strategy
     */
    strategy: Readable<StrategyType>;

    /**
     * Readable store of current resolved theme
     */
    theme: Readable<ThemeType>;

    /**
     * Readable store of current radius
     */
    radius: Readable<RadiusType>;

    /**
     * function for manualy update strategy of near parent <ThemeProvider>
     */
    setStrategy: (strategy: StrategyType) => void;

    /**
     * function for manualy update radius of near parent <ThemeProvider>
     */
    setRadius: (radius: RadiusType) => void;
};
