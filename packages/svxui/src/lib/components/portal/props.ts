import { booleanOptions, type PropsOptions } from '$lib/shared.options.js';
import type { PortalProps } from './types.js';

export const defaultPortalProps: PortalProps = {
    target: 'body',
    disabled: false
};
export const portalOptions: PropsOptions<PortalProps> = {
    disabled: booleanOptions
} as const;
