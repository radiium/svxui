import type { SpacingProps } from '$lib/shared.types.js';
import { resolveSpace } from './resolve-space.js';

/**
 * Resolves spacing props (padding + margin) into a flat CSS property record
 * for use with `styleObjectToString`.
 */
export function resolveSpacing(props: SpacingProps): Record<string, string | undefined> {
    const { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml } = props;
    return {
        'padding-top': resolveSpace(pt ?? py ?? p),
        'padding-right': resolveSpace(pr ?? px ?? p),
        'padding-bottom': resolveSpace(pb ?? py ?? p),
        'padding-left': resolveSpace(pl ?? px ?? p),
        'margin-top': resolveSpace(mt ?? my ?? m),
        'margin-right': resolveSpace(mr ?? mx ?? m),
        'margin-bottom': resolveSpace(mb ?? my ?? m),
        'margin-left': resolveSpace(ml ?? mx ?? m)
    };
}
