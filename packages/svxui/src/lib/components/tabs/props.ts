import { booleanOptions, orientationOptions, type PropsOptions } from '$lib/shared.options.js';
import type { TabsProps } from './types.js';

/**
 * Tab root
 */
export const defaultTabsProps: TabsProps<any> = {
    onValueChange: () => {},
    disabled: false,
    orientation: 'horizontal',
    activateOnFocus: true,
    loop: false
};
export const tabsOptions = {
    orientation: orientationOptions,
    disabled: booleanOptions,
    activateOnFocus: booleanOptions,
    loop: booleanOptions
} as const satisfies PropsOptions<TabsProps<any>>;
