import type { Radius } from '$lib/shared.types.js';
import type { StrategyType, ThemeColorsType, ThemeType } from '../types.js';

export type ThemeScriptProps = {
    strategyKey: string;
    strategy: StrategyType;
    radiusKey: string;
    radius: Radius;
    colorKey: string;
    color: string;
    theme: ThemeType;
};
export type InitThemeConfig = {
    strategyKey: string;
    defaultStrategy: StrategyType;
    radiusKey: string;
    defaultRadius: Radius;
    colorKey: string;
    defaultColor: string;
    darkClass: string;
    darkColor: string;
    lightClass: string;
    lightColor: string;
};

export type ThemeColorsProps = {
    themeColors: ThemeColorsType;
};
