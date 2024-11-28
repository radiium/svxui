import { FLoating } from '../floating.svelte.js';
import type { UseFloatingProps } from '../types.js';

export function useFloating(props: Partial<UseFloatingProps>): FLoating {
    return new FLoating(props);
}
