import type { Radius } from '$lib/shared.types.js';
import type { HTMLAttributes } from 'svelte/elements';
import type { Strategies } from '../theme.types.js';

export type ThemeProviderProps = Pick<HTMLAttributes<HTMLDivElement>, 'style' | 'class'> & {
    hasBackground?: boolean;
    defaultStrategy?: (typeof Strategies)[number];
    defaultRadius?: (typeof Radius)[number];
};
