import type { Sizes0To4 } from '../../constants.js';
import type { HTMLAttributes } from 'svelte/elements';
export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    isOpen?: boolean;
    size?: (typeof Sizes0To4)[number];
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    blockScroll?: boolean;
}
