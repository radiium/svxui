import type { Radius } from '$lib/shared.types.js';
import type { HTMLAttributes } from 'svelte/elements';
import type { Strategies, StrategyType } from '../theme.types.js';

export type ThemeProviderProps = Pick<HTMLAttributes<HTMLDivElement>, 'style' | 'class'> & {
    hasBackground?: boolean;
    defaultStrategy?: (typeof Strategies)[number];
    defaultRadius?: (typeof Radius)[number];
};

export type InitThemeConfig = {
    defaultStrategy: StrategyType;
    storageKeyStrategy: string;
    darkName: string;
    darkColor: string;
    lightName: string;
    lightColor: string;
};
