export type FocustrapOptions = {
    /**
     * Enable/disable focus trap
     * @default true
     */
    enabled?: boolean;
    /**
     * Element to focus on mount (default: )
     * @default any first focusable element
     */
    initialFocus?: HTMLElement | string;
    /**
     * Return focus to the previous element during unmount
     * @default true
     */
    returnFocus?: boolean;
};
