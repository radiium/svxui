import type { PersistedStateType } from '../types.js';

/**
 * Resolve storage web API
 * @param storageType The storage backend to use (`'local'` or `'session'`)
 * @param window The window object, used to access `localStorage`/`sessionStorage`
 * @returns The corresponding `Storage` instance
 */
export function getStorage(storageType: PersistedStateType, window: Window & typeof globalThis): Storage {
    switch (storageType) {
        case 'local':
            return window.localStorage;
        case 'session':
            return window.sessionStorage;
    }
}
