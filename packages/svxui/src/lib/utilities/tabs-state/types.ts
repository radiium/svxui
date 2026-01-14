import type { Orientation } from '$lib/shared.types.js';
import type { SelectionOptions } from '../selection-state/types.js';

export type TabsStateOptions<Value> = Omit<SelectionOptions<Value, false>, 'multiple'> & {
    onValueChange?: (newValue: Value) => void;
    orientation?: Orientation;
    disabled?: boolean;
    loop?: boolean;
    activateOnFocus?: boolean;
};

export type TabsAttributes = {
    readonly [x: string]: '' | Orientation | `tabs-root-${string}` | undefined;
    readonly id: `tabs-root-${string}`;
    readonly 'data-disabled': '' | undefined;
    readonly 'data-orientation': Orientation;
};

export type TabsTriggerListAttributes = {
    readonly [x: string]: '' | Orientation | `tabs-list-${string}` | 'tablist' | undefined;
    readonly id: `tabs-list-${string}`;
    readonly 'data-disabled': '' | undefined;
    readonly 'data-orientation': Orientation;
    readonly role: 'tablist';
};

export type TabsTriggerOptions = {
    id?: string;
    disabled?: boolean;
};

export type TabsTriggerReturn = {
    active: boolean;
    disabled?: boolean;
    readonly attrs: TabsTriggerAttributes;
};

export type TabsTriggerAttributes = {
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

export type TabsContentOptions = {
    id?: string;
    disabled?: boolean;
};

export type TabsContentReturn = {
    active: boolean;
    disabled?: boolean;
    readonly attrs: TabsContentAttributes;
};

export type TabsContentAttributes = {
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
