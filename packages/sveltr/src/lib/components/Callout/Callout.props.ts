import { ColorGray, Size3, VariantSoft } from '$lib/shared.types.js';
import type { CalloutProps } from './Callout.types.js';

export const defaultCalloutProps: CalloutProps = {
    elementRef: undefined,
    color: ColorGray,
    size: Size3,
    variant: VariantSoft,
    fullWidth: false
};
