import { AlignCenter, ColorGray, Size2, VariantSolid } from '$lib/shared.types.js';
import type { ButtonProps, ButtonUnstyledProps } from './Button.types.js';

export const defaultButtonProps: ButtonProps = {
    size: Size2,
    variant: VariantSolid,
    color: ColorGray,
    transform: undefined,
    align: AlignCenter,
    active: false,
    iconOnly: false,
    circle: false,
    fullWidth: false
};

export const defaultButtonUnstyledProps: ButtonUnstyledProps = {};
