import { Sizes0To5 } from '../../constants.js';
export const defaultCardProps = {
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
