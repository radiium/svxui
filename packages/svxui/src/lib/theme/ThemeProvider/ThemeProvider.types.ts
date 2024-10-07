import type { Radius } from '$lib/shared.types.js';
import type { Strategies } from '../theme.types.js';

export type ThemeProviderProps = {
    hasBackground?: boolean;
    defaultStrategy?: (typeof Strategies)[number];
    defaultRadius?: (typeof Radius)[number];
};
