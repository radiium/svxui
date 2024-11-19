import { Size3 } from '$lib/shared.types.js';
import type { DialogProps } from './types.js';

export const defaultDialogProps: DialogProps = {
    isOpen: false,
    size: Size3,
    radius: undefined,
    width: undefined,
    minWidth: '30rem',
    maxWidth: '60rem',
    height: undefined,
    minHeight: undefined,
    maxHeight: undefined,
    noPadding: false,
    fullScreen: false,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    lockScroll: false,
    transitionDuration: 150
};
