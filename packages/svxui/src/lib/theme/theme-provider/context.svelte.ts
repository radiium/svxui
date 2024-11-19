import { getContext, hasContext, setContext } from 'svelte';
import type { ThemeContext } from './types.js';

export const contextKeyTheme = Symbol('svxui-context-theme');

export function hasThemeContext(): boolean {
    return hasContext(contextKeyTheme);
}

export function setThemeContext(ctx: ThemeContext): void {
    setContext(contextKeyTheme, ctx);
}

export function getThemeContext(): ThemeContext {
    const themeContext = getContext<ThemeContext | undefined>(contextKeyTheme);
    if (!themeContext) {
        throw new Error('`useThemeContext` must be used within a `<ThemeProvider`');
    }
    return themeContext;
}
