import { readonly, writable } from 'svelte/store';

const store = writable(false);

export const isMobileMenuOpen = readonly(store);

export function toggleMenu(): void {
    store.update((value) => !value);
}

export function closeMenu(): void {
    store.set(false);
}

export function handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        closeMenu();
    }
}
