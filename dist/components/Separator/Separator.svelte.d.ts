import { SvelteComponent } from "svelte";
import type { SeparatorProps } from './Separator.types.js';
declare const __propDef: {
    props: SeparatorProps;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
type SeparatorProps_ = typeof __propDef.props;
export { SeparatorProps_ as SeparatorProps };
export type SeparatorEvents = typeof __propDef.events;
export type SeparatorSlots = typeof __propDef.slots;
export default class Separator extends SvelteComponent<SeparatorProps_, SeparatorEvents, SeparatorSlots> {
}
