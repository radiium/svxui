import { Sizes1To4 } from '$lib/constants.js';
import type { DialogProps } from './Dialog.types.js';

export const defaultDialogProps: DialogProps = {
    isOpen: false,
    size: '3',
    closeOnBackdropClick: true,
    closeOnEscape: true,
    showCloseButton: true,
    blockScroll: true
};

export const docDialogPropsDefs = {
    props: [
        {
            name: 'size',
            type: 'enum',
            values: Sizes1To4,
            default: defaultDialogProps.size
        },
        {
            name: 'closeOnBackdropClick',
            type: 'boolean',
            default: defaultDialogProps.closeOnBackdropClick
        },
        {
            name: 'closeOnEscape',
            type: 'boolean',
            default: defaultDialogProps.closeOnEscape
        },
        {
            name: 'showCloseButton',
            type: 'boolean',
            default: defaultDialogProps.showCloseButton
        },
        {
            name: 'blockScroll',
            type: 'boolean',
            default: defaultDialogProps.blockScroll
        },
        {
            name: 'isOpen',
            type: 'boolean',
            default: defaultDialogProps.isOpen
        }
    ],
    slots: [
        {
            name: 'default'
        },
        {
            name: 'close-icon',
            description: 'Override close icon'
        }
    ],
    events: []
};
