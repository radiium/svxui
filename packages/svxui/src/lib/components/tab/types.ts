import type { WrapValue } from '$lib/utils/wrap.svelte.js';
import type { Snippet } from 'svelte';

/**
 * State/Context
 */

export type TabAttrs = Record<string, string | boolean | number | undefined>;

export type TabStateProps = {
    value: WrapValue<string>;
    disabled: WrapValue<boolean | undefined>;
};

export type TabState = {
    value: Readonly<string>;
    disabled: Readonly<boolean | undefined>;
    active: Readonly<boolean>;
    setActive: (active: boolean) => void;
    attrsTrigger: Readonly<TabAttrs>;
    attrsContent: Readonly<TabAttrs>;
};

export type TabGroupStateProps = {
    value: WrapValue<string | undefined>;
    disabled: WrapValue<boolean | undefined>;
};

export type TabGroupState = {
    current?: Readonly<string | undefined>;
    selectTab: (tab: string) => void;
    registerItem: (item: TabState) => void;
    unregisterItem: (item: TabState) => void;
    getItem: (tab: string) => TabState | undefined;
};

/**
 * TabGroup
 */

export type TabGroupProps = {
    value?: string | undefined;
    disabled?: boolean | undefined;
    onValueChange?: (value: string | undefined) => void;
    children?: Snippet<[void]>;
};

/**
 * Props TabTrigger
 */

export type TabTriggerSnippetProps = {
    active: boolean;
    select: () => void;
    attrs: TabAttrs;
};

export type TabTriggerProps = {
    value: string;
    disabled?: boolean;
    children?: Snippet<[TabTriggerSnippetProps]>;
};

/**
 * Props TabPanel
 */

export type TabPanelSnippetProps = {
    attrs: TabAttrs;
};

export type TabPanelProps = {
    value: string;
    children?: Snippet<[TabPanelSnippetProps]>;
};
