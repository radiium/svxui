import { ColorGray, Size2 } from '$lib/shared.types.js';
import type { CheckboxProps } from './Checkbox.types.js';

export const defaultCheckboxProps: CheckboxProps = {
    elementRef: undefined,
    group: undefined,
    value: undefined,
    checked: false,
    indeterminate: false,
    size: Size2,
    color: ColorGray
};
