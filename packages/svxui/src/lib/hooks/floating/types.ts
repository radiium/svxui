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

export type UseFloatingMiddlewareProps = {
    offset?: boolean | OffsetOptions;
    flip?: boolean | FlipOptions;
    shift?: boolean | ShiftOptions;
    size?: boolean | SizeOptions;
    hide?: boolean | HideOptions;
    arrow?: boolean | ArrowOptions;
    middleware?: Array<Middleware | undefined | null | false>;
    arrowEl: HTMLElement | SVGSVGElement | undefined;
};

export type UseFloatingProps = {
    transform?: boolean;
    strategy?: Strategy;
    placement?: Placement;
    middleware?: Array<Middleware | undefined | null | false>;
    whileElementsMounted?: (
        reference: ReferenceElement,
        floating: FloatingElement,
        update: () => void
    ) => () => void;
};

export type FloatingSide = 'top' | 'right' | 'bottom' | 'left';
export type FloatingAlignment = 'start' | 'center' | 'end';
export type UseFloatingState = ComputePositionReturn & {
    side: FloatingSide;
    alignment: FloatingAlignment;
};
