import { readonly, writable, type Readable } from 'svelte/store';

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
