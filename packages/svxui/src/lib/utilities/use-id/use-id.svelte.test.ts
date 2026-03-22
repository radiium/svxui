import { describe, expect, it, vi } from 'vitest';
import { useId } from './use-id.svelte.ts';

describe('useId', () => {
    describe('output format', () => {
        it('returns a string', () => {
            expect(typeof useId()).toBe('string');
        });

        it('returns 10 characters by default', () => {
            expect(useId()).toHaveLength(10);
        });

        it('returns the requested length', () => {
            expect(useId(1)).toHaveLength(1);
            expect(useId(5)).toHaveLength(5);
            expect(useId(21)).toHaveLength(21);
            expect(useId(100)).toHaveLength(100);
        });

        it('returns an empty string when size is 0', () => {
            expect(useId(0)).toBe('');
        });

        it('only contains characters from the urlAlphabet', () => {
            const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
            const id = useId(200);
            for (const char of id) {
                expect(urlAlphabet).toContain(char);
            }
        });
    });

    describe('uniqueness', () => {
        it('generates different ids across calls', () => {
            const ids = new Set(Array.from({ length: 1000 }, () => useId()));
            expect(ids.size).toBe(1000);
        });
    });

    describe('Math.random boundary handling', () => {
        it('uses the first alphabet character when Math.random returns 0', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0);
            expect(useId(1)).toBe('u');
            vi.restoreAllMocks();
        });

        it('uses the last alphabet character when Math.random returns its max value', () => {
            // (0.999... * 64) | 0 = 63 → last char 't'
            vi.spyOn(Math, 'random').mockReturnValue(0.9999999);
            expect(useId(1)).toBe('t');
            vi.restoreAllMocks();
        });

        it('maps Math.random output to the correct alphabet index', () => {
            const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
            // (0.5 * 64) | 0 = 32 → urlAlphabet[32] = 'M'
            vi.spyOn(Math, 'random').mockReturnValue(0.5);
            expect(useId(1)).toBe(urlAlphabet[32]);
            vi.restoreAllMocks();
        });

        it('builds the full id by concatenating each sampled character', () => {
            // Mock returns alternating 0 and 0.5 → alternating 'u' (idx 0) and 'M' (idx 32)
            vi.spyOn(Math, 'random')
                .mockReturnValueOnce(0)
                .mockReturnValueOnce(0.5)
                .mockReturnValueOnce(0)
                .mockReturnValueOnce(0.5);
            expect(useId(4)).toBe('uMuM');
            vi.restoreAllMocks();
        });
    });
});
