import { ColorGray, OrientationHorizontal, Size2 } from '$lib/shared.types.js';
import type { SeparatorProps } from './types.js';

export const defaultSeparatorProps: SeparatorProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size2,
    orientation: OrientationHorizontal
};
