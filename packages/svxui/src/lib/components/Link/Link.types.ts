import type { TextUnderlines } from '$lib/shared.types.js';
import type { HTMLAnchorAttributes, HTMLAttributeAnchorTarget } from 'svelte/elements';
import type { TextProps } from '../Text/Text.types.js';

// FIXME override extended attributes & elementRef types of TextProps
export type LinkProps = /*Omit<HTMLAnchorAttributes, 'size' | 'align'>*/ TextProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elementRef?: any;
    underline?: (typeof TextUnderlines)[number];
    // From HTMLAnchorAttributes
    download?: HTMLAnchorAttributes['download'];
    href?: string | undefined | null;
    hreflang?: string | undefined | null;
    media?: string | undefined | null;
    ping?: string | undefined | null;
    rel?: string | undefined | null;
    target?: HTMLAttributeAnchorTarget | undefined | null;
    type?: string | undefined | null;
    referrerpolicy?: ReferrerPolicy | undefined | null;
};
