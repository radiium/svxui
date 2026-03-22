/**
 * Input-number state options
 */
export type DialogBuilderOptions = {
    isOpen?: boolean;
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
     * Callback called on isOpen change
     * @param newValue
     * @returns
     */
    onOpen?: () => void;
    /**
     * Callback called on isOpen change
     * @param newValue
     * @returns
     */
    onClose?: (reason?: 'escape' | 'backdrop') => void;
};

/**
 * Dialog backdrop attributes
 */
export type DialogBackdropAttributes = {
    readonly id: string;
    readonly role: 'presentation';
    readonly inert?: true | undefined;
    readonly 'data-state': 'open' | 'closed';
    readonly onclick?: (e: MouseEvent) => void;
};

/**
 * Dialog content attributes
 */
export type DialogContentAttributes = {
    readonly id: string;
    readonly tabindex: number;
    readonly role: 'dialog';
    readonly inert?: true | undefined;
    readonly 'aria-modal': true;
    readonly 'data-state': 'open' | 'closed';
};
