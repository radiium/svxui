import type { Colors, Radius, Sizes1To3 } from '$lib/shared.types.js';
import type { HTMLSelectAttributes } from 'svelte/elements';

export type SelectOption = {
    label: string | number;
    value: string | number;
    disabled?: boolean | undefined;
};

export type SelectProps = Omit<HTMLSelectAttributes, 'size'> & {
    elementRef?: HTMLSelectElement;
    size?: (typeof Sizes1To3)[number];
    color?: (typeof Colors)[number];
    radius?: (typeof Radius)[number];
    value?: unknown | undefined;
    options: Array<SelectOption | string | number | boolean>;
    resolveValue?: <T>(item: T) => string | number;
    resolveLabel?: <T>(item: T) => string | number;
    fullWidth?: boolean;
    multiple?: boolean;
    disabled?: boolean;
};
