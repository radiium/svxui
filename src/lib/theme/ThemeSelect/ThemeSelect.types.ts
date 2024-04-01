import type { Placements } from '$lib/components/Popover/Popover.types.js';
import type { Colors, Sizes1To4, Variants } from '$lib/constants.js';

export interface ThemeSelectProps {
    size?: (typeof Sizes1To4)[number];
    variant?: (typeof Variants)[number];
    color?: (typeof Colors)[number];
    showLabel?: boolean;
    placement?: (typeof Placements)[number];
}
