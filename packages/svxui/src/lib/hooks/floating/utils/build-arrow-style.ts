import type { MiddlewareData } from '@floating-ui/dom';
import type { FloatingSide } from '../types.js';

export function buildArrowStyle(
    side: FloatingSide,
    data: MiddlewareData,
    arrow?: HTMLElement | SVGElement
): Partial<CSSStyleDeclaration> {
    if (!data.arrow || !arrow) {
        return {};
    }

    const arrowOffset = arrow ? arrow.getBoundingClientRect().height / 2 : 0;
    const arrowX = data.arrow?.x;
    const arrowY = data.arrow?.y;
    const staticSide: string = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right'
    }[side]!;

    return {
        left: arrowX != null ? `${arrowX}px` : 'unset',
        top: arrowY != null ? `${arrowY}px` : 'unset',
        right: 'unset',
        bottom: 'unset',
        [staticSide]: `-${arrowOffset}px`
        // [staticSide]: '-5px'
    };
}
