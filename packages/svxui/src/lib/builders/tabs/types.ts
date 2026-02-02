import type { Orientation } from '$lib/shared.types.js';
import type { SelectionStateOptions } from '$lib/utilities/selection-state/index.js';

/**
 * Tabs state options
 */
export type TabsBuilderOptions<Value> = Omit<SelectionStateOptions<Value, false>, 'multiple'> & {
    /**
     * Callback called on value change
     * @param newValue
     * @returns
     */
    onValueChange?: (newValue: Value) => void;
    /**
     * Tabs orientation
     */
    orientation?: Orientation;
    /**
     * Tabs must be disabled or not
     */
    disabled?: boolean;
    /**
     * Loop focus on keyboard navigation
     */
    loop?: boolean;
    /**
     * Activate item on focus
     */
    activateOnFocus?: boolean;
};

export type TabsRootAttributes = {
    readonly [x: string]: '' | Orientation | `tabs-root-${string}` | undefined;
    readonly id: `tabs-root-${string}`;
    readonly 'data-disabled': '' | undefined;
    readonly 'data-orientation': Orientation;
};

export type TabsItemTriggerListAttributes = {
    readonly [x: string]: '' | Orientation | `tabs-list-${string}` | 'tablist' | undefined;
    readonly id: `tabs-list-${string}`;
    readonly 'data-disabled': '' | undefined;
    readonly 'data-orientation': Orientation;
    readonly role: 'tablist';
};

/**
 * Tabs item trigger part customization
 */
export type TabsItemTriggerOptions = {
    /**
     * Custom tab item triggert part id
     */
    id?: string;
    /**
     * Disable or not tab item
     */
    disabled?: boolean;
};

/**
 * Tabs item trigger part state
 */
export type TabsItemTrigger = {
    /**
     * Tab item is activated or not
     */
    active: boolean;
    /**
     * Tab item is disabled or not
     */
    disabled?: boolean;
    /**
     * Tab trigger part attributes
     */
    readonly attrs: TabsItemTriggerAttributes;
};

export type TabsItemTriggerAttributes = {
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
    readonly 'data-orientation': Orientation;
    readonly 'data-disabled': '' | undefined;
    readonly role: 'tab';
    readonly 'aria-selected': 'true' | 'false';
    readonly 'aria-controls': string | undefined;
    readonly onfocus: () => void;
    readonly onclick: (e: MouseEvent) => void;
    // readonly onkeydown: (e: KeyboardEvent) => void;
};

/**
 * Tabs item content part customization
 */
export type TabsItemContentOptions = {
    /**
     * Custom tab item content part id
     */
    id?: string;
    /**
     * Disable or not tab item
     */
    disabled?: boolean;
};

/**
 * Tab item content part state
 */
export type TabsItemContent = {
    /**
     * Tab item is activated or not
     */
    active: boolean;
    /**
     * Tab item is disabled or not
     */
    disabled?: boolean;
    /**
     * Tab content part attributes
     */
    readonly attrs: TabsItemContentAttributes;
};

export type TabsItemContentAttributes = {
    readonly [x: string]: string | number | boolean | undefined;
    readonly id: string;
    readonly disabled: boolean;
    readonly tabindex: 0;
    readonly hidden: true | undefined;
    readonly 'data-state': 'active' | 'inactive';
    readonly 'data-orientation': Orientation;
    readonly 'data-disabled': '' | undefined;
    readonly role: 'tabpanel';
    readonly 'aria-selected': 'true' | 'false';
    readonly 'aria-labelledby': string | undefined;
};
