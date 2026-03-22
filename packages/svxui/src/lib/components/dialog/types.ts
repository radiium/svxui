import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type DialogSize = '0' | '1' | '2' | '3' | '4';

/**
 * Extends all the standard HTML attributes of the `<div>` element.
 */
export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, 'open' | 'children'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLDivElement;
    /**
     * Manage/listen open state
     */
    isOpen?: boolean;
    /**
     * Callback when dialog is closed
     */
    onClose?: (reason?: 'escape' | 'backdrop') => void;
    /**
     * Manage dialog layout
     *  - 'fixed'      => Centered in viewport, overflow hidden
     *  - 'scroll'     => Scrollable vertically, useful for tall content
     *  - 'fullscreen' => Fills the entire viewport (100vw × 100vh)
     */
    layout?: 'fixed' | 'scroll' | 'fullscreen';
    /**
     * Close dialog on backdrop click
     */
    closeOnBackdropClick?: boolean;
    /**
     * Close dialog on escape key
     */
    closeOnEscape?: boolean;
    /**
     * Trap focus inside dialog content
     */
    focusTrap?: boolean;
    /**
     * Lock body scroll when open
     */
    lockScroll?: boolean;
    /**
     * Apply blur effect to the backdrop
     */
    blurBackdrop?: boolean;
    /**
     * Keep dialog in the DOM when closed instead of unmounting it
     */
    keepMounted?: boolean;
    /**
     * Transition delay of open/close animation
     */
    transitionDelay?: number;
    /**
     * Transition duration of open/close animation
     */
    transitionDuration?: number;
    /**
     * Dialog content to render
     */
    children?: Snippet<[void]>;
};
