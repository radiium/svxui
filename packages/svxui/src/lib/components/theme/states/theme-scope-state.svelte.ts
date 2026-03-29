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

    get mode(): Mode {
        return this.#props.mode ?? this.#parent.mode;
    }

    get color(): Color {
        return this.#props.color ?? this.#parent.color;
    }

    get radius(): Radius {
        return this.#props.radius ?? this.#parent.radius;
    }

    get system(): Theme | undefined {
        return this.#parent.system;
    }

    get theme(): Theme {
        const m = this.mode;
        return m === ThemeSystem ? (this.system ?? ThemeLight) : m;
    }

    get hasBackground(): boolean {
        return this.#props.hasBackground ?? true;
    }

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
