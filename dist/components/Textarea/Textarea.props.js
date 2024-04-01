import { Sizes1To3 } from '../../constants.js';
export const defaultTextareaProps = {
    elementRef: undefined,
    value: undefined,
    size: '2',
    fullWidth: false
};
export const docTextareaPropsDefs = {
    title: 'Textarea',
    props: [
        {
            name: 'elementRef',
            type: 'HTMLTextAreaElement'
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To3,
            default: defaultTextareaProps.size
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            default: defaultTextareaProps.fullWidth
        },
        {
            name: 'value',
            type: 'string',
            default: defaultTextareaProps.value
        }
    ],
    slots: [],
    events: []
};
