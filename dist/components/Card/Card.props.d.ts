import type { CardProps } from './Card.types.js';
export declare const defaultCardProps: CardProps;
export declare const docCardPropsDefs: {
    props: ({
        name: string;
        type: string;
        values?: undefined;
        default?: undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["0", "1", "2", "3", "4", "5"];
        default: "0" | "1" | "2" | "3" | "4" | "5" | undefined;
    } | {
        name: string;
        type: string;
        values: readonly ["soft", "clear"];
        default: "soft" | "clear" | undefined;
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
