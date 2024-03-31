import { Sizes1To3 } from '$lib/constants.js';
import type { SelectOption, SelectProps } from './Select.types.js';

export const defaultSelectProps: SelectProps = {
    elementRef: undefined,
    options: [] as SelectOption[],
    value: undefined,
    size: '2',
    fullWidth: false
};

export const docSelectPropsDefs = {
    title: 'Select',
    props: [
        {
            name: 'elementRef',
            type: 'HTMLSelectElement'
        },
        {
            name: 'options',
            type: 'Array',
            default: defaultSelectProps.options
        },
        {
            name: 'value',
            type: 'string | number',
            default: defaultSelectProps.value
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To3,
            default: defaultSelectProps.size
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            default: defaultSelectProps.fullWidth
        },
        {
            name: 'multiple',
            type: 'boolean',
            default: defaultSelectProps.multiple
        }
    ],
    slots: [],
    events: []
};
