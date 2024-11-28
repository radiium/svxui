import { ColorGray, Size3, VariantSoft } from '$lib/shared.types.js';
import { type FloatingArrowProps, type FloatingProps } from './types.js';

export const defaultFloatingProps: FloatingProps = {
    isOpen: false,
    size: Size3,
    radius: undefined,
    placement: 'top',
    offset: 0,
    arrow: false,
    flip: false,
    shift: false,
    hide: false,
    backdrop: false,
    autoUpdate: false,
    closeOnClickBackdrop: false,
    closeOnClickOutside: false,
    closeOnEscape: false,
    closeOnResize: false,
    closeOnScroll: false,
    portal: false,
    portalTarget: ".svxui[data-theme-root='true']",
    transitionDelay: 0,
    transitionDuration: 150,
    color: ColorGray,
    variant: VariantSoft
};

export const defaultFloatingArrowProps: Partial<FloatingArrowProps> = {
    elementRef: undefined,
    outline: false,
    color: ColorGray,
    variant: VariantSoft
};
