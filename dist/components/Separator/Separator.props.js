import { Orientations, Sizes1To4 } from '../../constants.js';
export const defaultSeparatorProps = {
    elementRef: undefined,
    size: '2',
    orientation: 'horizontal'
};
export const docSeparatorPropsDefs = {
    props: [
        {
            name: 'elementRef',
            type: 'HTMLDivElement'
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To4,
            default: defaultSeparatorProps.size
        },
        {
            name: 'orientation',
            type: 'enum',
            values: Orientations,
            default: defaultSeparatorProps.orientation
        }
    ],
    slots: [],
    events: []
};
