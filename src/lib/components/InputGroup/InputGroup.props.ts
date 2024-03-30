import type { InputGroupProps } from './InputGroup.types.js';

export const defaultInputGroupProps: InputGroupProps = {};
export const docInputGroupPropsDefs = {
    props: [
        {
            name: 'elementRef',
            type: 'HTMLButtonElement'
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
