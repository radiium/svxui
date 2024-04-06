import type { SeparatorProps } from './Separator.types.js';
export declare const defaultSeparatorProps: SeparatorProps;
export declare const docSeparatorPropsDefs: {
    props: ({
        name: string;
        type: string;
        values?: undefined;
        default?: undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["1", "2", "3", "4"];
        default: "1" | "2" | "3" | "4" | undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["horizontal", "vertical"];
        default: "horizontal" | "vertical" | undefined;
    })[];
    slots: never[];
    events: never[];
};
