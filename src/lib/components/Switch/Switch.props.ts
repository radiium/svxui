import { Sizes1To3, Colors } from '$lib/constants.js';
import type { SwitchProps } from './Switch.types.js';

export const defaultSwitchProps: SwitchProps = {
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
            name: 'size',
            type: 'enum',
            values: Sizes1To3,
            default: defaultSwitchProps.size
        },
        {
            name: 'color',
            type: 'enum',
            values: Colors,
            default: defaultSwitchProps.color
        }
    ],
    slots: [],
    events: []
};
