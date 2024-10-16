import type { Placements, Radius, Sizes0To5 } from '$lib/shared.types.js';

export type FloatingProps = {
    elementRef?: HTMLDivElement;
    isOpen?: boolean;
    size?: (typeof Sizes0To5)[number];
    radius?: (typeof Radius)[number];
    placement?: (typeof Placements)[number];
    transitionDelay?: number;
    transitionDuration?: number;
    offset?: number;
    arrow?: boolean;
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
