import { Colors, Sizes1To3 } from '$lib/constants.js';
import type { InputRangeProps } from './InputRange.types.js';

export const defaultInputRangeProps: InputRangeProps = {
    elementRef: undefined,
    value: undefined,
    size: '2',
    color: 'gray',
    fullWidth: false
};

export const docInputRangePropsDefs = {
    props: [
        {
            name: 'elementRef',
            type: 'HTMLInputElement'
        },
        {
            name: 'value',
            type: 'any',
            default: defaultInputRangeProps.value
        },
        {
            name: 'color',
            type: 'enum',
            values: Colors,
            default: defaultInputRangeProps.color
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To3,
            default: defaultInputRangeProps.size
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            default: defaultInputRangeProps.fullWidth
        }
    ],
    slots: [],
    events: []
};
