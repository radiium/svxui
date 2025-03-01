import type { FloatingStateManagerProps } from './types.js';

export const defaultFloatingStateManager: FloatingStateManagerProps = {
    transform: true,
    strategy: 'absolute',
    placement: 'bottom',
    middleware: [],
    whileElementsMounted: undefined
};
