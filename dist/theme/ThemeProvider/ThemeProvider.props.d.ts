import { ThemeStrategy } from '../theme.types.js';
import type { ThemeProviderProps } from './ThemeProvider.types.js';
export declare const defaultThemeProviderProps: ThemeProviderProps;
export declare const docThemeProviderPropsDefs: {
    title: string;
    props: {
        name: string;
        type: string;
        values: readonly [ThemeStrategy.LIGHT, ThemeStrategy.DARK, ThemeStrategy.SYSTEM];
        default: "light" | "system" | "dark" | undefined;
    }[];
    slots: {
        name: string;
    }[];
    events: never[];
};
