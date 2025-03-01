import { Context } from '$lib/utils/context.svelte.js';
import { ThemeChildState } from './states/theme-child-state.svelte.js';
import { ThemeRootState } from './states/theme-root-state.svelte.js';
import type { ThemeChildStateProps, ThemeRootStateProps } from './types.js';

const ThemeRootContext = new Context<ThemeRootState>('ThemeRoot');
const ThemeChildContext = new Context<ThemeChildState>('ThemeChild');

export function createThemeRootContext(props: ThemeRootStateProps): ThemeRootState {
    if (ThemeRootContext.exists()) {
        throw new Error('Single ThemeRootState can be created');
    }
    const rootState = new ThemeRootState(props);
    return ThemeRootContext.set(rootState);
}

export function useThemeRootContext(): ThemeRootState {
    return ThemeRootContext.get();
}

export function useThemeChildContext(props: ThemeChildStateProps): ThemeChildState {
    const rootState = ThemeRootContext.get();
    const itemState = new ThemeChildState(rootState, props);
    return ThemeChildContext.set(itemState);
}
