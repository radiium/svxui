import { Size3 } from '$lib/shared.types.js';
import type { DialogProps } from './Dialog.types.js';

export const defaultDialogProps: DialogProps = {
    isOpen: false,
    size: Size3,
    noPadding: false,
    fullScreen: false,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    lockScroll: true,
    minWidth: '30rem',
    maxWidth: '60rem'
};
