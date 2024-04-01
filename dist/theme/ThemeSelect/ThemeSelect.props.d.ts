import type { ThemeSelectProps } from './ThemeSelect.types.js';
export declare const defaultThemeSelectProps: ThemeSelectProps;
export declare const docThemeSelectPropsDefs: {
    title: string;
    props: ({
        name: string;
        type: string;
        values: readonly ["primary", "gray", "blue", "green", "yellow", "orange", "red"];
        default: "primary" | "gray" | "blue" | "green" | "yellow" | "orange" | "red" | undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["1", "2", "3", "4"];
        default: "1" | "2" | "3" | "4" | undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["solid", "soft", "outline", "clear"];
        default: "solid" | "soft" | "outline" | "clear" | undefined;
    } | {
        name: string;
        type: string;
        default: boolean | undefined;
        values?: undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end"];
        default: "top" | "right" | "bottom" | "left" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | undefined;
    })[];
    slots: never[];
    events: never[];
};
