import { describe, it, expect } from 'vitest';
import { resolveSpace } from './resolve-space.js';

describe('resolveSpace', () => {
    it('returns undefined for undefined input', () => {
        expect(resolveSpace(undefined)).toBeUndefined();
    });

    it('returns "0px" for "0"', () => {
        expect(resolveSpace('0')).toBe('0px');
    });

    it('converts positive scale tokens 1–9 to CSS custom properties', () => {
        expect(resolveSpace('1')).toBe('var(--space-1)');
        expect(resolveSpace('4')).toBe('var(--space-4)');
        expect(resolveSpace('9')).toBe('var(--space-9)');
    });

    it('converts negative scale tokens -1–-9 to calc expressions', () => {
        expect(resolveSpace('-1')).toBe('calc(var(--space-1) * -1)');
        expect(resolveSpace('-2')).toBe('calc(var(--space-2) * -1)');
        expect(resolveSpace('-9')).toBe('calc(var(--space-9) * -1)');
    });

    it('passes arbitrary CSS values through unchanged', () => {
        expect(resolveSpace('1rem')).toBe('1rem');
        expect(resolveSpace('auto')).toBe('auto');
        expect(resolveSpace('10px')).toBe('10px');
        expect(resolveSpace('50%')).toBe('50%');
    });

    it('passes multi-digit numbers through unchanged', () => {
        expect(resolveSpace('10')).toBe('10');
        expect(resolveSpace('100')).toBe('100');
    });
});
