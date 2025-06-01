import { colorOptions, orientationOptions, type PropsOptions } from '$lib/shared.options.js';
import type { SeparatorProps, SeparatorSize } from './types.js';

export const defaultSeparatorProps: SeparatorProps = {
    elementRef: undefined,
    color: undefined,
    size: '2',
    orientation: 'horizontal'
};
export const separatorOptions = {
    color: colorOptions,
    size: ['1', '2', '3', '4'] satisfies SeparatorSize[],
    orientation: orientationOptions
} as const satisfies PropsOptions<SeparatorProps>;
