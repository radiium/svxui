import { booleanOptions, orientationOptions, type PropsOptions } from '$lib/shared.options.js';
import type { ListboxProps } from './types.js';

/**
 * Listbox root
 */

export const defaultListboxRootProps: ListboxProps<any, false> = {
    value: undefined,
    multiple: false,
    disabled: false,
    loop: false,
    activateOnFocus: false,
    orientation: 'vertical'
};
export const listboxRootOptions = {
    multiple: booleanOptions,
    disabled: booleanOptions,
    loop: booleanOptions,
    activateOnFocus: booleanOptions,
    orientation: orientationOptions
} as const satisfies PropsOptions<ListboxProps<any, boolean>>;
