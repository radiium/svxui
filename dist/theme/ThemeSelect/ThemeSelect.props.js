import { Placements } from '../../components/Popover/Popover.types.js';
import { Colors, Sizes1To4, Variants } from '../../constants.js';
export const defaultThemeSelectProps = {
    color: 'gray',
    size: '2',
    variant: 'outline',
    showLabel: true,
    placement: 'bottom'
};
export const docThemeSelectPropsDefs = {
    title: 'ThemeSelect',
    props: [
        {
            name: 'color',
            type: 'enum',
            values: Colors,
            default: defaultThemeSelectProps.color
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To4,
            default: defaultThemeSelectProps.size
        },
        {
            name: 'variant',
            type: 'enum',
            values: Variants,
            default: defaultThemeSelectProps.variant
        },
        {
            name: 'showLabel',
            type: 'boolean',
            default: defaultThemeSelectProps.showLabel
        },
        {
            name: 'placement',
            type: 'enum',
            values: Placements,
            default: defaultThemeSelectProps.placement
        }
    ],
    slots: [],
    events: []
};
