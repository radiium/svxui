import { describe, expect, it } from 'vitest';
import { resolveBoxModel } from './resolve-box-model.js';

describe('resolveBoxModel', () => {
    // ─── Padding ────────────────────────────────────────────────────

    it('resolves p to all four padding sides', () => {
        const result = resolveBoxModel({ p: '4' });

        expect(result['padding-top']).toBe('var(--space-4)');
        expect(result['padding-right']).toBe('var(--space-4)');
        expect(result['padding-bottom']).toBe('var(--space-4)');
        expect(result['padding-left']).toBe('var(--space-4)');
    });

    it('resolves px to padding-right and padding-left, overriding p', () => {
        const result = resolveBoxModel({ p: '4', px: '2' });

        expect(result['padding-top']).toBe('var(--space-4)');
        expect(result['padding-right']).toBe('var(--space-2)');
        expect(result['padding-bottom']).toBe('var(--space-4)');
        expect(result['padding-left']).toBe('var(--space-2)');
    });

    it('resolves py to padding-top and padding-bottom, overriding p', () => {
        const result = resolveBoxModel({ p: '4', py: '2' });

        expect(result['padding-top']).toBe('var(--space-2)');
        expect(result['padding-right']).toBe('var(--space-4)');
        expect(result['padding-bottom']).toBe('var(--space-2)');
        expect(result['padding-left']).toBe('var(--space-4)');
    });

    it('resolves individual padding sides with highest priority', () => {
        const result = resolveBoxModel({ p: '4', px: '2', py: '3', pt: '1', pr: '1', pb: '1', pl: '1' });

        expect(result['padding-top']).toBe('var(--space-1)');
        expect(result['padding-right']).toBe('var(--space-1)');
        expect(result['padding-bottom']).toBe('var(--space-1)');
        expect(result['padding-left']).toBe('var(--space-1)');
    });

    // ─── Margin ─────────────────────────────────────────────────────

    it('resolves m to all four margin sides', () => {
        const result = resolveBoxModel({ m: '2' });

        expect(result['margin-top']).toBe('var(--space-2)');
        expect(result['margin-right']).toBe('var(--space-2)');
        expect(result['margin-bottom']).toBe('var(--space-2)');
        expect(result['margin-left']).toBe('var(--space-2)');
    });

    it('resolves mx and my overriding m', () => {
        const result = resolveBoxModel({ m: '4', mx: '1', my: '2' });

        expect(result['margin-top']).toBe('var(--space-2)');
        expect(result['margin-right']).toBe('var(--space-1)');
        expect(result['margin-bottom']).toBe('var(--space-2)');
        expect(result['margin-left']).toBe('var(--space-1)');
    });

    it('resolves individual margin sides with highest priority', () => {
        const result = resolveBoxModel({ m: '4', mt: '0', mr: '1', mb: '2', ml: '3' });

        expect(result['margin-top']).toBe('0px');
        expect(result['margin-right']).toBe('var(--space-1)');
        expect(result['margin-bottom']).toBe('var(--space-2)');
        expect(result['margin-left']).toBe('var(--space-3)');
    });

    // ─── Sizing ─────────────────────────────────────────────────────

    it('passes width, maxWidth, minWidth through unchanged', () => {
        const result = resolveBoxModel({ width: '100%', maxWidth: '800px', minWidth: '200px' });

        expect(result['width']).toBe('100%');
        expect(result['max-width']).toBe('800px');
        expect(result['min-width']).toBe('200px');
    });

    it('passes height, maxHeight, minHeight through unchanged', () => {
        const result = resolveBoxModel({ height: '100vh', maxHeight: '600px', minHeight: '100px' });

        expect(result['height']).toBe('100vh');
        expect(result['max-height']).toBe('600px');
        expect(result['min-height']).toBe('100px');
    });

    // ─── Flex child ──────────────────────────────────────────────────

    it('passes flexBasis, flexGrow, flexShrink through unchanged', () => {
        const result = resolveBoxModel({ flexBasis: '200px', flexGrow: '1', flexShrink: '0' });

        expect(result['flex-basis']).toBe('200px');
        expect(result['flex-grow']).toBe('1');
        expect(result['flex-shrink']).toBe('0');
    });

    // ─── Overflow ────────────────────────────────────────────────────

    it('resolves overflow to both overflow-x and overflow-y', () => {
        const result = resolveBoxModel({ overflow: 'hidden' });

        expect(result['overflow-x']).toBe('hidden');
        expect(result['overflow-y']).toBe('hidden');
    });

    it('resolves overflowX and overflowY independently, overriding overflow', () => {
        const result = resolveBoxModel({ overflow: 'hidden', overflowX: 'auto', overflowY: 'scroll' });

        expect(result['overflow-x']).toBe('auto');
        expect(result['overflow-y']).toBe('scroll');
    });

    // ─── Arbitrary CSS values ────────────────────────────────────────

    it('passes arbitrary CSS values through resolveSpace unchanged', () => {
        const result = resolveBoxModel({ p: '1.5rem', m: 'auto' });

        expect(result['padding-top']).toBe('1.5rem');
        expect(result['margin-top']).toBe('auto');
    });

    // ─── Empty / undefined ───────────────────────────────────────────

    it('returns undefined for all keys when no props are set', () => {
        const result = resolveBoxModel({});

        expect(Object.values(result).every((v) => v === undefined)).toBe(true);
    });
});
