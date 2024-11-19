import { TextUnderlineAuto } from '$lib/shared.types.js';
import { defaultTextProps } from '../text/props.js';
import type { LinkProps } from './types.js';

export const defaultLinkProps: LinkProps = {
    ...(defaultTextProps as Partial<LinkProps>),
    href: '',
    target: '_blank',
    rel: undefined,
    underline: TextUnderlineAuto
};
