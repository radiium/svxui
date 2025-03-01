import type { PropsOptions } from '$lib/shared.options.js';
import { defaultTextProps, textOptions } from '../text/props.js';
import type { LinkProps, TextUnderline } from './types.js';

export const defaultLinkProps: LinkProps = {
    ...(defaultTextProps as Partial<LinkProps>),
    href: '',
    target: '_blank',
    rel: undefined,
    underline: 'auto'
};
export const linkOptions = {
    ...textOptions,
    underline: ['auto', 'always', 'hover', 'none'] satisfies TextUnderline[]
} as const satisfies PropsOptions<LinkProps>;
