import { ColorGray, Size2 } from '$lib/shared.types.js';
import type { SelectProps } from './types.js';

export const defaultSelectProps: SelectProps = {
    elementRef: undefined,
    size: Size2,
    color: ColorGray,
    radius: undefined,
    value: undefined,
    options: [],
    resolveValue: <T>(item: T) => item as string | number,
    resolveLabel: <T>(item: T) => item as string | number,
    fullWidth: false,
    multiple: false,
    disabled: false,
    selectSize: 4
};
