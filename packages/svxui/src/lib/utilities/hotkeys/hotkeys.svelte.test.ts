import { flushSync } from 'svelte';
import { beforeEach, describe, expect, vi } from 'vitest';
import { itWithEffect } from '../../../tests/util.svelte.js';
import { Hotkeys } from './hotkeys.svelte.js';

describe('Hotkeys', () => {
    let hotkeys!: Hotkeys;

    /**
     * Forces the initialization of the Hotkeys instance's reactivity
     */
    function initReactivity() {
        $effect(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            hotkeys.all;
        });
    }

    /**
     * Dispatch keydown event on window
     * @param key
     * @param options
     */
    function keydown(key: string, options: Partial<KeyboardEventInit> = {}) {
        flushSync();
        window.dispatchEvent(
            new KeyboardEvent('keydown', {
                key, //
                bubbles: true,
                cancelable: true,
                ...options
            })
        );
        flushSync();
    }

    /**
     * Dispatch keyup event on window
     * @param key
     * @param options
     */
    function keyup(key: string, options: Partial<KeyboardEventInit> = {}) {
        flushSync();
        window.dispatchEvent(
            new KeyboardEvent('keyup', {
                key, //
                bubbles: true,
                cancelable: true,
                ...options
            })
        );
        flushSync();
    }

    beforeEach(() => {
        hotkeys = new Hotkeys();
    });

    itWithEffect('registers a single key', () => {
        initReactivity();

        keydown('a');
        expect(hotkeys.all).toContain('a');

        keyup('a');
        expect(hotkeys.all).not.toContain('a');
    });

    itWithEffect('keeps only one non-modifier key at a time', () => {
        initReactivity();

        keydown('a');
        keydown('b');

        expect(hotkeys.all).toContain('b');
        expect(hotkeys.all).not.toContain('a');
    });

    itWithEffect('keeps modifiers with a regular key', () => {
        initReactivity();

        keydown('Shift');
        keydown('a');

        expect(hotkeys.all).toEqual(expect.arrayContaining(['shift', 'a']));
    });

    itWithEffect('removes regular keys when a modifier is released', () => {
        initReactivity();

        keydown('Shift');
        keydown('a');
        keyup('Shift');

        expect(hotkeys.all).not.toContain('a');
        expect(hotkeys.all).not.toContain('shift');
    });

    itWithEffect('triggers a callback when a combo is pressed', () => {
        initReactivity();

        const cb = vi.fn();
        hotkeys.on('control+a', cb);

        keydown('Control');
        keydown('a');

        expect(cb).toHaveBeenCalledOnce();
    });

    itWithEffect('does not retrigger the callback while the combo remains active', () => {
        initReactivity();

        const cb = vi.fn();
        hotkeys.on('control+a', cb);

        keydown('Control');
        keydown('a');
        keydown('a', { repeat: true });

        expect(cb).toHaveBeenCalledOnce();
    });

    itWithEffect('re-triggers the callback after the combo is released', () => {
        initReactivity();

        const cb = vi.fn();
        hotkeys.on('control+a', cb);

        keydown('Control');
        keydown('a');
        keyup('a');
        keydown('a');

        expect(cb).toHaveBeenCalledTimes(2);
    });

    itWithEffect('has() returns true when the combo is active', () => {
        initReactivity();

        keydown('Alt');
        keydown('b');

        expect(hotkeys.has('alt+b')).toBe(true);
        expect(hotkeys.has('alt+c')).toBe(false);
    });

    itWithEffect('resets everything on blur', () => {
        initReactivity();

        keydown('a');
        expect(hotkeys.all.length).toBe(1);

        window.dispatchEvent(new Event('blur'));

        expect(hotkeys.all.length).toBe(0);
    });

    itWithEffect('resets when visibility becomes hidden', () => {
        keydown('a');

        Object.defineProperty(document, 'visibilityState', {
            value: 'hidden',
            configurable: true
        });

        document.dispatchEvent(new Event('visibilitychange'));

        expect(hotkeys.all.length).toBe(0);
    });

    itWithEffect('unregisters a binding', () => {
        const cb = vi.fn();
        const off = hotkeys.on('a', cb);
        off();

        keydown('a');
        expect(cb).not.toHaveBeenCalled();
    });

    itWithEffect('normalizes combos correctly', () => {
        initReactivity();

        const cb = vi.fn();
        hotkeys.on('SHIFT + Space', cb);

        keydown('Shift');
        keydown(' ');

        expect(cb).toHaveBeenCalledOnce();
    });
});
