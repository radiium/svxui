export interface ClickoutsideOptions {
    /**
     * Called when click outside node
     */
    onClickOutside: (event: MouseEvent | PointerEvent) => void;
    /**
     * Enable/disable clickoutside
     * @default true
     */
    enabled?: boolean;
    /**
     * Elements to ignore in clickoutside detection
     * @default []
     */
    ignoreElements?: HTMLElement[];
    /**
     * Type of event that triggers the clickoutside detection
     * @default 'pointerdown'
     */
    eventType?: string;
    /**
     * Element on which to listen for events instead of document
     * @default document
     */
    eventTarget?: HTMLElement | Document | Window;
}
