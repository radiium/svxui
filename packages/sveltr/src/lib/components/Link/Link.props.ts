import { AlignStart, Size3, TextUnderlineAuto, WeightRegular } from '$lib/shared.types.js';
import type { LinkProps } from './Link.types.js';

export const defaultLinkProps: LinkProps = {
    elementRef: undefined,
    href: '',
    target: '_blank',
    rel: undefined,
    color: undefined,
    size: Size3,
    weight: WeightRegular,
    transform: undefined,
    align: AlignStart,
    underline: TextUnderlineAuto,
    wrap: undefined,
    truncate: false,
    disabled: false
};
