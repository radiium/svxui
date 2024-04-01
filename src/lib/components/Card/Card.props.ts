import { Sizes0To5 } from '$lib/constants.js';
import type { CardProps } from './Card.types.js';

export const defaultCardProps: CardProps = {
    elementRef: undefined,
    size: '3'
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
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
