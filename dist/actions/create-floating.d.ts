import { type ComputePositionConfig, type Middleware, type Placement, type OffsetOptions, type FlipOptions, type ArrowOptions, type ComputePositionReturn, type AutoUpdateOptions, type Strategy, type HideOptions, type ShiftOptions, type SizeOptions } from '@floating-ui/dom';
import type { ActionReturn } from 'svelte/action';
import { type Unsubscriber } from 'svelte/store';
export type ReferenceParameters = void;
export type ReferenceAttributes = Record<string, unknown>;
export type ReferenceActionReturn = ActionReturn<ReferenceParameters, ReferenceAttributes>;
export type FloatingParameters = void;
export type FloatingAttributes = Record<string, unknown>;
export type FloatingActionReturn = ActionReturn<FloatingParameters, FloatingAttributes>;
export type ArrowParameters = void;
export type ArrowAttributes = Record<string, unknown>;
export type ArrowActionReturn = ActionReturn<ArrowParameters, ArrowAttributes>;
export type CreateFloatingProps = Partial<ComputePositionConfig> & {
    defaultOpen: boolean;
    strategy?: Strategy;
    placement?: Placement;
    autoUpdate?: boolean | Partial<AutoUpdateOptions>;
    transform?: boolean;
    offset?: boolean | OffsetOptions;
    flip?: boolean | FlipOptions;
    shift?: boolean | ShiftOptions;
    size?: boolean | SizeOptions;
    hide?: boolean | HideOptions;
    arrow?: boolean | ArrowOptions;
    customMiddleware?: Middleware[];
};
export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';
export interface FloatingState extends ComputePositionReturn {
    side: Side;
    align: Alignment;
    floatingStyle: string;
    arrowStyle: string;
}
/**
 * Create floating actions for
 * - reference
 * - floating
 * - arrow
 *
 * @param props
 * @returns
 */
export declare function createFloating(props?: Partial<CreateFloatingProps>): {
    elements: {
        referenceAction: (node: HTMLElement) => ReferenceActionReturn;
        floatingAction: (node: HTMLElement) => FloatingActionReturn;
        arrowAction: (node: HTMLElement) => ArrowActionReturn;
    };
    states: {
        open: () => void;
        close: () => void;
        isOpen: {
            subscribe: (this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: import("svelte/store").Invalidator<boolean> | undefined) => Unsubscriber;
        };
        onFloatingChange: (this: void, run: import("svelte/store").Subscriber<FloatingState>, invalidate?: import("svelte/store").Invalidator<FloatingState> | undefined) => Unsubscriber;
    };
};
