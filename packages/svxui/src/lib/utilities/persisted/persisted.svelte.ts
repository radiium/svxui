import { isBrowser } from '$lib/internals/is.js';
import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';
import { getStorage } from './internals/get-storage.js';
import { proxy } from './internals/proxy.js';
import type { PersistedStateOptions, PersistedStateSerializer, PersistedStateType } from './types.js';

/**
 * @description Creates reactive state that is persisted and synchronized across browser sessions and tabs using Web Storage.
 * Credit {@link https://github.com/svecosystem/runed/blob/main/packages/runed/src/lib/utilities/persisted-state/}
 *
 * @param key The unique key used to store the state in the storage.
 * @param initialValue The initial value of the state if not already present in the storage.
 * @param options Configuration options including storage type, serializer for complex data types, and whether to sync state changes across tabs.
 */
export class PersistedState<T> {
    #current: T | undefined;
    #key: string;
    #serializer: PersistedStateSerializer<T>;
    #syncTabs: boolean;
    #connected: boolean;
    #storageType: PersistedStateType;
    #storage?: Storage;
    #subscribe?: VoidFunction;
    #update: VoidFunction | undefined;
    #proxies = new WeakMap();
    #storageCleanup?: VoidFunction;

    /**
     *
     * @param key key to use in storage
     * @param initialValue initial value to use
     * @param options Persisted state options
     * @returns
     */
    constructor(key: string, initialValue?: T, options?: PersistedStateOptions<T>) {
        const {
            storageType = 'local',
            serializer = { serialize: JSON.stringify, deserialize: JSON.parse },
            syncTabs = true,
            connected = true
        } = options ?? {};

        this.#key = key;
        this.#current = initialValue;
        this.#serializer = serializer;
        this.#syncTabs = syncTabs;
        this.#connected = connected;
        this.#storageType = storageType;

        if (!isBrowser()) return;

        const storage = getStorage(storageType, window);
        this.#storage = storage;

        const existingValue = storage.getItem(key);
        if (existingValue !== null) {
            this.#current = this.#deserialize(existingValue);
        } else {
            this.#serialize(initialValue);
        }

        this.#setupStorageListener();
    }

    /**
     * get current state value
     */
    get current(): T {
        this.#subscribe?.();

        let root: T | undefined;
        if (this.#connected) {
            // when we're connected to storage, we use storage as the source of truth
            const storageItem = this.#storage?.getItem(this.#key);
            root = storageItem ? this.#deserialize(storageItem) : this.#current;
        } else {
            // when we're not connected to storage, we use the current value in memory
            root = this.#current;
        }
        return proxy(
            root,
            root,
            this.#proxies,
            this.#subscribe?.bind(this),
            this.#update?.bind(this),
            this.#serialize.bind(this)
        );
    }

    /**
     * Set current state value
     */
    set current(newValue: T) {
        this.#serialize(newValue);
        this.#update?.();
    }

    #handleStorageEvent = (event: StorageEvent): void => {
        if (event.key !== this.#key || event.newValue === null) return;
        this.#current = this.#deserialize(event.newValue);
        this.#update?.();
    };

    /**
     * Deserialize value from storage
     * @param value
     * @returns
     */
    #deserialize = (value: string): T | undefined => {
        try {
            return this.#serializer.deserialize(value);
        } catch (error) {
            console.error(`Error when parsing "${value}" from persisted store "${this.#key}"`, error);
            return;
        }
    };

    /**
     * Serialize value to storage
     * @param value
     * @returns
     */
    #serialize = (value: T | undefined): void => {
        if (!this.#connected) {
            // when we're not connected to storage, we only update the value in memory
            this.#current = value;
            return;
        }

        try {
            if (value !== undefined) {
                this.#storage?.setItem(this.#key, this.#serializer.serialize(value));
            }
        } catch (error) {
            console.error(
                `Error when writing value from persisted store "${this.#key}" to ${this.#storage}`,
                error
            );
        }
    };

    /**
     * Setup sync state to storage listeners
     * @returns
     */
    #setupStorageListener = (): void => {
        if (!window || !this.#connected) return;

        this.#subscribe = createSubscriber((update) => {
            this.#update = update;

            this.#storageCleanup =
                this.#connected && this.#syncTabs && this.#storageType === 'local'
                    ? on(window!, 'storage', this.#handleStorageEvent)
                    : undefined;

            return () => {
                this.#storageCleanup?.();
                this.#storageCleanup = undefined;
                this.#update = undefined;
            };
        });
    };

    /**
     * Clean listeners
     */
    #teardownStorageListener = (): void => {
        this.#storageCleanup?.();
        this.#storageCleanup = undefined;
        this.#subscribe = undefined;
    };

    /**
     * Is sync state storage enabled or not
     */
    get connected(): boolean {
        return this.#connected;
    }

    /**
     * Disconnect sync state to storage
     * @returns
     */
    disconnect = (): void => {
        if (!this.#connected) return;
        // capture current value from storage before removing
        const storageItem = this.#storage?.getItem(this.#key);
        if (storageItem) {
            this.#current = this.#deserialize(storageItem);
        }
        this.#connected = false;
        this.#storage?.removeItem(this.#key);
        this.#teardownStorageListener();
    };

    /**
     * Connect sync state to storage
     * @returns
     */
    connect = (): void => {
        if (this.#connected) return;
        this.#connected = true;
        this.#serialize(this.#current);
        this.#setupStorageListener();
    };
}
