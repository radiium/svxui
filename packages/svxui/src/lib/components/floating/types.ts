import type { Colors, Placements, Radius, Sizes0To5, VariantsCard } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, SVGAttributes } from 'svelte/elements';
import type { PortalProps } from '../portal/types.js';
import type { UseFloatingState } from '$lib/hooks/floating/types.js';

export type FloatingProps = Omit<HTMLAttributes<HTMLDivElement>, 'size'> & {
    elementRef?: HTMLDivElement;
    isOpen?: boolean;
    size?: (typeof Sizes0To5)[number];
    color?: (typeof Colors)[number];
    variant?: (typeof VariantsCard)[number];
    radius?: (typeof Radius)[number];

    autoUpdate?: boolean;
    placement?: (typeof Placements)[number];
    offset?: number;
    arrow?: boolean;
    flip?: boolean;
    shift?: boolean;
    hide?: boolean;

    backdrop?: boolean;
    portal?: boolean;
    portalTarget?: string;
    // portal?: Pick<PortalProps, 'target' | 'disabled'>;

    closeOnClickBackdrop?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    closeOnResize?: boolean;
    closeOnScroll?: boolean;

    transitionDelay?: number;
    transitionDuration?: number;

    trigger?: Snippet;
    content?: Snippet;
};

export type FloatingArrowProps = SVGAttributes<SVGElement> & {
    elementRef?: SVGElement | HTMLElement;
    outline?: boolean;
    color?: (typeof Colors)[number];
    variant?: (typeof VariantsCard)[number];
    floatingState?: UseFloatingState;

    width?: number;
    height?: number;

    tipRadius?: number;
    staticOffset?: string | number | null;
};
