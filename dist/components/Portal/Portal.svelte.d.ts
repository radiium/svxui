import { SvelteComponent } from "svelte";
/**
 * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
 */
export declare function portal(el: HTMLElement, target?: HTMLElement | string): {
    update: (newTarget: HTMLElement | string) => Promise<void>;
    destroy: () => void;
};
import type { PortalProps } from './Portal.types.js';
declare const __propDef: {
    props: PortalProps;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
type PortalProps_ = typeof __propDef.props;
export { PortalProps_ as PortalProps };
export type PortalEvents = typeof __propDef.events;
export type PortalSlots = typeof __propDef.slots;
export default class Portal extends SvelteComponent<PortalProps_, PortalEvents, PortalSlots> {
}
