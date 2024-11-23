import {
    type ComputePositionReturn,
    type Middleware,
    type MiddlewareData,
    type Placement,
    offset as offsetMiddleware,
    flip as flipMiddleware,
    arrow as arrowMiddleware,
    hide as hideMiddleware,
    shift as shiftMiddleware,
    size as sizeMiddleware
} from '@floating-ui/dom';
import type { CreateFloatingProps, Side, Alignment } from './create-floating.type.js';
import { get, writable } from 'svelte/store';

export function getSideAndAlignFromPlacement(placement: Placement): [Side, Alignment] {
    const [side, align = 'center'] = placement.split('-');
    return [side, align] as [Side, Alignment];
}

export function roundByDPR(value: number) {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(value * dpr) / dpr;
}

export function parseBooleanOrObject<T>(value?: boolean | T): T | undefined {
    return typeof value === 'boolean' ? undefined : value;
}

export function buildMiddlewares(
    props: CreateFloatingProps,
    arrowEl: HTMLElement | SVGSVGElement | undefined
): Middleware[] {
    const middlewares: Middleware[] = [];

    if (props.offset || props.offset === 0) {
        middlewares.push(offsetMiddleware(parseBooleanOrObject(props.offset)));
    }
    if (props.flip) {
        middlewares.push(flipMiddleware(parseBooleanOrObject(props.flip)));
    }
    if (props.shift) {
        middlewares.push(shiftMiddleware(parseBooleanOrObject(props.shift)));
    }
    if (props.size) {
        middlewares.push(sizeMiddleware(parseBooleanOrObject(props.size)));
    }
    if (props.hide) {
        middlewares.push(hideMiddleware(parseBooleanOrObject(props.hide)));
    }
    if (props.arrow && arrowEl) {
        middlewares.push(arrowMiddleware({ ...parseBooleanOrObject(props.arrow), element: arrowEl }));
    }

    return middlewares.map((m: Middleware) => {
        return (props.customMiddleware ?? []).find((cM: Middleware) => m.name === cM.name) ?? m;
    });
}

export function createFloatingPropsStore(
    defaultProps: Partial<CreateFloatingProps> = {},
    initialProps: Partial<CreateFloatingProps> = {}
) {
    const store = writable<CreateFloatingProps>({ ...defaultProps, ...initialProps });
    return {
        ...store,
        get value() {
            return get(store);
        },
        update(props: Partial<CreateFloatingProps> = {}) {
            store.update((value) => ({ ...value, ...props }));
        }
    };
}

export function buildFloatingStyle(
    data: ComputePositionReturn,
    props: CreateFloatingProps
): Partial<CSSStyleDeclaration> {
    const x = roundByDPR(data.x);
    const y = roundByDPR(data.y);

    let floatingStyle = {
        position: props.strategy,
        left: '0',
        top: '0',
        transform: 'unset'
    };
    if (props.transform) {
        floatingStyle = {
            ...floatingStyle,
            top: '0',
            left: '0',
            transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`
        };
    } else {
        floatingStyle = {
            ...floatingStyle,
            left: `${x}px`,
            top: `${y}px`
        };
    }

    return floatingStyle;
}

export function buildArrowStyle(
    side: Side,
    data: MiddlewareData,
    arrow?: HTMLElement | SVGElement
): Partial<CSSStyleDeclaration> {
    if (!data.arrow || !arrow) {
        return {};
    }

    const arrowOffset = arrow ? arrow.getBoundingClientRect().height / 2 : 0;
    const arrowX = data.arrow?.x;
    const arrowY = data.arrow?.y;
    const staticSide: string = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right'
    }[side]!;

    return {
        left: arrowX != null ? `${arrowX}px` : 'unset',
        top: arrowY != null ? `${arrowY}px` : 'unset',
        right: 'unset',
        bottom: 'unset',
        [staticSide]: `-${arrowOffset}px`
        // [staticSide]: '-5px'
    };
}
