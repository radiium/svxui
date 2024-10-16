import { ColorGray, Size1, VariantSoft } from '$lib/shared.types.js';
import type { BadgeProps } from './Badge.types.js';

export const defaultBadgeProps: BadgeProps = {
    color: ColorGray,
    size: Size1,
    variant: VariantSoft,
    disabled: false
};
