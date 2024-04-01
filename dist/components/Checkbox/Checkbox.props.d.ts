import type { CheckboxProps } from './Checkbox.types.js';
export declare const defaultCheckboxProps: CheckboxProps;
export declare const docCheckboxPropsDefs: {
    props: ({
        name: string;
        type: string;
        values?: undefined;
        default?: undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["primary", "gray", "blue", "green", "yellow", "orange", "red"];
        default: "primary" | "gray" | "blue" | "green" | "yellow" | "orange" | "red" | undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["1", "2", "3"];
        default: "1" | "2" | "3" | undefined;
    } | {
        name: string;
        type: string;
        default: (string | number)[] | undefined;
        values?: undefined;
    } | {
        name: string;
        type: string;
        default: string | number | undefined;
        values?: undefined;
    } | {
        name: string;
        type: string;
        default: boolean | undefined;
        values?: undefined;
    })[];
    slots: never[];
    events: never[];
};
