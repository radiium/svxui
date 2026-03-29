import { Context } from '$lib/utilities/context/index.js';
import type {
    ThemeContext,
    ThemeMutableContext,
    ThemeRootStateOptions,
    ThemeScopeStateOptions
} from '../types.js';
import { ThemeRootState } from './theme-root-state.svelte.js';
import { ThemeScopeState } from './theme-scope-state.svelte.js';

const ThemeRootCtx = new Context<ThemeMutableContext>('theme:root');
const ThemeScopeCtx = new Context<ThemeContext>('theme:scope');

/** Initialize the root theme context. Called once inside `ThemeProvider`. */
export function createThemeContext(options: ThemeRootStateOptions): ThemeRootState {
    if (ThemeRootCtx.exists()) {
        throw new Error('[theme2] ThemeProvider can only be used once at the root level.');
    }
    const state = new ThemeRootState(options);
    ThemeRootCtx.set(state);
    ThemeScopeCtx.set(state);
    return state;
}

/** Retrieve the mutable root theme context from any descendant component. */
export function useTheme(): ThemeMutableContext {
    return ThemeRootCtx.get();
}

/** Create a new scope that inherits from the closest parent scope. Called inside `ThemeScope`. */
export function createThemeScope(options: ThemeScopeStateOptions): ThemeScopeState {
    if (!ThemeScopeCtx.exists()) {
        throw new Error('[theme] ThemeScope can only be used as child of ThemeProvider.');
    }

    const parent = ThemeScopeCtx.get();
    const state = new ThemeScopeState(options, parent);
    ThemeScopeCtx.set(state);
    return state;
}

/** Retrieve the nearest scope theme context (read-only) from any descendant component. */
export function useThemeScope(): ThemeContext {
    return ThemeScopeCtx.get();
}
