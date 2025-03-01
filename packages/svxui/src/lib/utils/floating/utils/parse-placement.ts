import type { Placement } from '@floating-ui/dom';
import type { FloatingAlignment, FloatingSide } from '../types.js';

/**
 * Parse floating-ui placement
 * @param placement
 * @returns
 */
export function parsePlacement(placement: Placement): [FloatingSide, FloatingAlignment] {
    const [side, align = 'center'] = placement.split('-');
    return [side, align] as [FloatingSide, FloatingAlignment];
}
