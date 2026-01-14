import type { FloatingEngineOptions } from './types.js';

export const defaultFloatingEngineProps: FloatingEngineOptions = {
    transform: true,
    strategy: 'absolute',
    placement: 'bottom',
    middleware: [],
    whileElementsMounted: undefined
};
