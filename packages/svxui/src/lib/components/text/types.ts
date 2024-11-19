import type { Aligns, Colors, Sizes1To9, TextWraps, Transforms, Weights } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';

export type TextBaseProps = {
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To9)[number];
    weight?: (typeof Weights)[number];
    transform?: (typeof Transforms)[number];
    align?: (typeof Aligns)[number];
    wrap?: (typeof TextWraps)[number];
    truncate?: boolean;
    disabled?: boolean;
    children?: Snippet;
};

export type TextSpanProps = HTMLAttributes<HTMLElement> & {
    elementRef?: HTMLSpanElement;
    as?: 'span';
};

export type TextDivProps = HTMLAttributes<HTMLElement> & {
    elementRef?: HTMLDivElement;
    as?: 'div';
};

export type TextHeadingProps = HTMLAttributes<HTMLElement> & {
    elementRef?: HTMLHeadingElement;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export type TextParagraphProps = HTMLAttributes<HTMLElement> & {
    elementRef?: HTMLParagraphElement;
    as?: 'p';
};

export type TextLabelProps = HTMLLabelAttributes & {
    elementRef?: HTMLLabelElement;
    as?: 'label';
};

export type TextAnchorProps = HTMLAnchorAttributes & {
    elementRef?: HTMLAnchorElement;
    as?: 'a';
};

export type TextProps = (
    | TextSpanProps
    | TextDivProps
    | TextHeadingProps
    | TextParagraphProps
    | TextAnchorProps
) &
    TextBaseProps;
