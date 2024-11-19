import { ColorGray, Size2, VariantOutline } from '$lib/shared.types.js';
import type { ThemeSelectProps } from './types.js';

export const defaultThemeSelectProps: ThemeSelectProps = {
    color: ColorGray,
    size: Size2,
    variant: VariantOutline,
    iconOnly: true,
    placement: 'bottom'
};
