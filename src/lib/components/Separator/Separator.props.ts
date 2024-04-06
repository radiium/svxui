import { Orientations, Sizes1To4 } from '$lib/constants.js';
import type { SeparatorProps } from './Separator.types.js';

export const defaultSeparatorProps: SeparatorProps = {
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
