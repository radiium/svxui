import { Sizes0To5, VariantsCard } from '$lib/constants.js';
import type { CardProps } from './Card.types.js';

export const defaultCardProps: CardProps = {
    elementRef: undefined,
    size: '3',
    variant: 'solid',
    asButton: false
};

export const docCardPropsDefs = {
    props: [
        {
            name: 'elementRef',
            type: 'HTMLDivElement'
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes0To5,
            default: defaultCardProps.size
        },
        {
            name: 'variant',
            type: 'enum',
            values: VariantsCard,
            default: defaultCardProps.variant
        },
        {
            name: 'asButton',
            type: 'boolean',
            default: defaultCardProps.asButton
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
