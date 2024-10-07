import type { Readable } from 'svelte/store';

export type TabStore = {
    readonly id: string;
    isOpen: Readable<boolean>;
    open: () => void;
    close: () => void;
    toggle: () => void;
};

export type TabContext = {
    current: Readable<string | undefined>;
    selectTab: (value?: string) => void;
    registerTab: (value?: string) => void;
    unregisterTab: (value?: string) => void;
    registerPanel: (value?: string) => void;
    unregisterPanel: (value?: string) => void;
};

/**
 * TabGroup
 */
export type TabGroupProps = {
    value?: string;
};

/**
 * Props TabTrigger
 */
export type TabTriggerProps = {
    value?: string;
};

/**
 * Props TabPanel
 */
export type TabPanelProps = {
    value?: string;
};
