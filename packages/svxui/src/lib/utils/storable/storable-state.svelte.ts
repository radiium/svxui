import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';
import { isBrowser } from '../is-browser.js';
import type { StorableStateOptions, StorableStateSerializer, StorableStateType } from './types.js';

function getStorage(storageType: StorableStateType, window: Window & typeof globalThis): Storage {
    switch (storageType) {
        case 'local':
            return window.localStorage;
        case 'session':
            return window.sessionStorage;
    }
}

/**
 * Creates reactive state that is persisted and synchronized across browser sessions and tabs using Web Storage.
 * Credit: https://github.com/svecosystem/runed
 */
export class StorableState<T> {
    #current: T | undefined;
    #key: string;
    #serializer: StorableStateSerializer<T>;
    #storage?: Storage;
    #subscribe?: VoidFunction;
    #version = $state(0);

    constructor(key: string, initialValue?: T, options?: StorableStateOptions<T>) {
        const {
            storageType = 'local',
            serializer = { serialize: JSON.stringify, deserialize: JSON.parse },
            syncTabs = true
        } = options ?? {};

        this.#current = initialValue;
        this.#key = key;
        this.#serializer = serializer;

        if (!isBrowser()) return;

        const storage = getStorage(storageType, window);
        this.#storage = storage;

        const existingValue = storage.getItem(key);

        if (existingValue !== null) {
            this.#current = this.#deserialize(existingValue);
        } else {
            this.#serialize(initialValue);
        }

        if (syncTabs && storageType === 'local') {
            this.#subscribe = createSubscriber(() => {
                return on(window, 'storage', this.#handleStorageEvent);
            });
        }
    }

    get current(): T {
        this.#subscribe?.();
        this.#version;
        const root = this.#deserialize(this.#storage?.getItem(this.#key) as string) ?? this.#current;
        const proxies = new WeakMap();
        const proxy = (value: unknown) => {
            if (value === null || value?.constructor.name === 'Date' || typeof value !== 'object') {
                return value;
            }
            let p = proxies.get(value);
            if (!p) {
                p = new Proxy(value, {
                    get: (target, property) => {
                        this.#version;
                        return proxy(Reflect.get(target, property));
                    },
                    set: (target, property, value) => {
                        this.#version += 1;
                        Reflect.set(target, property, value);
                        this.#serialize(root);
                        return true;
                    }
                });
                proxies.set(value, p);
            }
            return p;
        };
        return proxy(root);
    }

    set current(newValue: T) {
        this.#serialize(newValue);
        this.#version += 1;
    }

    #handleStorageEvent = (event: StorageEvent): void => {
        if (event.key !== this.#key || event.newValue === null || event.newValue === event.oldValue) return;
        this.#current = this.#deserialize(event.newValue);
        this.#version += 1;
    };

    #deserialize(value: string): T | undefined {
        try {
            return typeof value === 'string' || value === undefined
                ? (value as T)
                : this.#serializer.deserialize(value);
        } catch (error) {
            console.error(`Error when parsing "${value}" from persisted store "${this.#key}"`, error);
            return;
        }
    }

    #serialize(value: T | undefined): void {
        try {
            if (value != undefined) {
                const serialized = typeof value === 'string' ? value : this.#serializer.serialize(value);
                this.#storage?.setItem(this.#key, serialized);
            }
        } catch (error) {
            console.error(
                `Error when writing value from persisted store "${this.#key}" to ${this.#storage}`,
                error
            );
        }
    }
}
