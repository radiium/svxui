import { writable, type StartStopNotifier, type Updater, type Writable } from 'svelte/store';
import { isBrowser } from './is-browser.js';

export enum StorableStorageType {
    local = 'local',
    session = 'session'
}
export type StorableStorage<_T> = {
    set<T>(key: string, value: T): void;
    get<T>(key: string): T | null;
    has<T>(key: string): T | boolean;
    remove(key: string): void;
};

export type Storable<T> = Writable<T> & {
    clearStorage(this: void): void;
};

export type StorableParams<T> = {
    key: string;
    initialValue?: T;
    type?: StorableStorageType;
    start?: StartStopNotifier<T>;
};

/**
 * Create local or session storage object
 *
 * @param type
 * @returns
 */
function createStorage<T>(type: StorableStorageType = StorableStorageType.local): StorableStorage<T> {
    let storage: Storage | undefined = undefined;
    if (isBrowser()) {
        storage = type === StorableStorageType.local ? localStorage : sessionStorage;
    }

    return {
        set<T>(key: string, value: T): void {
            const json = JSON.stringify(value);
            storage?.setItem(key, json);
        },
        get<T>(key: string): T | null {
            const json = storage?.getItem(key);
            return json ? JSON.parse(json) : null;
        },
        has<T>(key: string): T | boolean {
            return storage?.getItem(key) !== null ? true : false;
        },
        remove(key: string): void {
            storage?.removeItem(key);
        }
    };
}

/**
 * Create writable store with recording in local or session storage
 *
 * @param params
 * @returns
 */
export function storable<T>(params: StorableParams<T>): Storable<T> {
    // Destructuring params
    const { key, initialValue, type, start } = params;

    // Init storage
    const storage = createStorage(type);

    // Init store
    const store = writable<T>(initialValue, (set, update) => {
        // Restore state
        const value = storage.get<T>(key);
        if (value) {
            set(value);
        } else if (initialValue) {
            storage.set<T>(key, initialValue);
        }

        // Sync storage from others tabs
        function onStorageChange(event: StorageEvent) {
            if (event.key === key) {
                set(event.newValue ? JSON.parse(event.newValue) : null);
            }
        }

        if (isBrowser()) {
            window.addEventListener('storage', onStorageChange);
        }
        const stop = start?.(set, update);

        return () => {
            if (isBrowser()) {
                window?.removeEventListener('storage', onStorageChange);
            }
            stop?.();
        };
    });

    return {
        ...store,
        set(value: T): void {
            store.set(value);
            storage.set(key, value);
        },
        update(callback: Updater<T>): void {
            store.update((last: T) => {
                const value = callback(last);
                storage.set(key, value);
                return value;
            });
        },
        clearStorage(): void {
            storage.remove(key);
        }
    };
}
