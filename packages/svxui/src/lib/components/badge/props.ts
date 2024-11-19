import { ColorGray, Size1, VariantSoft } from '$lib/shared.types.js';
import type { BadgeProps } from './types.js';

export const defaultBadgeProps: BadgeProps = {
    color: ColorGray,
    size: Size1,
    radius: undefined,
    variant: VariantSoft,
    disabled: false
};
