import type { BoxModelProps } from '$lib/shared.types.js';
import { resolveSpacing } from './resolve-spacing.js';

/**
 * Resolves box model props into a flat CSS property record for use with `styleObjectToString`.
 */
export function resolveBoxModel(props: BoxModelProps): Record<string, string | undefined> {
    const {
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
        overflowY,
        gridArea,
        gridColumn,
        gridRow
    } = props;

    return {
        ...resolveSpacing(props),
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
        'overflow-y': overflowY ?? overflow,
        'grid-area': gridArea,
        'grid-column': gridColumn,
        'grid-row': gridRow
    };
}
