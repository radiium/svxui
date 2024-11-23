import {
    autoUpdate as autoUpdateFn,
    computePosition,
    type FloatingElement,
    type ReferenceElement
} from '@floating-ui/dom';
import { readonly, writable } from 'svelte/store';
import { defaultCreateFloatingProps } from './create-floating.props.js';
import type {
    ArrowActionReturn,
    CreateFloatingProps,
    CreateFloatingState,
    FloatingActionReturn,
    ReferenceActionReturn
} from './create-floating.type.js';
import {
    buildArrowStyle,
    buildFloatingStyle,
    buildMiddlewares,
    createFloatingPropsStore,
    getSideAndAlignFromPlacement,
    parseBooleanOrObject
} from './create-floating.util.js';

/**
 * Create floating actions for
 * - reference
 * - floating
 * - arrow
 *
 * @param initialProps
 * @returns
 */
export function createFloating(initialProps: Partial<CreateFloatingProps> = {}) {
    let referenceEl: ReferenceElement | undefined = undefined;
    let floatingEl: FloatingElement | undefined = undefined;
    let arrowEl: HTMLElement | SVGSVGElement | undefined = undefined;

    const props = createFloatingPropsStore(defaultCreateFloatingProps, initialProps);
    const floatingState = writable<CreateFloatingState>();

    // Update position

    const updatePosition = async (currentProps: CreateFloatingProps) => {
        if (referenceEl && floatingEl) {
            const options = {
                strategy: currentProps.strategy,
                placement: currentProps.placement,
                middleware: buildMiddlewares(currentProps, arrowEl)
            };

            const response = await computePosition(referenceEl, floatingEl, options);
            const [side, align] = getSideAndAlignFromPlacement(response.placement);

            floatingState.set({
                ...response,
                side,
                align
            });

            Object.assign(floatingEl.style, buildFloatingStyle(response, currentProps));

            // Object.assign(floatingEl.style, {
            //     left: `${response.x}px`,
            //     top: `${response.y}px`
            // });

            if (response.middlewareData.arrow && currentProps.arrow && arrowEl) {
                const arrowX = response.middlewareData.arrow?.x;
                const arrowY = response.middlewareData.arrow?.y;
                const staticSide: string = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right'
                }[side]!;

                Object.assign(arrowEl.style, buildArrowStyle(side, response.middlewareData, arrowEl));

                Object.assign(arrowEl.style, {
                    position: 'absolute',
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    right: '',
                    bottom: '',
                    [staticSide]: '-5px'
                });
            }
        }
    };

    function initAutoUpdate(currentProps: CreateFloatingProps): () => void {
        if (currentProps.autoUpdate && referenceEl && floatingEl) {
            return autoUpdateFn(
                referenceEl,
                floatingEl,
                () => updatePosition(currentProps),
                parseBooleanOrObject(currentProps.autoUpdate) || {}
            );
        }
        return () => {};
    }

    // Actions

    const referenceAction = (node: HTMLElement): ReferenceActionReturn => {
        referenceEl = node;
        updatePosition(props.value);
        return {};
    };

    const floatingAction = (node: HTMLElement): FloatingActionReturn => {
        floatingEl = node;
        updatePosition(props.value);
        let destroyAutoUpdate = initAutoUpdate(props.value);
        let unsubscribeProps = props.subscribe(() => updatePosition(props.value));
        return {
            update: () => {
                updatePosition(props.value);
                destroyAutoUpdate();
                destroyAutoUpdate = initAutoUpdate(props.value);
                unsubscribeProps();
                unsubscribeProps = props.subscribe(() => updatePosition(props.value));
            },
            destroy: () => {
                destroyAutoUpdate();
                unsubscribeProps();
            }
        };
    };

    const arrowAction = (node: HTMLElement | SVGSVGElement): ArrowActionReturn => {
        arrowEl = node;
        return {};
    };

    return {
        actions: {
            referenceAction,
            floatingAction,
            arrowAction
        },
        states: {
            updateProps: props.update,
            props: readonly(props),
            floatingState: readonly(floatingState)
        }
    };
}
