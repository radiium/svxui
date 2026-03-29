import type { Color, Mode, Radius, Theme } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

// ─── Public interfaces ────────────────────────────────────────────────────────

/**
 * Read-only snapshot of the current theme values. Passed to children snippets.
 */
export type ThemeContext = {
    /**
     * Active mode (system | light | dark)
     */
    readonly mode: Mode;
    /**
     * Resolved theme — never 'system'; always 'light' or 'dark'
     */
    readonly theme: Theme;
    /**
     * Active accent color
     */
    readonly color: Color;
    /**
     * Active border-radius scale
     */
    readonly radius: Radius;
    /**
     * OS-level color scheme detected via `prefers-color-scheme`, or undefined on SSR
     */
    readonly system: Theme | undefined;
};

/**
 * ThemeContext extended with setters — exposed by ThemeProvider only
 */
export type ThemeMutableContext = ThemeContext & {
    /**
     * Set the active mode and persist it to storage
     */
    setMode(value: Mode): void;
    /**
     * Set the active accent color and persist it to storage
     */
    setColor(value: Color): void;
    /**
     * Set the active radius and persist it to storage
     */
    setRadius(value: Radius): void;
};

// ─── Theme root ───────────────────────────────────────────────────────────────

/**
 * ThemeRootState options
 */
export type ThemeRootStateOptions = {
    /**
     * Default mode. Defaults to `'system'`
     */
    mode?: Mode;
    /**
     * Default accent color. Defaults to `'neutral'`
     */
    color?: Color;
    /**
     * Default radius scale. Defaults to `'medium'`
     */
    radius?: Radius;
    /**
     * Allow CSS transitions during theme changes. Defaults to `false`
     */
    transitions?: boolean;
    /**
     * Track OS color-scheme changes in real time. Defaults to `true`
     */
    systemTracking?: boolean;
    /**
     * Override content values for the `<meta name="theme-color">` tag
     */
    metaColors?: {
        light: string;
        dark: string;
    };
    /**
     * localStorage keys used to persist each value
     */
    storage?: {
        colorKey?: string;
        radiusKey?: string;
        modeKey?: string;
    };
};

export type ThemeProviderProps = ThemeRootStateOptions & {
    /**
     * Inject the anti-FOUC inline script into `<head>`. Defaults to `true`
     */
    script?: boolean;
    /**
     * ThemeProvider content — receives a {@link ThemeMutableContext}
     */
    children?: Snippet<[ThemeMutableContext]>;
};

// ─── Theme Scope ──────────────────────────────────────────────────────────────

/**
 * ThemeScopeState options
 */
export type ThemeScopeStateOptions = {
    /**
     * Override the mode for this scope. Inherits from parent when omitted
     */
    mode?: Mode;
    /**
     * Override the accent color for this scope. Inherits from parent when omitted
     */
    color?: Color;
    /**
     * Override the radius scale for this scope. Inherits from parent when omitted
     */
    radius?: Radius;
    /**
     * Apply background color token to the scope element. Defaults to `true`
     */
    hasBackground?: boolean;
};

/**
 * HTML data-attributes written to the ThemeScope element
 */
export type ThemeScopeAttributes = {
    'data-theme-scope': '';
    'data-theme': Theme;
    'data-radius': Radius;
    'data-color': Color;
    'data-has-background'?: '';
};

/**
 * Extends all the standard HTML attributes of the `<div>` element.
 */
export type ThemeScopeProps = ThemeScopeStateOptions &
    Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'children'> & {
        /**
         * Reference to the rendered DOM element
         */
        ref?: HTMLDivElement;
        /**
         * ThemeScope content — receives a read-only {@link ThemeContext}
         */
        children?: Snippet<[ThemeContext]>;
    };
