import { Sizes0To5 } from '../../constants.js';
export const defaultCardProps = {
    elementRef: undefined,
    size: '3',
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
