import { booleanOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import type { DialogProps, DialogSize } from './types.js';

export const defaultDialogProps: DialogProps = {
    isOpen: false,
    size: '3',
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
    transitionDelay: 0,
    transitionDuration: 150
};
export const dialogOptions = {
    size: ['1', '2', '3', '4'] satisfies DialogSize[],
    radius: radiusOptions,
    noPadding: booleanOptions,
    fullScreen: booleanOptions,
    closeOnBackdropClick: booleanOptions,
    closeOnEscape: booleanOptions,
    lockScroll: booleanOptions
} as const satisfies PropsOptions<DialogProps>;
