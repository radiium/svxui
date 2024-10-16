import type {
    ArrowOptions,
    AutoUpdateOptions,
    ComputePositionReturn,
    FlipOptions,
    HideOptions,
    Middleware,
    OffsetOptions,
    Placement,
    ShiftOptions,
    SizeOptions,
    Strategy
} from '@floating-ui/dom';
import type { ActionReturn } from 'svelte/action';

// Reference action types
export type ReferenceParameters = void;
export type ReferenceAttributes = Record<string, unknown>;
export type ReferenceActionReturn = ActionReturn<ReferenceParameters, ReferenceAttributes>;

// Floating action types
export type FloatingParameters = void;
export type FloatingAttributes = Record<string, unknown>;
export type FloatingActionReturn = ActionReturn<FloatingParameters, FloatingAttributes>;

// Arrow action types
export type ArrowParameters = void;
export type ArrowAttributes = Record<string, unknown>;
export type ArrowActionReturn = ActionReturn<ArrowParameters, ArrowAttributes>;

// Builder types
export type CreateFloatingProps = {
    autoUpdate?: boolean | Partial<AutoUpdateOptions>;
    transform?: boolean;
    // Floating options
    strategy?: Strategy;
    placement?: Placement;
    // Middlewares
    offset?: boolean | OffsetOptions;
    flip?: boolean | FlipOptions;
    shift?: boolean | ShiftOptions;
    size?: boolean | SizeOptions;
    hide?: boolean | HideOptions;
    arrow?: boolean | ArrowOptions;
    customMiddleware?: Middleware[];
};

// State types
export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';
export type CreateFloatingState = ComputePositionReturn & {
    side: Side;
    align: Alignment;
};
