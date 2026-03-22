import type {
    FloatingAlignment,
    FloatingEngineOptions,
    FloatingSide
} from '$lib/utilities/floating-engine/types.js';

export type FloatingBuilderOptions = {
    /**
     * Controls whether the floating element is open
     */
    isOpen: boolean;
    /**
     * Accessibility pattern to apply (tooltip or popover)
     */
    pattern?: 'tooltip' | 'popover';
    /**
     * Configuration options for the floating positioning engine
     */
    engineOptions?: FloatingEngineOptions | undefined;
    /**
     * Element to focus when the floating content opens
     */
    focusOnOpen?: HTMLElement | string | undefined;
    /**
     * Element to focus when the floating content closes
     */
    focusOnClose?: HTMLElement | string | undefined;
    /**
     * Whether to trap focus inside the floating content
     */
    focusTrap?: boolean | undefined;
    /**
     * Close when clicking on the backdrop
     */
    closeOnBackdropClick?: boolean;
    /**
     * Close when clicking outside the floating content
     */
    closeOnOutsideClick?: boolean;
    /**
     * Close when clicking the trigger element
     */
    closeOnClickTrigger?: boolean;
    /**
     * Close when pressing the Escape key
     */
    closeOnEscape?: boolean;
    /**
     * Close when the window is resized
     */
    closeOnResize?: boolean;
    /**
     * Close when the window or container is scrolled
     */
    closeOnScroll?: boolean;
};

/**
 * Floating trigger attributes
 */
export type FloatingTriggerAttributes = {
    readonly 'data-state': 'open' | 'closed';
    readonly [key: string]: unknown;
};

/**
 * Floating backdrop attributes
 */
export type FloatingBackdropAttributes = {
    readonly role: 'button';
    readonly tabindex: -1;
    readonly 'data-state': 'open' | 'closed';
};

/**
 * Floating content attributes
 */
export type FloatingContentAttributes = {
    readonly 'data-state': 'open' | 'closed';
    readonly 'data-side': FloatingSide | undefined;
    readonly 'data-align': FloatingAlignment | undefined;
    readonly style: string;
    readonly [key: string]: unknown;
};
