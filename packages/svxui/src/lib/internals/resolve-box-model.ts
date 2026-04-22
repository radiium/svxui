import type { BoxModelProps } from '$lib/shared.types.js';
import { resolveSpace } from './resolve-space.js';

/**
 * Resolves box model props into a flat CSS property record for use with `styleObjectToString`.
 */
export function resolveBoxModel(props: BoxModelProps): Record<string, string | undefined> {
    const {
        p,
        px,
        py,
        pt,
        pr,
        pb,
        pl,
        m,
        mx,
        my,
        mt,
        mr,
        mb,
        ml,
        width,
        maxWidth,
        minWidth,
        height,
        maxHeight,
        minHeight,
        flexBasis,
        flexGrow,
        flexShrink,
        overflow,
        overflowX,
        overflowY
    } = props;

    return {
        'padding-top': resolveSpace(pt ?? py ?? p),
        'padding-right': resolveSpace(pr ?? px ?? p),
        'padding-bottom': resolveSpace(pb ?? py ?? p),
        'padding-left': resolveSpace(pl ?? px ?? p),
        'margin-top': resolveSpace(mt ?? my ?? m),
        'margin-right': resolveSpace(mr ?? mx ?? m),
        'margin-bottom': resolveSpace(mb ?? my ?? m),
        'margin-left': resolveSpace(ml ?? mx ?? m),
        width,
        'max-width': maxWidth,
        'min-width': minWidth,
        height,
        'max-height': maxHeight,
        'min-height': minHeight,
        'flex-basis': flexBasis,
        'flex-grow': flexGrow,
        'flex-shrink': flexShrink,
        'overflow-x': overflowX ?? overflow,
        'overflow-y': overflowY ?? overflow
    };
}
