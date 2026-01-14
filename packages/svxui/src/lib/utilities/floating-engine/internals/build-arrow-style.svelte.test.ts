import { describe, it, expect } from 'vitest';
import { buildArrowStyle } from './build-arrow-style.js';
import type { Coords, MiddlewareData } from '@floating-ui/dom';

describe('buildArrowStyle', () => {
    function createArrow(height = 10): HTMLElement {
        const el = document.createElement('div');
        el.getBoundingClientRect = () =>
            ({
                height
            }) as DOMRect;
        return el;
    }

    it('returns an empty object when data.arrow is missing', () => {
        const data = {} as MiddlewareData;
        const arrow = createArrow();

        const style = buildArrowStyle('top', data, arrow);

        expect(style).toEqual({});
    });

    it('returns an empty object when arrow element is missing', () => {
        const data = {
            arrow: { x: 10, y: 20 }
        } as MiddlewareData;

        const style = buildArrowStyle('top', data);

        expect(style).toEqual({});
    });

    it('builds style with top side', () => {
        const data = {
            arrow: { x: 10, y: 20 }
        } as MiddlewareData;

        const arrow = createArrow(10);

        const style = buildArrowStyle('top', data, arrow);

        expect(style).toEqual({
            left: '10px',
            top: '20px',
            right: 'unset',
            // bottom: 'unset',
            bottom: '-5px'
        });
    });

    it('builds style with bottom side', () => {
        const data = {
            arrow: { x: 5, y: 15 }
        } as MiddlewareData;

        const arrow = createArrow(20);

        const style = buildArrowStyle('bottom', data, arrow);

        expect(style).toEqual({
            left: '5px',
            // top: '15px',
            right: 'unset',
            bottom: 'unset',
            top: '-10px'
        });
    });

    it('builds style with left side', () => {
        const data = {
            arrow: { x: 8, y: 12 }
        } as MiddlewareData;

        const arrow = createArrow(16);

        const style = buildArrowStyle('left', data, arrow);

        expect(style).toEqual({
            left: '8px',
            top: '12px',
            // right: 'unset',
            bottom: 'unset',
            right: '-8px'
        });
    });

    it('builds style with right side', () => {
        const data = {
            arrow: { x: 3, y: 7 }
        } as MiddlewareData;

        const arrow = createArrow(12);

        const style = buildArrowStyle('right', data, arrow);

        expect(style).toEqual({
            // left: '3px',
            top: '7px',
            right: 'unset',
            bottom: 'unset',
            left: '-6px'
        });
    });

    it('uses "unset" when arrow x or y is null', () => {
        const data = {
            arrow: {}
        } as MiddlewareData;

        const arrow = createArrow(10);

        const style = buildArrowStyle('top', data, arrow);

        expect(style.left).toBe('unset');
        expect(style.top).toBe('unset');
        expect(style.bottom).toBe('-5px');
    });
});
