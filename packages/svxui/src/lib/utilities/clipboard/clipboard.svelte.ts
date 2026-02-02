import { isBrowser } from '$lib/internals/is.js';
import type { ClipBoardOptions } from './types.js';

/**
 * A clipboard utility that handles copy/read operations, availability checks, and reactive copy state with error handling.
 */
export class Clipboard {
    #isSupported = $state(false);
    #isAvailable = $state(false);
    #isCopying = $state(false);
    #isCopyingDuration: number = $state(2500);
    #isCopyingTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
    #error = $state<string | null>(null);

    constructor(options?: ClipBoardOptions) {
        const { copyingDuration = 2500 } = options ?? {};
        this.#isCopyingDuration = copyingDuration;

        this.#checkAvailability();
    }

    /**
     * Indicates whether the Clipboard API is supported by the current environment.
     */
    get isSupported() {
        return this.#isSupported;
    }

    /**
     * Indicates whether the clipboard can be used in the current context (e.g. secure context).
     */
    get isAvailable() {
        return this.#isAvailable;
    }

    /**
     * Indicates whether a copy operation is active.
     * This state remains true for the configured copiedDuration.
     */
    get isCopying() {
        return this.#isCopying;
    }

    /**
     * Contains the last clipboard error, if any.
     */
    get error() {
        return this.#error;
    }

    /**
     * Check if the clipboard is available
     */
    #checkAvailability(): void {
        this.#isSupported = !!(
            isBrowser() &&
            navigator?.clipboard &&
            typeof navigator.clipboard.writeText === 'function' &&
            typeof navigator.clipboard.readText === 'function'
        );

        this.#isAvailable = this.#isSupported && window.isSecureContext;
    }

    /**
     * Copy text to the clipboard
     */
    async copy(text: string): Promise<boolean> {
        this.#error = null;
        this.#isCopying = true;

        try {
            if (!this.#isAvailable) {
                throw new Error('Clipboard not available');
            }

            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            this.#error = err instanceof Error ? err.message : 'Error during copying';
            console.error('Clipboard error:', err);
            return false;
        } finally {
            clearTimeout(this.#isCopyingTimeout);
            this.#isCopyingTimeout = setTimeout(() => (this.#isCopying = false), this.#isCopyingDuration);
        }
    }

    /**
     * Read text from the clipboard
     */
    async read(): Promise<string | null> {
        this.#error = null;

        try {
            if (!this.#isAvailable) {
                throw new Error('Clipboard not available');
            }

            const text = await navigator.clipboard.readText();
            return text;
        } catch (err) {
            this.#error = err instanceof Error ? err.message : 'Error during reading';
            console.error('Clipboard error:', err);
            return null;
        }
    }

    /**
     * Reset error
     */
    clearError(): void {
        this.#error = null;
    }
}
