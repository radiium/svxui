import { Sizes1To3, Colors } from '../../constants.js';
export const defaultSwitchProps = {
    elementRef: undefined,
    size: '2',
    color: 'gray'
};
export const docSwitchPropsDefs = {
    title: 'Switch',
    props: [
        {
            name: 'elementRef',
            type: 'HTMLInputElement'
        },
        {
            name: 'color',
            type: 'enum',
            values: Colors,
            default: defaultSwitchProps.color
        },
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To3,
            default: defaultSwitchProps.size
        }
    ],
    slots: [],
    events: []
};
