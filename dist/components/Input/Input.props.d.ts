import type { InputProps } from './Input.types.js';
export declare const defaultInputProps: InputProps;
export declare const docInputPropsDefs: {
    props: ({
        name: string;
        type: string;
        values?: undefined;
        default?: undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["1", "2", "3"];
        default: "1" | "2" | "3" | undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["start", "center", "end"];
        default: "start" | "center" | "end" | undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["text", "number", "search", "password", "email", "tel", "url", "date", "time", "datetime-local", "month", "week"];
        default: "number" | "text" | "search" | "password" | "email" | "tel" | "url" | "date" | "time" | "datetime-local" | "month" | "week" | undefined;
    } | {
        name: string;
        type: string;
        default: boolean | undefined;
        values?: undefined;
    } | {
        name: string;
        type: string;
        default: string | number | undefined;
        values?: undefined;
    })[];
    slots: never[];
    events: never[];
};
