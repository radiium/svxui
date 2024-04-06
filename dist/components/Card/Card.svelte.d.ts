import { SvelteComponent } from "svelte";
import type { CardProps } from './Card.types.js';
declare const __propDef: {
    props: CardProps;
    events: {
        click: MouseEvent;
        submit: SubmitEvent;
        focus: FocusEvent;
        blur: FocusEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
type CardProps_ = typeof __propDef.props;
export { CardProps_ as CardProps };
export type CardEvents = typeof __propDef.events;
export type CardSlots = typeof __propDef.slots;
export default class Card extends SvelteComponent<CardProps_, CardEvents, CardSlots> {
}
