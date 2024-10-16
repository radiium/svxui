import type { Aligns, Colors, Radius, Sizes1To4, Transforms, Variants } from '$lib/shared.types.js';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonProps = Omit<HTMLButtonAttributes, 'size' | 'align'> & {
    elementRef?: HTMLButtonElement;
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To4)[number];
    variant?: (typeof Variants)[number];
    radius?: (typeof Radius)[number];
    transform?: (typeof Transforms)[number];
    align?: (typeof Aligns)[number];
    active?: boolean;
    iconOnly?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
};

export type ButtonIconProps = Omit<ButtonProps, 'iconOnly'>;

export type ButtonUnstyledProps = HTMLButtonAttributes & {
    elementRef?: HTMLButtonElement;
};
