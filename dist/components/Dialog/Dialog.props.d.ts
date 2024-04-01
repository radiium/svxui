import type { DialogProps } from './Dialog.types.js';
export declare const defaultDialogProps: DialogProps;
export declare const docDialogPropsDefs: {
    props: ({
        name: string;
        type: string;
        values: readonly ["1", "2", "3", "4"];
        default: "1" | "2" | "3" | "4" | undefined;
    } | {
        name: string;
        type: string;
        default: boolean | undefined;
        values?: undefined;
    })[];
    slots: ({
        name: string;
        description?: undefined;
    } | {
        name: string;
        description: string;
    })[];
    events: never[];
};
