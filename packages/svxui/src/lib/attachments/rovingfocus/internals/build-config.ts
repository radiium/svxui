import { kbd } from '$lib/internals/kbd.js';
import type { RovingfocusConfigInternal, RovingfocusOptions } from '../types.js';

export function buildConfig(options?: RovingfocusOptions): Readonly<RovingfocusConfigInternal> {
    const target = options?.target ?? '[data-roving-item]';
    const loop = options?.loop ?? false;
    const orientation = options?.orientation ?? 'vertical';
    const activateOnFocus = options?.activateOnFocus ?? false;
    const initialIndexNumber = Number(options?.initialIndex);
    const initialIndex = isNaN(initialIndexNumber) ? 'first' : initialIndexNumber;

    const keysMapping = {
        vertical: {
            prevKey: kbd.ARROW_UP,
            nextKey: kbd.ARROW_DOWN,
            allowedKeys: [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.HOME, kbd.END]
        },
        horizontal: {
            prevKey: kbd.ARROW_LEFT,
            nextKey: kbd.ARROW_RIGHT,
            allowedKeys: [kbd.ARROW_LEFT, kbd.ARROW_RIGHT, kbd.HOME, kbd.END]
        }
    };

    const { prevKey, nextKey, allowedKeys } = keysMapping[orientation];

    return {
        target,
        loop,
        orientation,
        initialIndex,
        activateOnFocus,
        prevKey,
        nextKey,
        allowedKeys
    };
}
