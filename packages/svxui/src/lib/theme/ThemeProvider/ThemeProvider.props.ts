import { RadiusMedium } from '$lib/shared.types.js';
import { ThemeSystem } from '../theme.types.js';
import type { ThemeProviderProps } from './ThemeProvider.types.js';

export const defaultThemeProviderProps: ThemeProviderProps = {
    defaultStrategy: ThemeSystem,
    defaultRadius: RadiusMedium,
    hasBackground: true
};
