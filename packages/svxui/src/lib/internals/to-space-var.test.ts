import { describe, expect, it } from 'vitest';
import { toSpaceVar } from './to-space-var.js';

describe('toSpaceVar', () => {
    it('returns undefined for undefined input', () => {
        expect(toSpaceVar(undefined)).toBeUndefined();
    });

    it('returns "0px" for "0"', () => {
        expect(toSpaceVar('0')).toBe('0px');
    });

    it('converts positive scale tokens 1–9 to CSS custom properties', () => {
        expect(toSpaceVar('1')).toBe('var(--space-1)');
        expect(toSpaceVar('4')).toBe('var(--space-4)');
        expect(toSpaceVar('9')).toBe('var(--space-9)');
    });

    it('converts negative scale tokens -1–-9 to calc expressions', () => {
        expect(toSpaceVar('-1')).toBe('calc(var(--space-1) * -1)');
        expect(toSpaceVar('-2')).toBe('calc(var(--space-2) * -1)');
        expect(toSpaceVar('-9')).toBe('calc(var(--space-9) * -1)');
    });

    it('passes arbitrary CSS values through unchanged', () => {
        expect(toSpaceVar('1rem')).toBe('1rem');
        expect(toSpaceVar('auto')).toBe('auto');
        expect(toSpaceVar('10px')).toBe('10px');
        expect(toSpaceVar('50%')).toBe('50%');
    });

    it('passes multi-digit numbers through unchanged', () => {
        expect(toSpaceVar('10')).toBe('10');
        expect(toSpaceVar('100')).toBe('100');
    });
});
