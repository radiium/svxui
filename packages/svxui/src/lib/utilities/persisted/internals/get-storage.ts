import type { PersistedStateType } from '../types.js';

/**
 * Resolve storage web API
 * @param storageType
 * @param window
 * @returns
 */
export function getStorage(storageType: PersistedStateType, window: Window & typeof globalThis): Storage {
    switch (storageType) {
        case 'local':
            return window.localStorage;
        case 'session':
            return window.sessionStorage;
    }
}
