import { ThemeSystem, RadiusMedium } from '$lib/shared.types.js';
import type { ThemeProviderProps } from './types.js';

export const defaultThemeProviderProps: ThemeProviderProps = {
    defaultStrategy: ThemeSystem,
    defaultRadius: RadiusMedium,
    hasBackground: true
};
