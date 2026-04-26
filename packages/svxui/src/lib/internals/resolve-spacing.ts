import type { SpacingProps } from '$lib/shared.types.js';
import { toSpaceVar } from './to-space-var.js';

/**
 * Resolves spacing props (padding + margin) into a flat CSS property record
 * for use with `styleObjectToString`.
 */
export function resolveSpacing(props: SpacingProps): Record<string, string | undefined> {
    const { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml } = props;
    return {
        'padding-top': toSpaceVar(pt ?? py ?? p),
        'padding-right': toSpaceVar(pr ?? px ?? p),
        'padding-bottom': toSpaceVar(pb ?? py ?? p),
        'padding-left': toSpaceVar(pl ?? px ?? p),
        'margin-top': toSpaceVar(mt ?? my ?? m),
        'margin-right': toSpaceVar(mr ?? mx ?? m),
        'margin-bottom': toSpaceVar(mb ?? my ?? m),
        'margin-left': toSpaceVar(ml ?? mx ?? m)
    };
}
