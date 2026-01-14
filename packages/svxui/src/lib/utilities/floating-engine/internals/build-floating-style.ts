import type { ComputePositionReturn } from '@floating-ui/dom';
import type { FloatingStateOptions } from '../types.js';
import { roundByDPR } from './round-by-dpr.js';

/**
 * Build floating positioning style
 * @param data
 * @param props
 * @returns
 */
export function buildFloatingStyle(
    data: ComputePositionReturn,
    options: FloatingStateOptions
): Partial<CSSStyleDeclaration> {
    const x = roundByDPR(data.x);
    const y = roundByDPR(data.y);

    let floatingStyle = {
        position: options.strategy,
        left: '0',
        top: '0',
        transform: 'unset'
    };
    if (options.transform) {
        floatingStyle = {
            ...floatingStyle,
            top: '0',
            left: '0',
            transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`
        };
    } else {
        floatingStyle = {
            ...floatingStyle,
            left: `${x}px`,
            top: `${y}px`
        };
    }

    return floatingStyle;
}
