import type { Radius, Strategies, Themes } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Readable } from 'svelte/store';

/**
 *
 * Theme Constants
 *
 */

export type StrategyType = (typeof Strategies)[number];
export type ThemeType = (typeof Themes)[number];
export type RadiusType = (typeof Radius)[number];

/**
 *
 * Theme context
 *
 */

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

/**
 *
 * Theme root init config
 *
 */

export type InitThemeConfig = {
    defaultStrategy: StrategyType;
    storageKeyStrategy: string;
    darkName: string;
    darkColor: string;
    lightName: string;
    lightColor: string;
};

/**
 *
 * Theme providers
 *
 */

export type ThemeProviderProps = Pick<HTMLAttributes<HTMLDivElement>, 'style' | 'class'> & {
    defaultStrategy?: (typeof Strategies)[number];
    defaultRadius?: (typeof Radius)[number];
    hasBackground?: boolean;
    children?: Snippet;
};
