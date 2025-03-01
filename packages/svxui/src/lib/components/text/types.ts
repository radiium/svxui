import type { Align, Color, TextTransform } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes, SvelteHTMLElements } from 'svelte/elements';

export type TextSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type TextWeight = 'light' | 'regular' | 'medium' | 'bold';
export type TextWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance';

/*
export type TextAsTagType =
    | 'span' //
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'label'
    | 'a';

// prettier-ignore
export type TextElementAttributsFromTagType<TextTag extends TextAsTagType> = 
      TextTag extends 'span' ? HTMLAttributes<HTMLSpanElement> //
    : TextTag extends 'div' ? HTMLAttributes<HTMLDivElement> 
    : TextTag extends 'h1' ? HTMLAttributes<HTMLHeadingElement> 
    : TextTag extends 'h2' ? HTMLAttributes<HTMLHeadingElement> 
    : TextTag extends 'h3' ? HTMLAttributes<HTMLHeadingElement> 
    : TextTag extends 'h4' ? HTMLAttributes<HTMLHeadingElement> 
    : TextTag extends 'h5' ? HTMLAttributes<HTMLHeadingElement> 
    : TextTag extends 'h6' ? HTMLAttributes<HTMLHeadingElement> 
    : TextTag extends 'p' ? HTMLAttributes<HTMLParagraphElement> 
    : TextTag extends 'label' ? HTMLLabelAttributes 
    : TextTag extends 'a' ? HTMLAnchorAttributes 
    : never;

// prettier-ignore
export type TextElementFromTagType<TextTag extends TextAsTagType> = 
    TextTag extends 'span' ? HTMLSpanElement//
  : TextTag extends 'div' ? HTMLDivElement 
  : TextTag extends 'h1' ? HTMLHeadingElement
  : TextTag extends 'h2' ? HTMLHeadingElement
  : TextTag extends 'h3' ? HTMLHeadingElement
  : TextTag extends 'h4' ? HTMLHeadingElement
  : TextTag extends 'h5' ? HTMLHeadingElement
  : TextTag extends 'h6' ? HTMLHeadingElement
  : TextTag extends 'p' ? HTMLParagraphElement 
  : TextTag extends 'label' ? HTMLLabelElement
  : TextTag extends 'a' ? HTMLAnchorElement
  : never;


  export type TextProps<TextTag extends TextAsTagType = TextAsTagType> = 
  Omit<
      TextElementAttributsFromTagType<TextTag>,
      'color'
  > & {
      /**
     * Rendered DOM element
     *
    elementRef?:HTMLElement; // TextElementFromTagType<TextTag>;
      as?: TextTag;
      color?: Color;
      size?: TextSize;
      weight?: TextWeight;
      transform?: TextTransform;
      align?: Align;
      wrap?: TextWrap;
      truncate?: boolean;
      disabled?: boolean;
      children?: Snippet<[void]>;
  };
  */

export type TextExtend = Omit<HTMLAttributes<HTMLElement>, 'color'> | Omit<HTMLAnchorAttributes, 'color'>;

export type TextProps = TextExtend & {
    /**
     * Rendered DOM element
     */
    elementRef?: HTMLElement;
    /**
     * Render element as
     */
    as?: keyof SvelteHTMLElements;
    /**
     * Text color
     */
    color?: Color;
    /**
     * Font size
     */
    size?: TextSize;
    /**
     * Font weight
     */
    weight?: TextWeight;
    /**
     * Text transform
     */
    transform?: TextTransform;
    /**
     * Text alignment
     */
    align?: Align;
    /**
     * Wrap text mode
     */
    wrap?: TextWrap;
    /**
     * Truncate text with ellipsis
     */
    truncate?: boolean;
    /**
     * Mute text (like disabled without aria-disabled)
     */
    muted?: boolean;
    /**
     * Disable text
     */
    disabled?: boolean;
    /**
     * Text content to render
     */
    children?: Snippet<[void]>;
};
