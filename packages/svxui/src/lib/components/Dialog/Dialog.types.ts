import type { Radius, Sizes1To4 } from '$lib/shared.types.js';
import type { HTMLAttributes } from 'svelte/elements';

export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, 'size'> & {
    elementRef?: HTMLDivElement;
    isOpen?: boolean;
    size?: (typeof Sizes1To4)[number];
    radius?: (typeof Radius)[number];
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
    noPadding?: boolean;
    fullScreen?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    lockScroll?: boolean;
};
