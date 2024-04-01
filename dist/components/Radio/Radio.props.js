import { Sizes1To3, Colors } from '../../constants.js';
export const defaultRadioProps = {
    elementRef: undefined,
    group: undefined,
    value: undefined,
    size: '2',
    color: 'gray'
};
export const docRadioPropsDefs = {
    title: 'Radio',
    props: [
        {
            name: 'elementRef',
            type: 'HTMLInputElement'
        },
        {
            name: 'color',
            type: 'enum',
            values: Colors,
            default: defaultRadioProps.color
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To3,
            default: defaultRadioProps.size
        },
        {
            name: 'group',
            type: 'any',
            default: defaultRadioProps.group
        },
        {
            name: 'value',
            type: 'any',
            default: defaultRadioProps.value
        }
    ],
    slots: [],
    events: []
};
