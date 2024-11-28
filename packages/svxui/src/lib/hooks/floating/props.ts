import type { UseFloatingProps } from './types.js';

export const defaultUseFloatingProps: UseFloatingProps = {
    transform: true,
    strategy: 'absolute',
    placement: 'bottom',
    middleware: [],
    whileElementsMounted: undefined
};
