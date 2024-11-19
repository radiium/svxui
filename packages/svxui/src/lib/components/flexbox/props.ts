import { DisplayFlex, JustifyStart } from '$lib/shared.types.js';
import type { FlexboxProps } from './types.js';

export const defaultFlexboxProps: FlexboxProps = {
    elementRef: undefined,
    as: 'div',
    display: DisplayFlex,
    justify: JustifyStart,
    direction: undefined,
    align: undefined,
    wrap: undefined,
    gap: undefined,
    grow: undefined,
    shrink: undefined
};
