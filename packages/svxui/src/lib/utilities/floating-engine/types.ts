import type {
    ComputePositionReturn,
    FloatingElement,
    Middleware,
    Placement,
    Platform,
    ReferenceElement,
    Strategy
} from '@floating-ui/dom';

export type FloatingSide = 'top' | 'right' | 'bottom' | 'left';
export type FloatingAlignment = 'start' | 'center' | 'end';

/**
 * Engine options
 */
export type FloatingEngineOptions = {
    /**
     * Use css transform instead top/left positionning
     */
    transform?: boolean;
    /**
     * floating-ui strategy
     */
    strategy?: Strategy;
    /**
     * floating-ui placement
     */
    placement?: Placement;
    /**
     * Array of floating-ui middlewares (offset, arrow, etc..)
     */
    middleware?: Array<Middleware | undefined | null | false>;
    /**
     * Platform
     */
    platform?: Platform | undefined;
    /**
     * Callback called for trigger update
     * useFloating does not trigger the update if function is provided
     */
    whileElementsMounted?: (
        reference: ReferenceElement,
        floating: FloatingElement,
        update: () => void
    ) => () => void;
};

/**
 * Floating ui state
 */
export type FloatingEngineState = ComputePositionReturn & {
    side: FloatingSide;
    alignment: FloatingAlignment;
};
