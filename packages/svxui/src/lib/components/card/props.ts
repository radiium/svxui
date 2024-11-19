import { ColorGray, Size3, VariantSoft } from '$lib/shared.types.js';
import type { CardProps } from './types.js';

export const defaultCardProps: CardProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size3,
    radius: undefined,
    variant: VariantSoft,
    translucent: false,
    fullWidth: false
};
