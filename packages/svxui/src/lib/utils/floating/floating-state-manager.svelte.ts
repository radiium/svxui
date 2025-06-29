import {
    computePosition,
    type ComputePositionConfig,
    type FloatingElement,
    type ReferenceElement
} from '@floating-ui/dom';
import { onDestroy } from 'svelte';
import type { FloatingStateManagerProps, FloatingState } from './types.js';
import { parsePlacement } from './utils/parse-placement.js';
import { roundByDPR } from './utils/round-by-dpr.js';
import { styleObjectToString } from './utils/style-object-to-string.js';

/**
 * Manage floating-ui state
 */
export class FloatingStateManager {
    reference: ReferenceElement | undefined = $state(undefined);
    floating: FloatingElement | undefined = $state(undefined);

    #props: FloatingStateManagerProps | undefined = $state(undefined);
    #state: FloatingState | undefined = $state(undefined);
    #style = $derived.by(() => this.#buildStyle(this.#props, this.#state));

    constructor(props: Partial<FloatingStateManagerProps>) {
        this.#props = props;
        onDestroy(this.#destroy);
    }

    async update(): Promise<void> {
        if (!this.reference || !this.floating || !this.#props) {
            return;
        }

        const config: ComputePositionConfig = {
            strategy: this.#props.strategy,
            placement: this.#props.placement,
            middleware: this.#props.middleware
        };

        const response = await computePosition(this.reference, this.floating, config);
        const [side, alignment] = parsePlacement(response.placement);

        this.#state = {
            ...response,
            side,
            alignment
        };
    }

    #buildStyle(props: FloatingStateManagerProps | undefined, state: FloatingState | undefined): string {
        if (!props || !state) {
            return '';
        }

        const floatingStyle = {
            position: props.strategy,
            left: '0px',
            top: '0px'
        };

        if (!this.floating) {
            return styleObjectToString(floatingStyle);
        }

        const x = roundByDPR(state.x);
        const y = roundByDPR(state.y);

        if (props.transform) {
            return styleObjectToString({
                ...floatingStyle,
                top: '0',
                left: '0',
                transform: `translate(${x}px,${y}px)`
            });
        }

        return styleObjectToString({
            ...floatingStyle,
            left: `${x}px`,
            top: `${y}px`
        });
    }

    #destroy = $effect.root(() => {
        $effect.pre(() => {
            if (!this.reference || !this.floating) {
                return;
            }

            if (!this.#props?.whileElementsMounted) {
                this.update();
                return;
            }

            return this.#props.whileElementsMounted(this.reference, this.floating, this.update.bind(this));
        });
    });

    get state() {
        return this.#state;
    }

    get style() {
        return this.#style;
    }
}
