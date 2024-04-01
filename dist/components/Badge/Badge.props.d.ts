import type { BadgeProps } from './Badge.types.js';
export declare const defaultBadgeProps: BadgeProps;
export declare const docBadgePropsDefs: {
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
        values: readonly ["solid", "soft", "outline"];
        default: "solid" | "soft" | "outline" | undefined;
    } | {
        name: string;
        type: string;
        default: boolean | undefined;
        values?: undefined;
    })[];
    slots: {
        name: string;
    }[];
    events: never[];
};
