import { booleanOptions, orientationOptions, type PropsOptions } from '$lib/shared.options.js';
import type { TabContentProps, TabRootProps, TabTriggerProps } from './types.js';

/**
 * Tab root
 */
export const defaultTabRootProps: TabRootProps = {
    value: undefined,
    onValueChange: () => {},
    disabled: false,
    orientation: 'horizontal',
    selectWhenFocused: true,
    loop: false
};
export const tabRootOptions = {
    orientation: orientationOptions,
    disabled: booleanOptions,
    selectWhenFocused: booleanOptions,
    loop: booleanOptions
} as const satisfies PropsOptions<TabRootProps>;

/**
 * Tab trigger
 */
export const defaultTabTriggerProps: Partial<TabTriggerProps> = {
    disabled: false
};
export const tabTriggerOptions = {
    disabled: booleanOptions
} as const satisfies PropsOptions<TabTriggerProps>;

/**
 * Tab contentroup
 */
export const defaultTabContentProps: Partial<TabContentProps> = {};
export const tabContentOptions = {} as const satisfies PropsOptions<TabContentProps>;
