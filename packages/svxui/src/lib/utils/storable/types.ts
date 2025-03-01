export type StorableStateType = 'local' | 'session';

export type StorableStateSerializer<T> = {
    serialize: (value: T) => string;
    deserialize: (value: string) => T | undefined;
};

export type StorableStateOptions<T> = {
    storageType?: StorableStateType;
    serializer?: StorableStateSerializer<T>;
    syncTabs?: boolean;
};
