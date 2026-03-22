export type ClickoutsideOptions = {
    /**
     * Called when click outside is detected on target.
     */
    onClickOutside?: (event: MouseEvent | PointerEvent) => void;
    /**
     * Enable/disable clickoutside
     * @default true
     */
    enabled?: boolean;
    /**
     * Elements to ignore in clickoutside detection.
     * Can be an array of selector string or HTMLElement.
     * @default []
     */
    ignoreElements?: (HTMLElement | string | undefined)[];
    /**
     * Type of event that triggers the clickoutside detection.
     * @default 'pointerdown'
     */
    eventType?: 'pointerdown' | 'mousedown' | 'touchstart' | 'click';
    /**
     * Element on which to listen for events instead of document.
     * @default document
     */
    eventTarget?: Document | HTMLElement | string;
};
