import { Size3 } from '$lib/shared.types.js';
import { type FloatingProps } from './Floating.types.js';

export const defaultFloatingProps: FloatingProps = {
    isOpen: false,
    size: Size3,
    autoUpdate: false,
    outline: false,
    backdrop: false,
    closeOnClickBackdrop: false,
    closeOnClickOutside: false,
    closeOnEscape: false,
    closeOnResize: false,
    closeOnScroll: false,
    placement: 'top',
    offset: 0,
    arrow: false,
    flip: false,
    shift: false,
    hide: false,
    portal: false,
    transitionDelay: 0,
    transitionDuration: 150
};
