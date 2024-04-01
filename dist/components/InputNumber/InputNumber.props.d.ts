import type { InputNumberProps } from './InputNumber.types.js';
export declare const defaultInputNumberProps: InputNumberProps;
export declare const docInputNumberPropsDefs: {
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
        values: readonly ["solid", "soft", "outline", "clear"];
        default: "solid" | "soft" | "outline" | "clear" | undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["start", "center", "end"];
        default: "start" | "center" | "end" | undefined;
    } | {
        name: string;
        type: string;
        default: number | undefined;
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
