import { ColorGray, Size2 } from '$lib/shared.types.js';
import type { CheckboxProps } from './types.js';

export const defaultCheckboxProps: CheckboxProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size2,
    radius: undefined,
    group: undefined,
    value: undefined,
    checked: false,
    indeterminate: false
};
