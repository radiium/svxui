import { describe, it, expect } from 'vitest';
import { parsePlacement } from './parse-placement.js';

describe('parsePlacement', () => {
    describe('simple placements without alignment', () => {
        it('should parse "top" placement', () => {
            const result = parsePlacement('top');
            expect(result).toEqual(['top', 'center']);
        });

        it('should parse "right" placement', () => {
            const result = parsePlacement('right');
            expect(result).toEqual(['right', 'center']);
        });

        it('should parse "bottom" placement', () => {
            const result = parsePlacement('bottom');
            expect(result).toEqual(['bottom', 'center']);
        });

        it('should parse "left" placement', () => {
            const result = parsePlacement('left');
            expect(result).toEqual(['left', 'center']);
        });
    });

    describe('placements with start alignment', () => {
        it('should parse "top-start" placement', () => {
            const result = parsePlacement('top-start');
            expect(result).toEqual(['top', 'start']);
        });

        it('should parse "right-start" placement', () => {
            const result = parsePlacement('right-start');
            expect(result).toEqual(['right', 'start']);
        });

        it('should parse "bottom-start" placement', () => {
            const result = parsePlacement('bottom-start');
            expect(result).toEqual(['bottom', 'start']);
        });

        it('should parse "left-start" placement', () => {
            const result = parsePlacement('left-start');
            expect(result).toEqual(['left', 'start']);
        });
    });

    describe('placements with end alignment', () => {
        it('should parse "top-end" placement', () => {
            const result = parsePlacement('top-end');
            expect(result).toEqual(['top', 'end']);
        });

        it('should parse "right-end" placement', () => {
            const result = parsePlacement('right-end');
            expect(result).toEqual(['right', 'end']);
        });

        it('should parse "bottom-end" placement', () => {
            const result = parsePlacement('bottom-end');
            expect(result).toEqual(['bottom', 'end']);
        });

        it('should parse "left-end" placement', () => {
            const result = parsePlacement('left-end');
            expect(result).toEqual(['left', 'end']);
        });
    });

    describe('return type validation', () => {
        it('should return a tuple with correct types', () => {
            const result = parsePlacement('top-start');

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            expect(typeof result[0]).toBe('string');
            expect(typeof result[1]).toBe('string');
        });

        it('should always return FloatingSide as first element', () => {
            const sides = ['top', 'right', 'bottom', 'left'] as const;

            sides.forEach((side) => {
                const result = parsePlacement(side);
                expect(result[0]).toBe(side);
            });
        });

        it('should always return FloatingAlignment as second element', () => {
            // const alignments = ['start', 'end', 'center'] as const;

            expect(parsePlacement('top')[1]).toBe('center');
            expect(parsePlacement('top-start')[1]).toBe('start');
            expect(parsePlacement('top-end')[1]).toBe('end');
        });
    });

    describe('default alignment behavior', () => {
        it('should default to "center" when no alignment is specified', () => {
            const placements = ['top', 'right', 'bottom', 'left'] as const;

            placements.forEach((placement) => {
                const result = parsePlacement(placement);
                expect(result[1]).toBe('center');
            });
        });
    });
});
