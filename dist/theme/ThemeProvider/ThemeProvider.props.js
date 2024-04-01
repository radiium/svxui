import { Radius, ThemeStrategy } from '../theme.types.js';
export const defaultThemeProviderProps = {
    strategy: undefined,
    radius: 'small'
};
export const docThemeProviderPropsDefs = {
    title: 'ThemeProviders',
    props: [
        {
            name: 'strategy',
            type: 'enum',
            values: [ThemeStrategy.LIGHT, ThemeStrategy.DARK, ThemeStrategy.SYSTEM],
            default: defaultThemeProviderProps.strategy
        }
        // TODO not yet implemented
        // {
        //     name: 'radius',
        //     type: 'enum',
        //     values: Radius,
        //     default: defaultThemeProviderProps.radius
        // }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
