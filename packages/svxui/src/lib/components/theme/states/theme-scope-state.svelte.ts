import type { Color, Mode, Radius, Theme } from '$lib/shared.types.js';
import { ThemeLight, ThemeSystem } from '../constants.js';
import { type ThemeContext, type ThemeScopeAttributes, type ThemeScopeStateOptions } from '../types.js';

/**
 * ThemeScopeState
 *
 * @description Manages a nested theme scope. Each value falls back to the
 * parent {@link ThemeContext} when not explicitly overridden. Implements {@link ThemeContext}.
 */
export class ThemeScopeState implements ThemeContext {
    #props: ThemeScopeStateOptions = $state({});
    #parent: ThemeContext;

    constructor(options: ThemeScopeStateOptions, parent: ThemeContext) {
        this.#props = options;
        this.#parent = parent;
    }

    /**
     * Get the current mode
     */
    get mode(): Mode {
        return this.#props.mode ?? this.#parent.mode;
    }

    /**
     * Get the current color
     */
    get color(): Color {
        return this.#props.color ?? this.#parent.color;
    }

    /**
     * Get the current radius
     */
    get radius(): Radius {
        return this.#props.radius ?? this.#parent.radius;
    }

    /**
     * Get the current systeme theme
     */
    get system(): Theme | undefined {
        return this.#parent.system;
    }

    /**
     * Get the current resolved theme
     */
    get theme(): Theme {
        const m = this.mode;
        return m === ThemeSystem ? (this.system ?? ThemeLight) : m;
    }

    /**
     * Get the current value of hasBackground to apply to the internal HTML element of the ThemeScope component
     */
    get hasBackground(): boolean {
        return this.#props.hasBackground ?? true;
    }

    /**
     * Get the HTML data-attributes written to the ThemeScope element
     */
    get attrs(): ThemeScopeAttributes {
        return {
            'data-theme-scope': '',
            'data-theme': this.theme,
            'data-radius': this.radius,
            'data-color': this.color,
            'data-has-background': this.hasBackground ? '' : undefined
        };
    }
}
