import { getContext, hasContext, setContext } from 'svelte';
import type { ThemeContext } from './theme.types.js';
import { contextKeyTheme } from './theme.constant.js';

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
