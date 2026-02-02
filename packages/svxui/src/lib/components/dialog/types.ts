import type { Radius } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type DialogSize = '1' | '2' | '3' | '4';

/**
 * Extends all the standard HTML attributes of the `<div>` element.
 */
export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
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
    onClose?: (reason: 'escape' | 'backdrop') => void;
    /**
     * Dialog size
     */
    size?: DialogSize;
    /**
     * Dialog border radius
     */
    radius?: Radius;
    /**
     * CSS width of dialog
     */
    width?: string;
    /**
     * CSS min-width of dialog
     */
    minWidth?: string;
    /**
     * CSS max-width of dialog
     */
    maxWidth?: string;
    /**
     * CSS height of dialog
     */
    height?: string;
    /**
     * CSS min-height of dialog
     */
    minHeight?: string;
    /**
     * CSS max-height of dialog
     */
    maxHeight?: string;
    /**
     * Disable dialog padding
     */
    noPadding?: boolean;
    /**
     * Open as fullscreen dialog
     */
    fullScreen?: boolean;
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
