import { isBrowser } from '$lib/utils/is-browser.js';
import { onDestroy } from 'svelte';
import { MediaQuery } from 'svelte/reactivity';

/**
 * Get prefers-color-scheme
 * Credit: https://github.com/svecosystem/mode-watcher
 */
export class ThemeSystemState {
    #defaultValue = undefined;
    #track = true;
    #current = $state<'light' | 'dark' | undefined>(this.#defaultValue);
    #mediaQueryState: { current: boolean };

    constructor() {
        this.#mediaQueryState =
            isBrowser() && 'matchMedia' in window
                ? new MediaQuery('prefers-color-scheme: light')
                : { current: false };

        onDestroy(
            $effect.root(() => {
                $effect.pre(() => {
                    if (!this.#track) return;
                    this.query();
                });
            })
        );
    }

    get current() {
        return this.#current;
    }

    query(): void {
        if (!isBrowser()) return;
        this.#current = this.#mediaQueryState.current ? 'light' : 'dark';
    }

    tracking(active: boolean): void {
        this.#track = active;
    }
}
