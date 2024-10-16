import { ColorGray, Size3, VariantSoft } from '$lib/shared.types.js';
import type { CardProps } from './Card.types.js';

export const defaultCardProps: CardProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size3,
    variant: VariantSoft,
    translucent: false
};
