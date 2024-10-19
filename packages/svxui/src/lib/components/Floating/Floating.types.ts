import type { Placements, Radius, Sizes0To5 } from '$lib/shared.types.js';
import type { HTMLAttributes } from 'svelte/elements';

export type FloatingProps = Omit<HTMLAttributes<HTMLDivElement>, 'size'> & {
    elementRef?: HTMLDivElement;
    isOpen?: boolean;
    size?: (typeof Sizes0To5)[number];
    radius?: (typeof Radius)[number];
    placement?: (typeof Placements)[number];
    transitionDelay?: number;
    transitionDuration?: number;
    offset?: number;
    arrow?: boolean;
    flip?: boolean;
    shift?: boolean;
    hide?: boolean;
    outline?: boolean;
    backdrop?: boolean;
    autoUpdate?: boolean;
    closeOnClickBackdrop?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    closeOnResize?: boolean;
    closeOnScroll?: boolean;
    portal?: boolean;
};
