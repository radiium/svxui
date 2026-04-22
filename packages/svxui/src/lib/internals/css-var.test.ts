import { describe, it, expect } from 'vitest';
import { cssVar } from './css-var.js';

describe('cssVar', () => {
    it('returns a CSS custom property declaration when value is provided', () => {
        expect(cssVar('--flex-gap', 'var(--space-3)')).toBe('--flex-gap: var(--space-3)');
    });

    it('returns undefined when value is undefined', () => {
        expect(cssVar('--flex-gap', undefined)).toBeUndefined();
    });

    it('works with arbitrary property names and values', () => {
        expect(cssVar('--color-bg', 'red')).toBe('--color-bg: red');
        expect(cssVar('--size', '100%')).toBe('--size: 100%');
    });

    it('works with an empty string value', () => {
        expect(cssVar('--my-var', '')).toBe('--my-var: ');
    });
});
