import type { RadioProps } from './Radio.types.js';
export declare const defaultRadioProps: RadioProps;
export declare const docRadioPropsDefs: {
    title: string;
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
        default: string | number | undefined;
        values?: undefined;
    })[];
    slots: never[];
    events: never[];
};
