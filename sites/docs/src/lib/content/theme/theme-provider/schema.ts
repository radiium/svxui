import { defaultThemeProviderProps, Radius, Strategies, ThemeLight } from 'svxui';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';

export const themeProviderSchema: SchemaComponent = {
    props: [
        {
            name: 'hasBackground',
            type: SchemaPropType.boolean,
            default: defaultThemeProviderProps.hasBackground
        },
        {
            name: 'defaultStrategy',
            type: SchemaPropType.enum,
            values: Strategies,
            default: defaultThemeProviderProps.defaultStrategy
        },
        {
            name: 'defaultRadius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultThemeProviderProps.defaultRadius
        }
    ],
    snippets: [
        {
            name: 'default'
        }
    ],
    events: []
};
