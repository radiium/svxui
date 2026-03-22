import { type SelectProps } from '$lib/index.js';
type $$ComponentProps = {
    options: {
        label: string;
        value: string;
        disabled?: boolean;
    }[];
} & SelectProps<any, boolean>;
declare const SelectWithOptions: import("svelte").Component<$$ComponentProps, {}, "ref">;
type SelectWithOptions = ReturnType<typeof SelectWithOptions>;
export default SelectWithOptions;
