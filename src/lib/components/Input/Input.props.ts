import { Aligns, InputTypes, Sizes1To3 } from '$lib/constants.js';
import type { InputProps } from './Input.types.js';

export const defaultInputProps: InputProps = {
    elementRef: undefined,
    value: '',
    type: 'text',
    size: '2',
    align: 'start',
    fullWidth: false
};

export const docInputPropsDefs = {
    props: [
        {
            name: 'elementRef',
            type: 'HTMLInputElement'
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To3,
            default: defaultInputProps.size
        },
        {
            name: 'align',
            type: 'enum',
            values: Aligns,
            default: defaultInputProps.align
        },
        {
            name: 'type',
            type: 'enum',
            values: InputTypes,
            default: defaultInputProps.type
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            default: defaultInputProps.fullWidth
        },
        {
            name: 'value',
            type: 'string',
            default: defaultInputProps.value
        }
    ],
    slots: [],
    events: []
};
