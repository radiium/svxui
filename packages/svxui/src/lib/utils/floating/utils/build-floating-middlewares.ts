import { arrow, flip, hide, offset, shift, size, type Middleware } from '@floating-ui/dom';
import type { BuildFloatingMiddlewareProps } from '../types.js';
import { parseBooleanOrObject } from '../utils/parse-boolean-or-object.js';

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
    if (props.arrow && props.arrowEl) {
        middlewares.push(arrow({ ...parseBooleanOrObject(props.arrow), element: props.arrowEl }));
    }

    return middlewares.map((m: Middleware) => {
        return (
            (props.middleware ?? [])
                .filter((cm) => cm !== undefined && cm !== null && cm !== false)
                .find((cm: Middleware) => m.name === cm.name) ?? m
        );
    });
}
