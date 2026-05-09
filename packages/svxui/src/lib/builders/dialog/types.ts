/**
 * Input-number state options
 */
export type DialogBuilderOptions = {
    open?: boolean;
    /**
     * Close dialog on backdrop click
     */
    closeOnBackdropClick?: boolean;
    /**
     * Close dialog on escape key
     */
    closeOnEscape?: boolean;
    /**
     * Enable focustrap
     */
    focusTrap?: boolean;
    /**
     * Callback called on open change
     * @param newValue
     * @returns
     */
    onOpen?: () => void;
    /**
     * Callback called on open change
     * @param newValue
     * @returns
     */
    onClose?: (reason?: 'escape' | 'backdrop') => void;
};

/**
 * HTML data-attributes written to the dialog backdrop element
 */
export type DialogBackdropAttributes = {
    readonly role: 'presentation';
    readonly inert?: true | undefined;
    readonly 'data-state': 'open' | 'closed';
    readonly onclick?: (e: MouseEvent) => void;
};

/**
 * HTML data-attributes written to the dialog content element
 */
export type DialogContentAttributes = {
    readonly tabindex: number;
    readonly role: 'dialog';
    readonly inert?: true | undefined;
    readonly 'aria-modal': true;
    readonly 'data-state': 'open' | 'closed';
};
