import {
    arrow,
    flip,
    hide,
    offset,
    shift,
    size,
    type ArrowOptions,
    type FlipOptions,
    type HideOptions,
    type Middleware,
    type OffsetOptions,
    type ShiftOptions,
    type SizeOptions
} from '@floating-ui/dom';
import { parseBooleanOrObject } from './parse-boolean-or-object.js';

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

/**
 * Build array of common floating-ui middleware
 * @param props
 * @returns
 */
export function buildFloatingMiddlewares(props: BuildFloatingMiddlewareProps): Middleware[] {
    const middlewares: Middleware[] = [];

    if (props.offset || props.offset === 0) {
        middlewares.push(offset(parseBooleanOrObject(props.offset)));
    }
    if (props.flip) {
        middlewares.push(flip(parseBooleanOrObject(props.flip)));
    }
    if (props.shift) {
        middlewares.push(shift(parseBooleanOrObject(props.shift)));
    }
    if (props.size) {
        middlewares.push(size(parseBooleanOrObject(props.size)));
    }
    if (props.hide) {
        middlewares.push(hide(parseBooleanOrObject(props.hide)));
    }

    (props.middleware ?? [])
        .filter((mw): mw is Middleware => Boolean(mw))
        .forEach((mw) => {
            if (!middlewares.some((m) => m.name === mw.name)) {
                middlewares.push(mw);
            }
        });

    if (props.arrow && props.arrowEl) {
        middlewares.push(arrow({ ...parseBooleanOrObject(props.arrow), element: props.arrowEl }));
    }

    return middlewares;
}
