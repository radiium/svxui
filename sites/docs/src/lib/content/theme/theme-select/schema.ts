import { SchemaPropType, type SchemaComponent } from '$lib/doc.types';
import { Colors, defaultThemeSelectProps, Placements, Sizes1To4, Variants } from 'sveltr';

export const themeSelectSchema: SchemaComponent = {
    props: [
        {
            name: 'color',
            type: SchemaPropType.enum,
            values: Colors,
            default: defaultThemeSelectProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To4,
            default: defaultThemeSelectProps.size
        },
        {
            name: 'variant',
            type: SchemaPropType.enum,
            values: Variants,
            default: defaultThemeSelectProps.variant
        },
        {
            name: 'placement',
            type: SchemaPropType.enum,
            values: Placements,
            default: defaultThemeSelectProps.placement
        },
        {
            name: 'iconOnly',
            type: SchemaPropType.boolean,
            default: defaultThemeSelectProps.iconOnly
        }
    ],
    slots: [],
    events: []
};
