import type { Color, FloatingPlacement, Radius } from '$lib/shared.types.js';
import type { FloatingEngineState } from '$lib/utilities/floating-engine/types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, SVGAttributes } from 'svelte/elements';

export type FloatingSize = '0' | '1' | '2' | '3' | '4' | '5';
export type FloatingVariant = 'solid' | 'soft' | 'clear';

export type FloatingProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Rendered DOM element
     */
    ref?: HTMLDivElement;
    /**
     * Manage/listen open state
     */
    isOpen?: boolean;
    /**
     * Callback when floating is closed
     */
    onClose?: () => void;
    /**
     * Floating size
     */
    size?: FloatingSize;
    /**
     * Floating color
     */
    color?: Color;
    /**
     * Floating variant
     */
    variant?: FloatingVariant;
    /**
     * Floating outline
     */
    outline?: boolean;
    /**
     * Floating radius
     */
    radius?: Radius;
    /**
     * Updateposition on scroll
     */
    autoUpdate?: boolean;
    /**
     * Prefered placement
     */
    placement?: FloatingPlacement;
    /**
     * Floating offset from target
     */
    offset?: number;
    /**
     * Show arrow
     */
    arrow?: boolean;
    /**
     * Arrow width (only if arrow is true)
     */
    arrowWidth?: number;
    /**
     * Arrow height (only if arrow is true)
     */
    arrowHeight?: number;
    /**
     * FloatingArrow tip radius
     */
    arrowTipRadius?: number;
    /**
     * Use flip floating middleware
     */
    flip?: boolean;
    /**
     * Use shift floating middleware
     */
    shift?: boolean;
    /**
     * Use hide floating middleware
     */
    hide?: boolean;
    /**
     * Show backdrop
     */
    backdrop?: boolean;
    /**
     * Enable portal rendering
     */
    portal?: boolean;
    /**
     * Portal target identifier. Only if portal is true
     */
    portalTarget?: string;
    // portal?: Pick<PortalProps, 'target' | 'disabled'>;
    /**
     * Focus element on open flaoting
     */
    focusOnOpen?: string | HTMLElement | undefined;
    /**
     * Focus element on close flaoting
     */
    focusOnClose?: string | HTMLElement | undefined;
    /**
     * Trap focus inside floating content
     */
    focusTrap?: boolean;
    /**
     * Close floating on backdrop click. Only if backdrop is true
     */
    closeOnClickBackdrop?: boolean;
    /**
     * Close floating on outside click
     */
    closeOnClickOutside?: boolean;
    /**
     * Close floating on escape key
     */
    closeOnEscape?: boolean;
    /**
     * Close floating on resize
     */
    closeOnResize?: boolean;
    /**
     * Close floating on scroll
     */
    closeOnScroll?: boolean;
    /**
     * Transition delay of open/close animation
     */
    transitionDelay?: number;
    /**
     * Transition duration of open/close animation
     */
    transitionDuration?: number;
    /**
     * Floating trigger content to render
     */
    trigger?: Snippet<[void]>;
    /**
     * Floating content to render
     */
    content?: Snippet<[void]>;
    /**
     * Floating content to render
     */
    backdropChild?: Snippet<[void]>;
};

export type FloatingArrowProps = Omit<SVGAttributes<SVGElement>, 'color' | 'width' | 'height'> & {
    /**
     * Rendered DOM element
     */
    ref?: SVGElement | HTMLElement;
    /**
     * FloatingArrow color
     */
    color?: Color;
    /**
     * FloatingArrow variant
     */
    variant?: FloatingVariant;
    /**
     * FloatingArrow outline
     */
    outline?: boolean;
    /**
     * Floating positioning state
     */
    floatingState?: FloatingEngineState;
    /**
     * Z-index of arrow
     */
    zIndex?: number;
    /**
     * FloatingArrow width
     */
    width?: number;
    /**
     * FloatingArrow height
     */
    height?: number;
    /**
     * FloatingArrow tip radius
     */
    tipRadius?: number;
};
