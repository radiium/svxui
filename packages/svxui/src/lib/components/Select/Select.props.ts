import { ColorGray, Size2 } from '$lib/shared.types.js';
import type { SelectProps } from './Select.types.js';

export const defaultSelectProps: SelectProps = {
    elementRef: undefined,
    options: [],
    value: undefined,
    size: Size2,
    color: ColorGray,
    fullWidth: false,
    resolveValue: <T>(item: T) => item as string | number,
    resolveLabel: <T>(item: T) => item as string | number
};
