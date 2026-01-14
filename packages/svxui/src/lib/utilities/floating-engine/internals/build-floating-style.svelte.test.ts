import type { ComputePositionReturn } from '@floating-ui/dom';
import { describe, expect, it, vi } from 'vitest';
import type { FloatingStateOptions } from '../types.js';
import { buildFloatingStyle } from './build-floating-style.js';
import { roundByDPR } from './round-by-dpr.js';

vi.mock('./round-by-dpr', () => ({
    roundByDPR: vi.fn((value: number) => value)
}));

describe('buildFloatingStyle', () => {
    const mockData: ComputePositionReturn = {
        x: 100,
        y: 200,
        placement: 'bottom',
        strategy: 'absolute',
        middlewareData: {}
    };

    it('should return basic positioning style with transform disabled', () => {
        const props: FloatingStateOptions = {
            strategy: 'absolute',
            transform: false
        };

        const result = buildFloatingStyle(mockData, props);

        expect(result).toEqual({
            position: 'absolute',
            left: '100px',
            top: '200px',
            transform: 'unset'
        });
    });

    it('should return transform-based positioning style with transform enabled', () => {
        const props: FloatingStateOptions = {
            strategy: 'absolute',
            transform: true
        };

        const result = buildFloatingStyle(mockData, props);

        expect(result).toEqual({
            position: 'absolute',
            left: '0',
            top: '0',
            transform: 'translate(100px,200px)'
        });
    });

    it('should use fixed strategy when specified', () => {
        const props: FloatingStateOptions = {
            strategy: 'fixed',
            transform: false
        };

        const result = buildFloatingStyle(mockData, props);

        expect(result.position).toBe('fixed');
    });

    it('should call roundByDPR for x and y coordinates', () => {
        const props: FloatingStateOptions = {
            strategy: 'absolute',
            transform: false
        };

        buildFloatingStyle(mockData, props);

        expect(roundByDPR).toHaveBeenCalledWith(100);
        expect(roundByDPR).toHaveBeenCalledWith(200);
    });

    it('should call roundByDPR multiple times when transform is enabled', () => {
        const props: FloatingStateOptions = {
            strategy: 'absolute',
            transform: true
        };

        vi.clearAllMocks();
        buildFloatingStyle(mockData, props);

        // roundByDPR is called 4 times: 2 for initial x,y and 2 more in transform
        expect(roundByDPR).toHaveBeenCalledTimes(4);
    });

    it('should handle negative coordinates', () => {
        const negativeData: ComputePositionReturn = {
            x: -50,
            y: -75,
            placement: 'top',
            strategy: 'absolute',
            middlewareData: {}
        };

        const props: FloatingStateOptions = {
            strategy: 'absolute',
            transform: false
        };

        const result = buildFloatingStyle(negativeData, props);

        expect(result.left).toBe('-50px');
        expect(result.top).toBe('-75px');
    });

    it('should handle zero coordinates', () => {
        const zeroData: ComputePositionReturn = {
            x: 0,
            y: 0,
            placement: 'bottom',
            strategy: 'absolute',
            middlewareData: {}
        };

        const props: FloatingStateOptions = {
            strategy: 'absolute',
            transform: true
        };

        const result = buildFloatingStyle(zeroData, props);

        expect(result.transform).toBe('translate(0px,0px)');
    });

    it('should handle decimal coordinates with roundByDPR', () => {
        vi.mocked(roundByDPR).mockImplementation(
            (value: number) => Math.round(value * window.devicePixelRatio) / window.devicePixelRatio
        );

        const decimalData: ComputePositionReturn = {
            x: 100.5,
            y: 200.7,
            placement: 'bottom',
            strategy: 'absolute',
            middlewareData: {}
        };

        const props: FloatingStateOptions = {
            strategy: 'absolute',
            transform: false
        };

        buildFloatingStyle(decimalData, props);

        expect(roundByDPR).toHaveBeenCalledWith(100.5);
        expect(roundByDPR).toHaveBeenCalledWith(200.7);
    });
});
