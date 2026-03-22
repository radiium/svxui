import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Clipboard } from './clipboard.svelte.ts';

vi.mock('$lib/internals/is.js', () => ({
    isBrowser: vi.fn(() => true)
}));

import { isBrowser } from '$lib/internals/is.js';

function setupClipboardMock(
    overrides: {
        writeText?: () => Promise<void>;
        readText?: () => Promise<string>;
    } = {}
) {
    Object.defineProperty(navigator, 'clipboard', {
        value: {
            writeText: overrides.writeText ?? vi.fn().mockResolvedValue(undefined),
            readText: overrides.readText ?? vi.fn().mockResolvedValue('')
        },
        configurable: true,
        writable: true
    });
}

function setSecureContext(value: boolean) {
    Object.defineProperty(window, 'isSecureContext', {
        value,
        configurable: true,
        writable: true
    });
}

describe('Clipboard', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.mocked(isBrowser).mockReturnValue(true);
        setupClipboardMock();
        setSecureContext(true);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    describe('constructor / availability', () => {
        it('is supported and available in a secure browser context', () => {
            const cb = new Clipboard();
            expect(cb.isSupported).toBe(true);
            expect(cb.isAvailable).toBe(true);
        });

        it('is not supported when isBrowser returns false', () => {
            vi.mocked(isBrowser).mockReturnValue(false);
            const cb = new Clipboard();
            expect(cb.isSupported).toBe(false);
            expect(cb.isAvailable).toBe(false);
        });

        it('is not supported when navigator.clipboard is missing', () => {
            Object.defineProperty(navigator, 'clipboard', {
                value: undefined,
                configurable: true
            });
            const cb = new Clipboard();
            expect(cb.isSupported).toBe(false);
            expect(cb.isAvailable).toBe(false);
        });

        it('is not supported when writeText is not a function', () => {
            Object.defineProperty(navigator, 'clipboard', {
                value: { writeText: 'not-a-function', readText: vi.fn() },
                configurable: true
            });
            const cb = new Clipboard();
            expect(cb.isSupported).toBe(false);
        });

        it('is not supported when readText is not a function', () => {
            Object.defineProperty(navigator, 'clipboard', {
                value: { writeText: vi.fn(), readText: 'not-a-function' },
                configurable: true
            });
            const cb = new Clipboard();
            expect(cb.isSupported).toBe(false);
        });

        it('is supported but not available in an insecure context', () => {
            setSecureContext(false);
            const cb = new Clipboard();
            expect(cb.isSupported).toBe(true);
            expect(cb.isAvailable).toBe(false);
        });

        it('uses the default copyingDuration of 2500ms', async () => {
            const cb = new Clipboard();
            await cb.copy('test');
            expect(cb.isCopying).toBe(true);
            vi.advanceTimersByTime(2499);
            expect(cb.isCopying).toBe(true);
            vi.advanceTimersByTime(1);
            expect(cb.isCopying).toBe(false);
        });

        it('accepts a custom copyingDuration', async () => {
            const cb = new Clipboard({ copyingDuration: 1000 });
            await cb.copy('test');
            expect(cb.isCopying).toBe(true);
            vi.advanceTimersByTime(999);
            expect(cb.isCopying).toBe(true);
            vi.advanceTimersByTime(1);
            expect(cb.isCopying).toBe(false);
        });
    });

    describe('copy()', () => {
        it('returns true and calls writeText on success', async () => {
            const writeText = vi.fn().mockResolvedValue(undefined);
            setupClipboardMock({ writeText });

            const cb = new Clipboard();
            const result = await cb.copy('hello');

            expect(result).toBe(true);
            expect(writeText).toHaveBeenCalledWith('hello');
            expect(cb.error).toBeNull();
        });

        it('sets isCopying to true during the copying duration', async () => {
            const cb = new Clipboard();
            await cb.copy('hello');

            expect(cb.isCopying).toBe(true);
            vi.advanceTimersByTime(2500);
            expect(cb.isCopying).toBe(false);
        });

        it('resets isCopying after the duration even on failure', async () => {
            setupClipboardMock({ writeText: vi.fn().mockRejectedValue(new Error('denied')) });

            const cb = new Clipboard();
            await cb.copy('hello');

            expect(cb.isCopying).toBe(true);
            vi.advanceTimersByTime(2500);
            expect(cb.isCopying).toBe(false);
        });

        it('resets the timer if copy is called again before duration ends', async () => {
            const cb = new Clipboard();
            await cb.copy('first');
            vi.advanceTimersByTime(1000);
            await cb.copy('second');
            vi.advanceTimersByTime(2499);
            expect(cb.isCopying).toBe(true);
            vi.advanceTimersByTime(1);
            expect(cb.isCopying).toBe(false);
        });

        it('returns false and sets error when clipboard is not available', async () => {
            setSecureContext(false);
            const cb = new Clipboard();

            const result = await cb.copy('hello');

            expect(result).toBe(false);
            expect(cb.error).toBe('Clipboard not available');
        });

        it('returns false and sets error when writeText rejects', async () => {
            setupClipboardMock({
                writeText: vi.fn().mockRejectedValue(new Error('Permission denied'))
            });

            const cb = new Clipboard();
            const result = await cb.copy('hello');

            expect(result).toBe(false);
            expect(cb.error).toBe('Permission denied');
        });

        it('sets a fallback error message for non-Error rejections', async () => {
            setupClipboardMock({
                writeText: vi.fn().mockRejectedValue('unknown failure')
            });

            const cb = new Clipboard();
            await cb.copy('hello');

            expect(cb.error).toBe('Error during copying');
        });

        it('clears the previous error at the start of each copy call', async () => {
            setupClipboardMock({
                writeText: vi
                    .fn()
                    .mockRejectedValueOnce(new Error('first error'))
                    .mockResolvedValue(undefined)
            });

            const cb = new Clipboard();
            await cb.copy('hello');
            expect(cb.error).toBe('first error');

            await cb.copy('hello again');
            expect(cb.error).toBeNull();
        });
    });

    describe('read()', () => {
        it('returns the clipboard text on success', async () => {
            setupClipboardMock({ readText: vi.fn().mockResolvedValue('clipboard content') });

            const cb = new Clipboard();
            const result = await cb.read();

            expect(result).toBe('clipboard content');
            expect(cb.error).toBeNull();
        });

        it('returns null and sets error when clipboard is not available', async () => {
            setSecureContext(false);
            const cb = new Clipboard();

            const result = await cb.read();

            expect(result).toBeNull();
            expect(cb.error).toBe('Clipboard not available');
        });

        it('returns null and sets error when readText rejects', async () => {
            setupClipboardMock({
                readText: vi.fn().mockRejectedValue(new Error('Read failed'))
            });

            const cb = new Clipboard();
            const result = await cb.read();

            expect(result).toBeNull();
            expect(cb.error).toBe('Read failed');
        });

        it('sets a fallback error message for non-Error rejections', async () => {
            setupClipboardMock({
                readText: vi.fn().mockRejectedValue(42)
            });

            const cb = new Clipboard();
            await cb.read();

            expect(cb.error).toBe('Error during reading');
        });

        it('clears the previous error at the start of each read call', async () => {
            setupClipboardMock({
                readText: vi.fn().mockRejectedValueOnce(new Error('read error')).mockResolvedValue('ok')
            });

            const cb = new Clipboard();
            await cb.read();
            expect(cb.error).toBe('read error');

            await cb.read();
            expect(cb.error).toBeNull();
        });
    });

    describe('clearError()', () => {
        it('resets the error to null', async () => {
            setupClipboardMock({
                writeText: vi.fn().mockRejectedValue(new Error('oops'))
            });

            const cb = new Clipboard();
            await cb.copy('test');
            expect(cb.error).toBe('oops');

            cb.clearError();
            expect(cb.error).toBeNull();
        });

        it('is a no-op when there is no error', () => {
            const cb = new Clipboard();
            expect(() => cb.clearError()).not.toThrow();
            expect(cb.error).toBeNull();
        });
    });
});
