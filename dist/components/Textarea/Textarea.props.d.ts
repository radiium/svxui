import type { TextareaProps } from './Textarea.types.js';
export declare const defaultTextareaProps: TextareaProps;
export declare const docTextareaPropsDefs: {
    title: string;
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
        default: boolean | undefined;
        values?: undefined;
    } | {
        name: string;
        type: string;
        default: string | undefined;
        values?: undefined;
    })[];
    slots: never[];
    events: never[];
};
