import {
    booleanOptions,
    colorOptions,
    placementOptions,
    radiusOptions,
    type PropsOptions
} from '$lib/shared.options.js';
import {
    type FloatingArrowProps,
    type FloatingProps,
    type FloatingSize,
    type FloatingVariant
} from './types.js';

export const defaultFloatingProps: FloatingProps = {
    isOpen: false,
    size: '3',
    color: undefined,
    variant: 'solid',
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
    portalTarget: '.svxui[data-theme-root]',
    transitionDelay: 0,
    transitionDuration: 150
};
export const floatingOptions = {
    color: colorOptions,
    size: ['0', '1', '2', '3', '4', '5'] satisfies FloatingSize[],
    variant: ['solid', 'soft', 'outline'] satisfies FloatingVariant[],
    radius: radiusOptions,
    placement: placementOptions,
    arrow: booleanOptions,
    flip: booleanOptions,
    shift: booleanOptions,
    hide: booleanOptions,
    backdrop: booleanOptions,
    autoUpdate: booleanOptions,
    closeOnClickBackdrop: booleanOptions,
    closeOnClickOutside: booleanOptions,
    closeOnEscape: booleanOptions,
    closeOnResize: booleanOptions,
    closeOnScroll: booleanOptions,
    portal: booleanOptions
} as const satisfies PropsOptions<FloatingProps>;

export const defaultFloatingArrowProps: Partial<FloatingArrowProps> = {
    elementRef: undefined,
    color: undefined,
    variant: 'soft'
};
export const floatingArrowOptions = {
    color: colorOptions,
    variant: ['solid', 'soft', 'outline'] satisfies FloatingVariant[]
} as const satisfies PropsOptions<FloatingArrowProps>;
