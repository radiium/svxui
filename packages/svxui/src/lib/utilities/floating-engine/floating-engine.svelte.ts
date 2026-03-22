import { styleObjectToString } from '$lib/internals/style-object-to-string.js';
import {
    computePosition,
    type FloatingElement,
    type Placement,
    type ReferenceElement
} from '@floating-ui/dom';
import { onDestroy } from 'svelte';
import { parsePlacement } from './internals/parse-placement.js';
import { roundByDPR } from './internals/round-by-dpr.js';
import type { FloatingEngineOptions, FloatingEngineState } from './types.js';

/**
 * Low-level utility for managing floating-ui position computation, CSS style generation, and auto-update lifecycle.
 *
 * For complete tooltip/popover behavior with ARIA patterns and focus management, use `FloatingBuilder` instead.
 */
export class FloatingEngine {
    /**
     * Reference element used as anchor
     */
    reference: HTMLElement | ReferenceElement | undefined = $state(undefined);

    /**
     * Floating element to be positioned
     */
    floating: FloatingElement | undefined = $state(undefined);

    /** Configuration options for the engine */
    #options: FloatingEngineOptions | undefined = $state(undefined);
    /** Latest computed floating-ui state */
    #state: FloatingEngineState | undefined = $state(undefined);
    /** Reactive CSS style object derived from state */
    #styleObject = $derived.by(() => this.#buildStyle(this.#options, this.#state));
    /** Serialized CSS style string */
    #style = $derived.by(() => styleObjectToString(this.#styleObject));

    /**
     * Create a new FloatingEngine instance
     */
    constructor(options: Partial<FloatingEngineOptions>) {
        this.#options = options;
        onDestroy(this.#destroy);
    }

    /**
     * Read-only access to the current engine state
     */
    get state(): FloatingEngineState | undefined {
        return this.#state;
    }

    /**
     * Computed style object
     */
    get styleObject(): Partial<CSSStyleDeclaration> {
        return this.#styleObject;
    }

    /**
     * Computed style as CSS string
     */
    get style(): string {
        return this.#style;
    }

    /**
     * Recompute the floating element position
     */
    async update(): Promise<void> {
        if (!this.reference || !this.floating || !this.#options) {
            return;
        }

        const response = await computePosition(this.reference, this.floating, {
            strategy: this.#options?.strategy ?? 'fixed',
            placement: this.#options?.placement ?? 'bottom',
            middleware: this.#options?.middleware ?? [],
            ...(this.#options?.platform //
                ? { platform: this.#options?.platform }
                : undefined)
        });

        const [side, alignment] = parsePlacement(response.placement);

        this.#state = {
            ...response,
            side,
            alignment
        };
    }

    /**
     * Build inline styles from options and computed state
     */
    #buildStyle(
        props: FloatingEngineOptions | undefined,
        state: FloatingEngineState | undefined
    ): Partial<CSSStyleDeclaration> {
        if (!props || !state) {
            return {};
        }

        const transformOriginMap: Record<Placement, string> = {
            top: 'bottom center',
            'top-start': 'bottom left',
            'top-end': 'bottom right',
            bottom: 'top center',
            'bottom-start': 'top left',
            'bottom-end': 'top right',
            left: 'center center',
            'left-start': 'top left',
            'left-end': 'bottom left',
            right: 'center center',
            'right-start': 'top right',
            'right-end': 'bottom right'
        };

        const floatingStyle = {
            position: props.strategy,
            left: '0px',
            top: '0px'
        };

        if (!this.floating) {
            return floatingStyle;
        }

        const x = roundByDPR(state.x);
        const y = roundByDPR(state.y);

        return props.transform
            ? {
                  ...floatingStyle,
                  top: '0',
                  left: '0',
                  transform: `translate(${x}px,${y}px)`,
                  transformOrigin: transformOriginMap[state.placement]
              }
            : {
                  ...floatingStyle,
                  top: `${y}px`,
                  left: `${x}px`
              };
    }

    /**
     * Lifecycle cleanup and auto-update handling
     */
    #destroy = $effect.root(() => {
        $effect.pre(() => {
            if (!this.reference || !this.floating) {
                return;
            }

            if (!this.#options?.whileElementsMounted) {
                this.update();
                return;
            }

            return this.#options.whileElementsMounted(
                this.reference, //
                this.floating,
                this.update.bind(this)
            );
        });
    });
}
