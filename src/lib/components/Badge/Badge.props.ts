import { Colors, Sizes1To3, VariantsBadge } from '$lib/constants.js';
import type { BadgeProps } from './Badge.types.js';

export const defaultBadgeProps: BadgeProps = {
    color: 'gray',
    size: '1',
    variant: 'soft',
    disabled: false
};

export const docBadgePropsDefs = {
    props: [
        {
            name: 'elementRef',
            type: 'HTMLSpanElement'
        },
        {
            name: 'color',
            type: 'enum',
            values: Colors,
            default: defaultBadgeProps.color
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To3,
            default: defaultBadgeProps.size
        },
        {
            name: 'variant',
            type: 'enum',
            values: VariantsBadge,
            default: defaultBadgeProps.variant
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: defaultBadgeProps.disabled
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
