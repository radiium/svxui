import { Sizes1To3, Colors, Variants, Aligns } from '$lib/constants.js';
import type { InputNumberProps } from './InputNumber.types.js';

export const defaultInputNumberProps: InputNumberProps = {
    elementRef: undefined,
    value: undefined,
    step: 1,
    min: undefined,
    max: undefined,
    size: '2',
    color: 'gray',
    variant: 'clear',
    align: 'end',
    fullWidth: false,
    disabled: false,
    required: false,
    readonly: undefined
};

export const docInputNumberPropsDefs = {
    props: [
        {
            name: 'elementRef',
            type: 'HTMLInputElement'
        },
        {
            name: 'color',
            type: 'enum',
            values: Colors,
            default: defaultInputNumberProps.color
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To3,
            default: defaultInputNumberProps.size
        },
        {
            name: 'variant',
            type: 'enum',
            values: Variants,
            default: defaultInputNumberProps.variant
        },
        {
            name: 'align',
            type: 'enum',
            values: Aligns,
            default: defaultInputNumberProps.align
        },
        {
            name: 'value',
            type: 'number',
            default: defaultInputNumberProps.value
        },
        {
            name: 'step',
            type: 'number',
            default: defaultInputNumberProps.step
        },
        {
            name: 'min',
            type: 'number',
            default: defaultInputNumberProps.min
        },
        {
            name: 'max',
            type: 'number',
            default: defaultInputNumberProps.max
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            default: defaultInputNumberProps.fullWidth
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: defaultInputNumberProps.disabled
        },
        {
            name: 'required',
            type: 'boolean',
            default: defaultInputNumberProps.required
        },
        {
            name: 'readonly',
            type: 'boolean',
            default: defaultInputNumberProps.readonly
        }
    ],
    slots: [],
    events: []
};
