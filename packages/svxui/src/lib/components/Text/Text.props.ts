import { AlignStart, Size3, TextTagSpan, WeightRegular } from '$lib/shared.types.js';
import type { TextProps } from './Text.types.js';

export const defaultTextProps: TextProps = {
    elementRef: undefined,
    as: TextTagSpan,
    color: undefined,
    size: Size3,
    weight: WeightRegular,
    transform: undefined,
    align: AlignStart,
    wrap: undefined,
    truncate: false,
    disabled: false
};
