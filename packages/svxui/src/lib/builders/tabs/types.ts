import type { Orientation } from '$lib/shared.types.js';
import type { SelectionStateOptions } from '$lib/utilities/selection-state/index.js';

/**
 * Tabs state options
 */
export type TabsBuilderOptions<Value> = Omit<SelectionStateOptions<Value, false>, 'multiple'> & {
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

/**
 * HTML data-attributes written to the tabs root wrapper element
 */
export type TabsRootAttributes = {
    readonly id: `tabs-root-${string}`;
    readonly 'data-disabled': '' | undefined;
    readonly 'data-orientation': Orientation;
};

/**
 * HTML data-attributes written to the tabs triggers wrapper element
 */
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
    readonly active: boolean;
    /**
     * Tab item is disabled or not
     */
    readonly disabled?: boolean;
    /**
     * Tab trigger part attributes
     */
    readonly attrs: TabsItemTriggerAttributes;
};

/**
 * HTML data-attributes written to the tab trigger element
 */
export type TabsItemTriggerAttributes = {
    readonly id: string;
    readonly tabindex: 0 | -1;
    readonly disabled: boolean;
    readonly 'data-state': 'active' | 'inactive';
    readonly 'data-orientation': Orientation;
    readonly 'data-disabled': '' | undefined;
    readonly role: 'tab';
    readonly 'aria-selected'?: boolean;
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
    readonly active: boolean;
    /**
     * Tab item is disabled or not
     */
    readonly disabled?: boolean;
    /**
     * Tab content part attributes
     */
    readonly attrs: TabsItemContentAttributes;
};

/**
 * HTML data-attributes written to the tab content element
 */
export type TabsItemContentAttributes = {
    readonly id: string;
    readonly disabled: boolean;
    readonly tabindex: 0;
    readonly hidden: true | undefined;
    readonly 'data-state': 'active' | 'inactive';
    readonly 'data-orientation': Orientation;
    readonly 'data-disabled'?: '';
    readonly role: 'tabpanel';
    readonly 'aria-labelledby'?: string;
};
