import type { CreateFloatingProps } from './create-floating.type.js';

export const defaultCreateFloatingProps: CreateFloatingProps = {
    autoUpdate: false,
    transform: true,
    strategy: 'absolute',
    placement: 'bottom',
    offset: 10,
    flip: true,
    size: false,
    shift: false,
    hide: false,
    arrow: true,
    customMiddleware: []
};
