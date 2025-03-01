export { default as ThemeChildProvider } from './components/theme-child-provider.svelte';
export { default as ThemeRootProvider } from './components/theme-root-provider.svelte';

export { useThemeChildContext, useThemeRootContext } from './context.svelte.js';

export { defaultThemeChildProviderProps, defaultThemeRootProviderProps } from './props.js';

export type {
    MetaThemeColors,
    MetaThemeColorsType,
    Strategies,
    StrategyType,
    ThemeChildProviderProps,
    ThemeChildStateProps,
    ThemeColorsType,
    ThemeRootProviderProps,
    ThemeRootStateProps,
    Themes,
    ThemeType
} from './types.js';
