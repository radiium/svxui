import type { TextProps } from '../text/types.js';

export type TextUnderline = 'auto' | 'always' | 'hover' | 'none';

export type LinkProps = TextProps & {
    /**
     * Text decoration underline
     */
    underline?: TextUnderline;
};
