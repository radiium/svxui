import {
    DTS_FOOTER,
    DTS_HEADER,
    PALETTE_HTML,
    buildAccentHtml,
    buildDtsEntryHtml
} from './color-generator-content.js';
import { type RadixPalette } from './radix-palettes';

export type ColorEntry = { id: string; alias: string; palette: RadixPalette };

const ALIAS_NAME_REGEX = /^[a-zA-Z_][a-zA-Z0-9_-]*$/;
const DEFAULT_ENTRIES: ColorEntry[] = [
    { id: '1', alias: 'neutral', palette: 'neutral' },
    { id: '2', alias: 'blue', palette: 'blue' },
    { id: '3', alias: 'green', palette: 'grass' },
    { id: '4', alias: 'yellow', palette: 'amber' },
    { id: '5', alias: 'orange', palette: 'orange' },
    { id: '6', alias: 'red', palette: 'tomato' }
];

const PRE_OPEN =
    `<pre class="shiki shiki-themes light-plus dark-plus"` +
    ` style="background-color:#FFFFFF;--shiki-dark-bg:#1E1E1E;color:#000000;--shiki-dark:#D4D4D4"` +
    ` tabindex="0"><code>`;
const PRE_CLOSE = `</code></pre>`;

export class ColorGeneratorState {
    entries: ColorEntry[] = $state(structuredClone(DEFAULT_ENTRIES));
    #nextId: number = $state(DEFAULT_ENTRIES.length + 1);

    /**
     * Validation
     */

    #isEmpty: boolean = $derived(this.entries.length === 0);
    get isEmpty(): boolean {
        return this.#isEmpty;
    }

    #isValid: boolean = $derived.by(() => !this.#isEmpty && Object.values(this.#errors).every((e) => !e));
    get isValid(): boolean {
        return this.#isValid;
    }

    /** Per-entry validation errors, keyed by entry ID */
    #errors: Record<string, string> = $derived.by(() =>
        this.entries.reduce((errorsMap, entry) => {
            const isEmpty = entry.alias.length === 0;
            const isInvalid = !isEmpty && !ALIAS_NAME_REGEX.test(entry.alias);
            const isDuplicate = !isEmpty && this.entries.filter((e) => e.alias === entry.alias).length > 1;

            let message = '';
            if (isEmpty) {
                message = 'Required';
            } else if (isInvalid) {
                message = 'Invalid CSS identifier';
            } else if (isDuplicate) {
                message = 'Duplicate alias';
            }

            if (message) {
                return { ...errorsMap, [entry.id]: message };
            }

            return errorsMap;
        }, {})
    );
    get errors(): Record<string, string> {
        return this.#errors;
    }

    /**
     * Generated CSS (highlighted HTML)
     */
    get cssHtml(): string {
        if (!this.#isValid) return '';

        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const uniquePalettes = [...new Set(this.entries.map((e) => e.palette))];
        const lines = [
            ...uniquePalettes.map((p) => PALETTE_HTML[p]),
            ...this.entries.map(({ alias, palette }) => buildAccentHtml(alias, palette))
        ].join('\n\n');

        return PRE_OPEN + lines + PRE_CLOSE;
    }

    /**
     * Generated TypeScript declaration (highlighted HTML — for display)
     */
    get dtsHtml(): string {
        if (!this.#isValid) return '';

        const entries = this.entries
            .map(({ alias, palette }) => buildDtsEntryHtml(alias, palette))
            .join('\n');

        return PRE_OPEN + [DTS_HEADER, entries, DTS_FOOTER].join('\n') + PRE_CLOSE;
    }

    add = (): void => {
        this.entries.push({ id: String(this.#nextId++), alias: '', palette: 'blue' });
    };

    remove = (id: string): void => {
        this.entries = this.entries.filter((e) => e.id !== id);
    };

    reset = (): void => {
        this.entries = structuredClone(DEFAULT_ENTRIES);
        this.#nextId = DEFAULT_ENTRIES.length + 1;
    };
}
