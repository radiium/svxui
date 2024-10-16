import type {
    Aligns,
    Colors,
    Sizes1To9,
    TextTags,
    TextWraps,
    Transforms,
    Weights
} from '$lib/shared.types.js';
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';

type ElementsType =
    | HTMLAttributes<HTMLDivElement>
    | HTMLAttributes<HTMLSpanElement>
    | HTMLLabelAttributes
    | HTMLAttributes<HTMLHeadingElement>
    | HTMLAttributes<HTMLParagraphElement>
    | HTMLAnchorAttributes;

export type TextProps = ElementsType & {
    elementRef?: HTMLElement;
    as?: (typeof TextTags)[number];
    color?: (typeof Colors)[number];
    size?: (typeof Sizes1To9)[number];
    weight?: (typeof Weights)[number];
    transform?: (typeof Transforms)[number];
    align?: (typeof Aligns)[number];
    wrap?: (typeof TextWraps)[number];
    truncate?: boolean;
    disabled?: boolean;
};
