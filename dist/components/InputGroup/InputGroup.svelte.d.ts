import { SvelteComponent } from "svelte";
import type { InputGroupProps } from './InputGroup.types.js';
declare const __propDef: {
    props: InputGroupProps;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
type InputGroupProps_ = typeof __propDef.props;
export { InputGroupProps_ as InputGroupProps };
export type InputGroupEvents = typeof __propDef.events;
export type InputGroupSlots = typeof __propDef.slots;
export default class InputGroup extends SvelteComponent<InputGroupProps_, InputGroupEvents, InputGroupSlots> {
}
