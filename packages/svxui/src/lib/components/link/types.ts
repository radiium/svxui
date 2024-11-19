import type { TextUnderlines } from '$lib/shared.types.js';
import type { TextAnchorProps, TextBaseProps } from '../text/types.js';

export type LinkProps = Omit<TextAnchorProps, 'as'> &
    TextBaseProps & {
        underline?: (typeof TextUnderlines)[number];
    };
