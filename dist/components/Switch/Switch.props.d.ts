import type { SwitchProps } from './Switch.types.js';
export declare const defaultSwitchProps: SwitchProps;
export declare const docSwitchPropsDefs: {
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
    })[];
    slots: never[];
    events: never[];
};
