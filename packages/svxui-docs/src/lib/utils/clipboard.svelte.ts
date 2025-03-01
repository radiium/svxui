import { onDestroy } from 'svelte';
import { readonly, writable, type Readable } from 'svelte/store';
import { isBrowser } from 'svxui';

export type ClipBoardProps = {
    /**
     * Time in ms before isCopied
     */
    duration?: number;
};

export class ClipBoard {
    #props: ClipBoardProps | undefined = $state();
    #duration: number = $state(this.#props?.duration ?? 2500);
    #copyTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
    #isSupported = $derived.by(() => navigator && 'clipboard' in navigator);
    #isCopied: boolean = $state(false);

    constructor(props?: ClipBoardProps) {
        this.#props = props;
        onDestroy(this.#cleanup.bind(this));
    }

    get isSupported() {
        return this.#isSupported;
    }

    get isCopied() {
        return this.#isCopied;
    }

    copy(text?: string): void {
        if (text && isBrowser()) {
            navigator.clipboard.writeText(text).then(() => {
                this.#isCopied = true;
                this.#cleanup();
                this.#copyTimeout = setTimeout(() => {
                    this.#isCopied = false;
                }, this.#duration);
            });
        }
    }

    #cleanup() {
        clearTimeout(this.#copyTimeout);
    }
}

export function createCopy(): {
    copied: Readable<boolean>;
    codeString: Readable<string>;
    copyCode: (value?: string) => void;
    setCodeString: (node: HTMLElement) => void;
} {
    let copyTimeout = 0;
    const copied = writable<boolean>(false);
    const codeString = writable<string>('');

    function copyCode(value?: string): void {
        if (value) {
            navigator.clipboard.writeText(value);
            copied.set(true);
            clearTimeout(copyTimeout);
            copyTimeout = window.setTimeout(() => {
                copied.set(false);
            }, 2500);
        }
    }

    function setCodeString(node: HTMLElement) {
        codeString.set(node.innerText.trim() ?? '');
    }

    return {
        copied: readonly(copied),
        codeString: readonly(codeString),
        copyCode,
        setCodeString
    };
}
