import type { Placements } from '../../components/Popover/Popover.types.js';
import type { Colors, Sizes1To4, Variants } from '../../constants.js';
export interface ThemeSelectProps {
    size?: (typeof Sizes1To4)[number];
    variant?: (typeof Variants)[number];
    color?: (typeof Colors)[number];
    showLabel?: boolean;
    placement?: (typeof Placements)[number];
}
