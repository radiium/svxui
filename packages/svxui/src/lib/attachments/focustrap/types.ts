export type FocustrapOptions = {
    /**
     * Enable/disable focus trap
     * @default true
     */
    enabled?: boolean;
    /**
     * Element to focus when the focus trap is mounted.
     * If not specified, the first focusable element is focused.
     * @default undefined
     */
    initialFocus?: HTMLElement | string;
};
