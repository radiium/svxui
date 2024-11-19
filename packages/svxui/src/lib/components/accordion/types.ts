import type { WrapValue } from '$lib/utils/wrap.svelte.js';
import type { Snippet } from 'svelte';

/**
 * State/Context
 */

export type AccordionValue = string | string[] | undefined;
export type AccordionAttrs = Record<string, string | boolean | number | undefined>;

export type AccordionStateProps = {
    value: WrapValue<string>;
    disabled: WrapValue<boolean | undefined>;
};

export type AccordionState = {
    value: Readonly<string>;
    disabled: Readonly<boolean | undefined>;
    active: Readonly<boolean>;
    attrsTrigger: Readonly<AccordionAttrs>;
    attrsContent: Readonly<AccordionAttrs>;
    setActive: (active: boolean) => void;
};

export type AccordionGroupStateProps = {
    value: WrapValue<AccordionValue>;
    multi: WrapValue<boolean | undefined>;
    disabled: WrapValue<boolean | undefined>;
};

export type AccordionGroupState = {
    registerItem: (item: AccordionState) => void;
    unregisterItem: (item: AccordionState) => void;
    toggleItem: (item: AccordionState) => void;
};

/**
 * AccordionGroup
 */

export type AccordionGroupProps = {
    value?: string | string[] | undefined;
    onValueChange?: (value: string | string[] | undefined) => void;
    multi?: boolean;
    disabled?: boolean;
    children?: Snippet;
};

/**
 * Accordion
 */

export type AccordionSnippetProps = {
    expanded: boolean;
    attrs: Record<string, Readonly<string | boolean | number | undefined>>;
    toggle: () => void;
};

export type AccordionProps = {
    value: string;
    expanded?: boolean;
    disabled?: boolean;
    trigger?: Snippet<[AccordionSnippetProps]>;
    children?: Snippet<[AccordionSnippetProps]>;
};
