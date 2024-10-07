import type { Colors, Placements, Sizes1To4, Variants } from '$lib/shared.types.js';

export type ThemeSelectProps = {
    size?: (typeof Sizes1To4)[number];
    variant?: (typeof Variants)[number];
    color?: (typeof Colors)[number];
    iconOnly?: boolean;
    placement?: (typeof Placements)[number];
};
