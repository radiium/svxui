export type PersistedStateType = 'local' | 'session';

export type PersistedStateSerializer<T> = {
    serialize: (value: T) => string;
    deserialize: (value: string) => T | undefined;
};

export type PersistedStateOptions<T> = {
    /**
     * The storage type to use.
     * @default "local"
     */
    storageType?: PersistedStateType;
    /**
     * The serializer to use.
     * @default { serialize: JSON.stringify, deserialize: JSON.parse }
     */
    serializer?: PersistedStateSerializer<T>;
    /**
     * Whether to sync with the state changes from other tabs.
     * @default true
     */
    syncTabs?: boolean;
    /**
     * Whether to connect to storage on initialization, which means that updates to the state will
     * be persisted to storage and reads from the state will be read from storage.
     *
     * When `connected` is `false`, the state is not connected to storage and any changes to the state will
     * not be persisted to storage and any changes to storage will not be reflected in the state until
     * `.connect()` is called.
     *
     * @default true
     */
    connected?: boolean;
};
