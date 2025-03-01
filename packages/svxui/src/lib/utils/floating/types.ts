import type {
    ArrowOptions,
    ComputePositionReturn,
    FlipOptions,
    FloatingElement,
    HideOptions,
    Middleware,
    OffsetOptions,
    Placement,
    ReferenceElement,
    ShiftOptions,
    SizeOptions,
    Strategy
} from '@floating-ui/dom';

export type FloatingSide = 'top' | 'right' | 'bottom' | 'left';
export type FloatingAlignment = 'start' | 'center' | 'end';

export type BuildFloatingMiddlewareProps = {
    /**
     * Enable/disable/configure built in floating-ui middleware
     */
    offset?: boolean | OffsetOptions;
    flip?: boolean | FlipOptions;
    shift?: boolean | ShiftOptions;
    size?: boolean | SizeOptions;
    hide?: boolean | HideOptions;
    arrow?: boolean | ArrowOptions;
    arrowEl?: HTMLElement | SVGSVGElement | undefined;
    /**
     * Extra middleware(s) added at end
     */
    middleware?: Array<Middleware | undefined | null | false>;
};

export type FloatingStateManagerProps = {
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
     * Callback called for trigger update
     * useFloating does not trigger the update if function is provided
     */
    whileElementsMounted?: (
        reference: ReferenceElement,
        floating: FloatingElement,
        update: () => void
    ) => () => void;
};

export type FloatingState = ComputePositionReturn & {
    side: FloatingSide;
    alignment: FloatingAlignment;
};
