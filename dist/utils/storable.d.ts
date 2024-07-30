import { type Writable, type StartStopNotifier } from 'svelte/store';
export declare enum StorableStorageType {
    local = "local",
    session = "session"
}
export interface StorableStorage<T> {
    set<T>(key: string, value: T): void;
    get<T>(key: string): T | null;
    has<T>(key: string): T | boolean;
    remove(key: string): void;
}
export interface Storable<T> extends Writable<T> {
    clearStorage(this: void): void;
}
export interface StorableParams<T> {
    key: string;
    initialValue?: T;
    type?: StorableStorageType;
    start?: StartStopNotifier<T>;
}
/**
 * Create writable store with recording in local or session storage
 *
 * @param params
 * @returns
 */
export declare function storable<T>(params: StorableParams<T>): Storable<T>;
