import { writable } from 'svelte/store';
import { isBrowser } from './is-browser.js';
export var StorableStorageType;
(function (StorableStorageType) {
    StorableStorageType["local"] = "local";
    StorableStorageType["session"] = "session";
})(StorableStorageType || (StorableStorageType = {}));
function noop(...args) { }
const noopStorage = {
    length: 0,
    setItem: noop,
    getItem: noop,
    has: noop,
    removeItem: noop,
    clear: noop,
    key: noop
};
/**
 * Create local or session storage object
 *
 * @param type
 * @returns
 */
function createStorage(type = StorableStorageType.local) {
    let storage;
    if (isBrowser()) {
        storage = type === StorableStorageType.local ? localStorage : sessionStorage;
    }
    else {
        storage = noopStorage;
    }
    return {
        set(key, value) {
            const json = JSON.stringify(value);
            storage.setItem(key, json);
        },
        get(key) {
            const json = storage.getItem(key);
            return json ? JSON.parse(json) : null;
        },
        has(key) {
            return storage.getItem(key) !== null ? true : false;
        },
        remove(key) {
            storage.removeItem(key);
        }
    };
}
/**
 * Create writable store with recording in local or session storage
 *
 * @param params
 * @returns
 */
export function storable(params) {
    // Destructuring params
    const { key, initialValue, type, start = noop } = params;
    // Init storage
    const storage = createStorage(type);
    // Init store
    const store = writable(initialValue, (set, update) => {
        // Restore state
        const value = storage.get(key);
        if (value) {
            set(value);
        }
        else if (initialValue) {
            storage.set(key, initialValue);
        }
        // Sync storage from others tabs
        function onStorageChange(event) {
            if (event.key === key) {
                set(event.newValue ? JSON.parse(event.newValue) : null);
            }
        }
        if (isBrowser()) {
            window.addEventListener('storage', onStorageChange);
        }
        const stop = start && start(set, update);
        return () => {
            if (isBrowser()) {
                window?.removeEventListener('storage', onStorageChange);
            }
            stop && stop();
        };
    });
    return {
        ...store,
        set(value) {
            store.set(value);
            storage.set(key, value);
        },
        update(callback) {
            store.update((last) => {
                const value = callback(last);
                storage.set(key, value);
                return value;
            });
        },
        clearStorage() {
            storage.remove(key);
        }
    };
}
