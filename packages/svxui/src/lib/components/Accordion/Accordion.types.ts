import type { Readable, Writable } from 'svelte/store';

export type AccordionStore = {
    readonly id: string;
    isOpen: Readable<boolean>;
    open: () => void;
    close: () => void;
    toggle: () => void;
};

export type AccordionContext = {
    items: Writable<{ [key: string]: boolean }>;
    register: (item: AccordionContextItem) => void;
    unregister: (item: AccordionContextItem) => void;
    set: (item: AccordionContextItem) => void;
};
export type AccordionContextItem = {
    id: string;
    expanded?: boolean;
};

/**
 * AccordionGroup
 */
export type AccordionGroupProps = {
    multi?: boolean;
};

/**
 * PropsAccordionItem
 */
export type AccordionItemPropsRequired = Required<Pick<AccordionItemProps, 'id' | 'expanded'>>;
export type AccordionItemProps = {
    id?: string;
    expanded?: boolean;
    disabled?: boolean;
};
