import type { Orientation } from '$lib/shared.types.js';
import type { TabsSelectionValue, TabsValue } from '../types.js';

/**
 * Tabs root
 */

export type TabsRootStateProps = {
    value?: () => TabsSelectionValue;
    onValueChange?: (newValue: TabsSelectionValue) => void;
    orientation?: () => Orientation;
    disabled?: () => boolean;
    loop?: () => boolean;
    selectWhenFocused?: () => boolean;
};

export type TabsRootAttributs = {
    readonly [x: string]: '' | Orientation | `tabs-root-${string}` | undefined;
    readonly id: `tabs-root-${string}`;
    readonly 'data-disabled': '' | undefined;
    readonly 'data-orientation': Orientation;
};

/**
 * Tabs list
 */

export type TabsListAttributs = {
    readonly [x: string]: '' | Orientation | `tabs-list-${string}` | 'tablist' | undefined;
    readonly id: `tabs-list-${string}`;
    readonly 'data-disabled': '' | undefined;
    readonly 'data-orientation': Orientation;
    readonly role: 'tablist';
};

/**
 * Tabs trigger
 */
export type TabsTriggerStateProps = {
    value: () => TabsValue;
    disabled?: () => boolean;
};

export type TabsTriggerAttributs = {
    readonly [x: string]:
        | string
        | number
        | boolean
        | undefined
        | (() => void)
        | ((e: MouseEvent) => void)
        | ((e: KeyboardEvent) => void);
    readonly id: string;
    readonly tabindex: 0 | -1;
    readonly disabled: boolean;
    readonly 'data-state': 'active' | 'inactive';
    readonly 'data-value': TabsValue;
    readonly 'data-orientation': Orientation;
    readonly 'data-disabled': '' | undefined;
    readonly role: 'tab';
    readonly 'aria-selected': 'true' | 'false';
    readonly 'aria-controls': string | undefined;
    readonly onfocus: () => void;
    readonly onclick: (e: MouseEvent) => void;
    readonly onkeydown: (e: KeyboardEvent) => void;
};

/**
 * Tabs content
 */

export type TabsContentStateProps = {
    value: () => TabsValue;
};

export type TabsContentAttributs = {
    readonly [x: string]: string | number | boolean | undefined;
    readonly id: string;
    readonly disabled: boolean;
    readonly tabindex: 0;
    readonly hidden: true | undefined;
    readonly 'data-state': 'active' | 'inactive';
    readonly 'data-value': TabsValue;
    readonly 'data-orientation': Orientation;
    readonly 'data-disabled': '' | undefined;
    readonly role: 'tabpanel';
    readonly 'aria-selected': 'true' | 'false';
    readonly 'aria-labelledby': string | undefined;
};
