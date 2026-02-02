import type { FloatingEngineOptions } from '$lib/utilities/floating-engine/types.js';

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
     * Focus behavior when the floating element opens or closes
     */
    focus?: {
        /**
         * Element to focus when the floating content opens
         */
        onOpen?: HTMLElement | string | undefined;

        /**
         * Element to focus when the floating content closes
         */
        onClose?: HTMLElement | string | undefined;

        /**
         * Whether to trap focus inside the floating content
         */
        trap?: boolean | undefined;
    };

    /**
     * Conditions that trigger closing the floating element
     */
    closeOn?: {
        /**
         * Close when clicking on the backdrop
         */
        clickBackdrop?: boolean;

        /**
         * Close when clicking outside the floating content
         */
        clickOutside?: boolean;

        /**
         * Close when clicking the trigger element
         */
        clickTrigger?: boolean;

        /**
         * Close when pressing the Escape key
         */
        escape?: boolean;

        /**
         * Close when the window is resized
         */
        resize?: boolean;

        /**
         * Close when the window or container is scrolled
         */
        scroll?: boolean;
    };
};
