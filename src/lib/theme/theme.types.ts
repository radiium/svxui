import type { Readable } from 'svelte/store';

export enum ThemeStrategy {
    SYSTEM = 'system',
    DARK = 'dark',
    LIGHT = 'light'
}
export enum ThemeScheme {
    DARK = ThemeStrategy.DARK,
    LIGHT = ThemeStrategy.LIGHT
}

export type ThemeStrategyType = `${ThemeStrategy}`;
export type ThemeSchemeType = `${ThemeScheme}`;

export const Radius = ['none', 'small', 'medium', 'large', 'full'] as const;

export interface ThemeContext {
    /**
     * true if we are inside root <ThemeProvider/>
     */
    isRoot: boolean;

    /**
     * Readable store of current strategy
     */
    strategy: Readable<ThemeStrategyType>;

    /**
     * Readable store of current resolved theme
     */
    scheme: Readable<ThemeSchemeType>;

    /**
     * function for manualy update strategy of near parent <ThemeProvider>
     */
    updateStrategy: (strategy: ThemeStrategyType) => void;
}
