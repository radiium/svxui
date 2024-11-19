import { AlignCenter, ColorGray, Size2, VariantSolid } from '$lib/shared.types.js';
import type { ButtonProps, ButtonUnstyledProps } from './types.js';

export const defaultButtonProps: ButtonProps = {
    color: ColorGray,
    size: Size2,
    radius: undefined,
    variant: VariantSolid,
    transform: undefined,
    align: AlignCenter,
    active: false,
    iconOnly: false,
    fullWidth: false,
    disabled: false
};

export const defaultButtonUnstyledProps: ButtonUnstyledProps = {};
