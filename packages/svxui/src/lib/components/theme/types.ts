import type { Radius } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export const ThemeSystem = 'system' as const;
export const ThemeDark = 'dark' as const;
export const ThemeLight = 'light' as const;

export const Strategies = [ThemeSystem, ThemeDark, ThemeLight] as const;
export type StrategyType = (typeof Strategies)[number];

export const Themes = [ThemeDark, ThemeLight] as const;
export type ThemeType = (typeof Themes)[number];

export const MetaThemeColors = { light: '#fcfcfc', dark: '#111111' };
export type MetaThemeColorsType = { light: string; dark: string };

export type ThemeColorsType = Record<string, string>;

export type ThemeRootStateProps = {
    /**
     * Default accent color
     */
    defaultColor?: string;
    /**
     * Storage key for accent color
     */
    colorKey?: string;
    /**
     * Default theme strategy
     */
    defaultStrategy?: StrategyType;
    /**
     * Storage key for theme strategy
     */
    strategyKey?: string;
    /**
     * Default radius
     */
    defaultRadius?: Radius;
    /**
     * Storage key for radius
     */
    radiusKey?: string;
    /**
     * Content colors for meta theme-color tag
     */
    metaThemeColors?: MetaThemeColorsType;
    /**
     * Should set the background color
     */
    hasBackground?: boolean;
    /**
     * Should track storage change from other tab
     */
    track?: boolean;
    /**
     * Should disable css transition when theme change
     */
    disableTransitions?: boolean;
    /**
     * Should disable init theme script injection. This script prevent FOUC.
     */
    disableHeadScriptInjection?: boolean;
    /**
     * Custom theme colors
     */
    customThemeColors?: ThemeColorsType;
};

export type ThemeRootProviderProps = ThemeRootStateProps &
    HTMLAttributes<HTMLDivElement> & {
        /**
         * ThemeRootProvider content to render
         */
        children?: Snippet<[void]>;
    };

export type ThemeChildStateProps = {
    /**
     * Static Accent color or resolved from ThemeRootProvider.
     */
    color?: string;
    /**
     * Static theme strategy or resolved from ThemeRootProvider.
     */
    strategy?: StrategyType;
    /**
     * Static radius or resolved from ThemeRootProvider.
     */
    radius?: Radius;
    /**
     * Should set the background color
     */
    hasBackground?: boolean;
};

export type ThemeChildProviderProps = ThemeChildStateProps &
    HTMLAttributes<HTMLDivElement> & {
        /**
         * ThemeChildProvider content to render
         */
        children?: Snippet<[void]>;
    };
