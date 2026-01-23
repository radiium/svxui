import { Context } from '$lib/utilities/context/index.js';
import type { ThemeChildStateProps, ThemeRootStateProps } from '../types.js';
import { ThemeChildState } from './theme-child-state.svelte.js';
import { ThemeRootState } from './theme-root-state.svelte.js';

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
