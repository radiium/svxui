import type { FloatingEngineOptions } from '$lib/utilities/floating-engine/types.js';

export type FloationgPatternContext = {
    pattern?: 'tooltip' | 'popover';
    open?: boolean;
    triggerId?: string;
    contentId?: string;
};

export type FloatingPatternState = {
    readonly triggerAttrs: Record<string, unknown>;
    readonly contentAttrs: Record<string, unknown>;
};

export type FloatingBuilderOptions = {
    isOpen: boolean;
    pattern?: 'tooltip' | 'popover';
    // Floating config
    engineOptions?: FloatingEngineOptions | undefined;
    // Focus management
    focus?: {
        onOpen?: HTMLElement | string | undefined;
        onClose?: HTMLElement | string | undefined;
        trap?: boolean | undefined;
    };
    // Close management
    closeOn?: {
        clickBackdrop?: boolean;
        clickOutside?: boolean;
        clickTrigger?: boolean;
        escape?: boolean;
        resize?: boolean;
        scroll?: boolean;
    };
};
