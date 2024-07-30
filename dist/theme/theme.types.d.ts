import type { Readable } from 'svelte/store';
export declare enum ThemeStrategy {
    SYSTEM = "system",
    DARK = "dark",
    LIGHT = "light"
}
export declare enum ThemeScheme {
    DARK = "dark",
    LIGHT = "light"
}
export type ThemeStrategyType = `${ThemeStrategy}`;
export type ThemeSchemeType = `${ThemeScheme}`;
export declare const Radius: readonly ["none", "small", "medium", "large", "full"];
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
