import { ColorGray, Size3, VariantSoft } from '$lib/shared.types.js';
import type { PanelProps } from './types.js';

export const defaultPanelProps: PanelProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size3,
    radius: undefined,
    variant: VariantSoft,
    translucent: false,
    fullWidth: false
};
