import { booleanOptions, colorOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import {
    MetaThemeColors,
    ThemeDark,
    ThemeLight,
    ThemeSystem,
    type ThemeChildProviderProps,
    type ThemeRootProviderProps
} from './types.js';

export const defaultThemeRootProviderProps: ThemeRootProviderProps = {
    defaultStrategy: ThemeSystem,
    defaultRadius: 'medium',
    defaultColor: 'neutral',
    metaThemeColors: MetaThemeColors,
    disableTransitions: true,
    hasBackground: true,
    track: true,
    disableHeadScriptInjection: false,
    customThemeColors: undefined
};
export const ThemeRootProviderOptions = {
    defaultStrategy: [ThemeSystem, ThemeLight, ThemeDark],
    defaultRadius: radiusOptions,
    defaultColor: colorOptions,
    disableTransitions: booleanOptions,
    hasBackground: booleanOptions,
    track: booleanOptions,
    disableHeadScriptInjection: booleanOptions
} as const satisfies PropsOptions<ThemeRootProviderProps>;

export const defaultThemeChildProviderProps: ThemeChildProviderProps = {
    strategy: undefined,
    radius: undefined,
    color: undefined,
    hasBackground: undefined
};
export const ThemeChildProviderOptions = {
    strategy: [ThemeSystem, ThemeLight, ThemeDark],
    radius: radiusOptions,
    color: colorOptions,
    hasBackground: booleanOptions
} as const satisfies PropsOptions<ThemeChildProviderProps>;
