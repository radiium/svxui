import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { roundByDPR } from './round-by-dpr.js';

describe('roundByDPR', () => {
    describe('with default DPR (1)', () => {
        beforeEach(() => {
            vi.stubGlobal('devicePixelRatio', 1);
        });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('should return the same value for integers', () => {
            expect(roundByDPR(10)).toBe(10);
            expect(roundByDPR(100)).toBe(100);
            expect(roundByDPR(0)).toBe(0);
        });

        it('should round 0.5 to 1', () => {
            expect(roundByDPR(0.5)).toBe(1);
        });

        it('should round 0.4 to 0', () => {
            expect(roundByDPR(0.4)).toBe(0);
        });

        it('should round 1.5 to 2', () => {
            expect(roundByDPR(1.5)).toBe(2);
        });

        it('should handle negative values', () => {
            expect(roundByDPR(-1.5)).toBe(-1);
            expect(roundByDPR(-0.5)).toBe(-0);
            expect(roundByDPR(-10.7)).toBe(-11);
        });
    });

    describe('with DPR = 2', () => {
        beforeEach(() => {
            vi.stubGlobal('devicePixelRatio', 2);
        });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('should round to nearest 0.5', () => {
            expect(roundByDPR(10.2)).toBe(10);
            expect(roundByDPR(10.3)).toBe(10.5);
            expect(roundByDPR(10.7)).toBe(10.5);
            expect(roundByDPR(10.8)).toBe(11);
        });

        it('should handle exact half pixels', () => {
            expect(roundByDPR(10.5)).toBe(10.5);
            expect(roundByDPR(11.5)).toBe(11.5);
        });

        it('should handle integers', () => {
            expect(roundByDPR(10)).toBe(10);
            expect(roundByDPR(100)).toBe(100);
        });

        it('should handle negative values', () => {
            expect(roundByDPR(-10.3)).toBe(-10.5);
            expect(roundByDPR(-10.7)).toBe(-10.5);
        });
    });

    describe('with DPR = 3', () => {
        beforeEach(() => {
            vi.stubGlobal('devicePixelRatio', 3);
        });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('should round to nearest third', () => {
            expect(roundByDPR(10.1)).toBeCloseTo(10, 5);
            expect(roundByDPR(10.2)).toBeCloseTo(10.33, 2);
            expect(roundByDPR(10.5)).toBeCloseTo(10.67, 2);
            expect(roundByDPR(10.8)).toBeCloseTo(10.67, 2);
        });

        it('should handle exact thirds', () => {
            expect(roundByDPR(10.333333)).toBeCloseTo(10.33, 2);
            expect(roundByDPR(10.666666)).toBeCloseTo(10.67, 2);
        });
    });

    describe('with high DPR values', () => {
        beforeEach(() => {
            vi.stubGlobal('devicePixelRatio', 4);
        });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('should handle DPR = 4', () => {
            expect(roundByDPR(10.1)).toBe(10);
            expect(roundByDPR(10.2)).toBe(10.25);
            expect(roundByDPR(10.4)).toBe(10.5);
            expect(roundByDPR(10.6)).toBe(10.5);
        });
    });

    describe('edge cases', () => {
        beforeEach(() => {
            vi.stubGlobal('devicePixelRatio', 2);
        });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('should handle zero', () => {
            expect(roundByDPR(0)).toBe(0);
        });

        it('should handle very small positive values', () => {
            expect(roundByDPR(0.1)).toBe(0);
            expect(roundByDPR(0.01)).toBe(0);
        });

        it('should handle very small negative values', () => {
            expect(roundByDPR(-0.1)).toBe(-0);
            expect(roundByDPR(-0.01)).toBe(-0);
        });

        it('should handle very large values', () => {
            expect(roundByDPR(10000.3)).toBe(10000.5);
            expect(roundByDPR(99999.7)).toBe(99999.5);
        });
    });

    describe('fallback behavior', () => {
        it('should use DPR = 1 when devicePixelRatio is undefined', () => {
            vi.stubGlobal('devicePixelRatio', undefined);

            expect(roundByDPR(10.5)).toBe(11);
            expect(roundByDPR(10.4)).toBe(10);

            vi.unstubAllGlobals();
        });

        it('should use DPR = 1 when devicePixelRatio is 0', () => {
            vi.stubGlobal('devicePixelRatio', 0);

            expect(roundByDPR(10.5)).toBe(11);

            vi.unstubAllGlobals();
        });

        it('should use DPR = 1 when devicePixelRatio is null', () => {
            vi.stubGlobal('devicePixelRatio', null);

            expect(roundByDPR(10.5)).toBe(11);

            vi.unstubAllGlobals();
        });
    });

    describe('mathematical correctness', () => {
        beforeEach(() => {
            vi.stubGlobal('devicePixelRatio', 2);
        });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('should satisfy: roundByDPR(x) * DPR = integer', () => {
            const testValues = [10.1, 10.3, 10.5, 10.7, 10.9];

            testValues.forEach((value) => {
                const result = roundByDPR(value);
                const multiplied = result * 2;
                expect(multiplied % 1).toBeCloseTo(0, 10);
            });
        });

        it('should be consistent with pixel-perfect rendering', () => {
            // Pour DPR=2, les valeurs valides sont : 0, 0.5, 1, 1.5, 2, 2.5...
            expect(roundByDPR(0.3)).toBe(0.5);
            expect(roundByDPR(0.7)).toBe(0.5);
            expect(roundByDPR(1.3)).toBe(1.5);
            expect(roundByDPR(1.7)).toBe(1.5);
        });
    });
});
