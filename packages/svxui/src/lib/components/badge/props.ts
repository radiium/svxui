import { booleanOptions, colorOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import type { BadgeProps, BadgeSize, BadgeVariant } from './types.js';

export const defaultBadgeProps: BadgeProps = {
    color: 'neutral',
    size: '1',
    radius: undefined,
    variant: 'solid',
    disabled: false
};
export const badgeOptions = {
    color: colorOptions,
    size: ['1', '2', '3'] satisfies BadgeSize[],
    radius: radiusOptions,
    variant: ['solid', 'soft', 'outline'] satisfies BadgeVariant[],
    disabled: booleanOptions
} as const satisfies PropsOptions<BadgeProps>;
