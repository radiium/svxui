import { describe, expect, it } from 'vitest';
import { resolveSpacing } from './resolve-spacing.js';

describe('resolveSpacing', () => {
    // ─── Output shape ────────────────────────────────────────────────

    it('always returns exactly 8 keys', () => {
        const result = resolveSpacing({});

        expect(Object.keys(result)).toEqual([
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left'
        ]);
    });

    it('returns undefined for all keys when no props are set', () => {
        const result = resolveSpacing({});

        expect(Object.values(result).every((v) => v === undefined)).toBe(true);
    });

    // ─── Padding — cascade ───────────────────────────────────────────

    it('p resolves to all four padding sides', () => {
        const result = resolveSpacing({ p: '4' });

        expect(result['padding-top']).toBe('var(--space-4)');
        expect(result['padding-right']).toBe('var(--space-4)');
        expect(result['padding-bottom']).toBe('var(--space-4)');
        expect(result['padding-left']).toBe('var(--space-4)');
    });

    it('px overrides p on left and right only', () => {
        const result = resolveSpacing({ p: '4', px: '2' });

        expect(result['padding-top']).toBe('var(--space-4)');
        expect(result['padding-right']).toBe('var(--space-2)');
        expect(result['padding-bottom']).toBe('var(--space-4)');
        expect(result['padding-left']).toBe('var(--space-2)');
    });

    it('py overrides p on top and bottom only', () => {
        const result = resolveSpacing({ p: '4', py: '2' });

        expect(result['padding-top']).toBe('var(--space-2)');
        expect(result['padding-right']).toBe('var(--space-4)');
        expect(result['padding-bottom']).toBe('var(--space-2)');
        expect(result['padding-left']).toBe('var(--space-4)');
    });

    it('pt overrides py and p on top only', () => {
        const result = resolveSpacing({ p: '4', py: '2', pt: '1' });

        expect(result['padding-top']).toBe('var(--space-1)');
        expect(result['padding-bottom']).toBe('var(--space-2)');
    });

    it('pr overrides px and p on right only', () => {
        const result = resolveSpacing({ p: '4', px: '2', pr: '1' });

        expect(result['padding-right']).toBe('var(--space-1)');
        expect(result['padding-left']).toBe('var(--space-2)');
    });

    it('pb overrides py and p on bottom only', () => {
        const result = resolveSpacing({ p: '4', py: '2', pb: '1' });

        expect(result['padding-bottom']).toBe('var(--space-1)');
        expect(result['padding-top']).toBe('var(--space-2)');
    });

    it('pl overrides px and p on left only', () => {
        const result = resolveSpacing({ p: '4', px: '2', pl: '1' });

        expect(result['padding-left']).toBe('var(--space-1)');
        expect(result['padding-right']).toBe('var(--space-2)');
    });

    it('individual sides take highest priority over all shorthands', () => {
        const result = resolveSpacing({ p: '4', px: '3', py: '3', pt: '1', pr: '2', pb: '3', pl: '4' });

        expect(result['padding-top']).toBe('var(--space-1)');
        expect(result['padding-right']).toBe('var(--space-2)');
        expect(result['padding-bottom']).toBe('var(--space-3)');
        expect(result['padding-left']).toBe('var(--space-4)');
    });

    // ─── Margin — cascade ────────────────────────────────────────────

    it('m resolves to all four margin sides', () => {
        const result = resolveSpacing({ m: '2' });

        expect(result['margin-top']).toBe('var(--space-2)');
        expect(result['margin-right']).toBe('var(--space-2)');
        expect(result['margin-bottom']).toBe('var(--space-2)');
        expect(result['margin-left']).toBe('var(--space-2)');
    });

    it('mx overrides m on left and right only', () => {
        const result = resolveSpacing({ m: '4', mx: '1' });

        expect(result['margin-top']).toBe('var(--space-4)');
        expect(result['margin-right']).toBe('var(--space-1)');
        expect(result['margin-bottom']).toBe('var(--space-4)');
        expect(result['margin-left']).toBe('var(--space-1)');
    });

    it('my overrides m on top and bottom only', () => {
        const result = resolveSpacing({ m: '4', my: '1' });

        expect(result['margin-top']).toBe('var(--space-1)');
        expect(result['margin-right']).toBe('var(--space-4)');
        expect(result['margin-bottom']).toBe('var(--space-1)');
        expect(result['margin-left']).toBe('var(--space-4)');
    });

    it('individual sides take highest priority over all shorthands', () => {
        const result = resolveSpacing({ m: '4', mx: '3', my: '3', mt: '1', mr: '2', mb: '3', ml: '4' });

        expect(result['margin-top']).toBe('var(--space-1)');
        expect(result['margin-right']).toBe('var(--space-2)');
        expect(result['margin-bottom']).toBe('var(--space-3)');
        expect(result['margin-left']).toBe('var(--space-4)');
    });

    // ─── Padding and margin are independent ──────────────────────────

    it('padding and margin props do not interfere with each other', () => {
        const result = resolveSpacing({ p: '3', m: '5' });

        expect(result['padding-top']).toBe('var(--space-3)');
        expect(result['padding-right']).toBe('var(--space-3)');
        expect(result['padding-bottom']).toBe('var(--space-3)');
        expect(result['padding-left']).toBe('var(--space-3)');
        expect(result['margin-top']).toBe('var(--space-5)');
        expect(result['margin-right']).toBe('var(--space-5)');
        expect(result['margin-bottom']).toBe('var(--space-5)');
        expect(result['margin-left']).toBe('var(--space-5)');
    });

    // ─── Token edge cases ────────────────────────────────────────────

    it('resolves token "0" to "0px"', () => {
        const result = resolveSpacing({ p: '0', m: '0' });

        expect(result['padding-top']).toBe('0px');
        expect(result['margin-top']).toBe('0px');
    });

    it('passes arbitrary CSS values through unchanged', () => {
        const result = resolveSpacing({ p: '1.5rem', m: 'auto' });

        expect(result['padding-top']).toBe('1.5rem');
        expect(result['padding-right']).toBe('1.5rem');
        expect(result['margin-top']).toBe('auto');
        expect(result['margin-right']).toBe('auto');
    });
});
