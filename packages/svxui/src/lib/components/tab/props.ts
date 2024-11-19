import type { TabGroupProps, TabPanelProps, TabTriggerProps } from './types.js';

/**
 * TabGroup
 */
export const defaultTabGroupProps: TabGroupProps = {
    value: undefined,
    disabled: false,
    onValueChange: () => {}
};

/**
 * TabTrigger
 */
export const defaultTabTriggerProps: Partial<TabTriggerProps> = {
    disabled: false
};

/**
 * TabGroup
 */
export const defaultTabPanelProps: Partial<TabPanelProps> = {};
