import { flushSync } from 'svelte';
import { beforeEach, describe, expect, vi } from 'vitest';
import { itWithEffect } from '../../../test/util.svelte.js';
import { PersistedState } from './persisted-state.svelte.js';

const key = 'test-key';
const initialValue = 'test-value';
const existingValue = 'test-existing-value';
const newValue = 'test-new-value';

vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    console.log('args:', args);
    const m = `console.error was called with args ${args.concat(', ')}`;
    console.log(m);
    throw new Error(m);
});

describe('PersistedState', async () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    itWithEffect('is reactive', () => {
        const values: string[] = [];
        const persistedState = new PersistedState(key, initialValue);
        $effect(() => {
            values.push(persistedState.current);
        });
        flushSync();
        expect(values).toStrictEqual([initialValue]);
        flushSync(() => {
            persistedState.current = newValue;
        });
        expect(values).toStrictEqual([initialValue, newValue]);
    });

    itWithEffect('is reactive when using session storage', () => {
        const values: string[] = [];
        const persistedState = new PersistedState(key, initialValue, { storageType: 'session' });
        $effect(() => {
            values.push(persistedState.current);
        });
        flushSync();
        expect(values).toStrictEqual([initialValue]);
        flushSync(() => {
            persistedState.current = newValue;
        });
        expect(values).toStrictEqual([initialValue, newValue]);
    });

    itWithEffect("is reactive when it's an object", () => {
        const values: { value: string }[] = [];
        const valuesOnly: string[] = [];
        const persistedState = new PersistedState(key, { value: initialValue });
        $effect(() => {
            values.push(persistedState.current);
        });
        $effect(() => {
            valuesOnly.push(persistedState.current.value);
        });
        flushSync();
        expect(values).toStrictEqual([{ value: initialValue }]);
        expect(valuesOnly).toStrictEqual([initialValue]);
        flushSync(() => {
            persistedState.current.value = newValue;
        });
        expect(values).toStrictEqual([{ value: initialValue }, { value: newValue }]);
        expect(valuesOnly).toStrictEqual([initialValue, newValue]);
    });

    itWithEffect("is reactive when it's an array", () => {
        const values: string[][] = [];
        const valuesOnly: string[] = [];
        const persistedState = new PersistedState(key, [initialValue]);
        $effect(() => {
            values.push(persistedState.current);
        });
        $effect(() => {
            valuesOnly.push(persistedState.current.at(-1)!);
        });
        flushSync();
        expect(values).toStrictEqual([[initialValue]]);
        expect(valuesOnly).toStrictEqual([initialValue]);
        flushSync(() => {
            persistedState.current.push(newValue);
        });
        expect(values).toStrictEqual([[initialValue], [initialValue, newValue]]);
        expect(valuesOnly).toStrictEqual([initialValue, newValue]);
    });

    describe('localStorage', () => {
        itWithEffect('uses initial value if no persisted value is found', () => {
            const persistedState = new PersistedState(key, initialValue);
            expect(persistedState.current).toBe(initialValue);
        });

        itWithEffect('uses persisted value if it is found', () => {
            localStorage.setItem(key, JSON.stringify(existingValue));
            const persistedState = new PersistedState(key, initialValue);
            expect(persistedState.current).toBe(existingValue);
        });

        itWithEffect('updates localStorage when current value changes', () => {
            const persistedState = new PersistedState(key, initialValue);
            expect(persistedState.current).toBe(initialValue);

            persistedState.current = newValue;
            expect(persistedState.current).toBe(newValue);
            expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue));
        });

        itWithEffect('updates localStorage when a nested property in current value changes', () => {
            const propValue = 'test';
            const initialValue = { prop: { nested: propValue } };
            const newPropValue = 'new test';
            const newValue = { prop: { nested: newPropValue } };
            const persistedState = new PersistedState(key, initialValue);
            expect(persistedState.current).toEqual(initialValue);

            persistedState.current.prop.nested = newPropValue;
            expect(persistedState.current).toEqual(newValue);
            expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue));
        });

        itWithEffect('updates current value when localStorage changes', () => {
            const propValue = 'test';
            const initialValue = { prop: { nested: propValue } };
            const newPropValue = 'new test';
            const newValue = { prop: { nested: newPropValue } };
            const persistedState = new PersistedState(key, initialValue);
            expect(persistedState.current).toEqual(initialValue);
            localStorage.setItem(key, JSON.stringify(newValue));
            expect(persistedState.current).toEqual(newValue);
        });
    });

    describe('sessionStorage', () => {
        itWithEffect('uses initial value if no persisted value is found', () => {
            const persistedState = new PersistedState(key, initialValue, {
                storageType: 'session'
            });
            expect(persistedState.current).toBe(initialValue);
        });

        itWithEffect('uses persisted value if it is found', () => {
            sessionStorage.setItem(key, JSON.stringify(existingValue));
            const persistedState = new PersistedState(key, initialValue, {
                storageType: 'session'
            });
            expect(persistedState.current).toBe(existingValue);
        });

        itWithEffect('updates sessionStorage when current value changes', () => {
            const persistedState = new PersistedState(key, initialValue, {
                storageType: 'session'
            });
            expect(persistedState.current).toBe(initialValue);

            persistedState.current = newValue;
            expect(persistedState.current).toBe(newValue);
            expect(sessionStorage.getItem(key)).toBe(JSON.stringify(newValue));
        });
    });

    describe('serializer', () => {
        itWithEffect('uses provided serializer', () => {
            const iso2024JanFirst = '2024-01-01T00:00:00.000Z';
            const date2024JanFirst = new Date(iso2024JanFirst);
            localStorage.setItem(key, iso2024JanFirst);
            const serializer = {
                serialize: (value: Date) => value.toISOString(),
                deserialize: (value: string) => new Date(value)
            };
            const persistedState = new PersistedState(key, new Date(), {
                serializer
            });
            expect(persistedState.current).toEqual(date2024JanFirst);

            const iso2024FebFirst = '2024-02-01T00:00:00.000Z';
            const date2024FebFirst = new Date(iso2024FebFirst);
            persistedState.current = date2024FebFirst;
            expect(persistedState.current).toEqual(date2024FebFirst);
            expect(localStorage.getItem(key)).toBe(iso2024FebFirst);
        });

        itWithEffect('can serialize complex objects (Set)', () => {
            const initialSet = new Set([1, 2, 3]);
            const serializer = {
                serialize: (value: Set<number>) => JSON.stringify(Array.from(value)),
                deserialize: (value: string) => new Set<number>(JSON.parse(value))
            };
            const persistedState = new PersistedState(key, initialSet, {
                serializer
            });
            expect(persistedState.current).toEqual(initialSet);
            const newSet = new Set([4, 5, 6]);
            persistedState.current = newSet;
            expect(persistedState.current).toEqual(newSet);
            expect(localStorage.getItem(key)).toBe(serializer.serialize(newSet));
        });
    });

    describe('syncTabs', () => {
        itWithEffect('updates persisted value when local storage changes independently', () => {
            const persistedState = new PersistedState(key, initialValue);
            expect(persistedState.current).toBe(initialValue);

            localStorage.setItem(key, JSON.stringify(newValue));
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key,
                    oldValue: null,
                    newValue: JSON.stringify(newValue)
                })
            );
            expect(persistedState.current).toBe(newValue);
        });

        itWithEffect(
            'does not update persisted value when local storage changes independently if syncTabs is false',
            async () => {
                const persistedState = new PersistedState(key, initialValue, {
                    syncTabs: false
                });

                expect(persistedState.current).toBe(initialValue);

                window.dispatchEvent(
                    new StorageEvent('storage', {
                        key,
                        oldValue: JSON.stringify(initialValue),
                        newValue: JSON.stringify(newValue),
                        storageArea: localStorage,
                        url: 'http://localhost'
                    })
                );

                expect(persistedState.current).toBe(initialValue);
            }
        );

        itWithEffect("does not handle the storage event when 'session' storage is used", () => {
            const persistedState = new PersistedState(key, initialValue, {
                storageType: 'session'
            });
            expect(persistedState.current).toBe(initialValue);

            window.dispatchEvent(
                new StorageEvent('storage', {
                    key,
                    oldValue: JSON.stringify(initialValue),
                    newValue: JSON.stringify(newValue),
                    storageArea: localStorage,
                    url: 'http://localhost'
                })
            );
            expect(persistedState.current).toBe(initialValue);
        });
    });

    itWithEffect('makes plain objects reactive', () => {
        const initialValue = { prop: 'value' };
        const persistedState = new PersistedState(key, initialValue);
        expect(persistedState.current).toEqual(initialValue);

        persistedState.current.prop = 'new value';
        expect(persistedState.current.prop).toBe('new value');
        expect(localStorage.getItem(key)).toBe(JSON.stringify({ prop: 'new value' }));
    });

    itWithEffect('makes plain sub-objects reactive', () => {
        const initialValue = {
            foo: {
                prop: 303
            }
        };
        const persistedState = new PersistedState(key, initialValue);
        expect(persistedState.current).toEqual(initialValue);

        persistedState.current.foo.prop = 808;
        expect(persistedState.current.foo.prop).toBe(808);
        expect(localStorage.getItem(key)).toBe(JSON.stringify({ foo: { prop: 808 } }));
    });

    itWithEffect('does not make complex sub-objects reactive', () => {
        const testClass = class {
            prop = 303;
        };
        const initialValue = {
            foo: new testClass()
        };
        const serializer = {
            serialize: (value: typeof initialValue) => {
                const toSerialize = {
                    foo: {
                        prop: value.foo.prop
                    }
                };
                return JSON.stringify(toSerialize);
            },
            deserialize: (value: string) => {
                const parsed = JSON.parse(value);
                const result = {
                    foo: new testClass()
                };
                result.foo.prop = parsed.foo.prop;
                return result;
            }
        };
        const persistedState = new PersistedState(key, initialValue, {
            serializer
        });
        expect(persistedState.current).toEqual(initialValue);

        persistedState.current.foo.prop = 808;
        expect(persistedState.current.foo.prop).toBe(303);
        expect(localStorage.getItem(key)).toBe(JSON.stringify({ foo: { prop: 303 } }));
    });

    describe('null handling', () => {
        itWithEffect('allows null as a valid value', () => {
            const persistedState = new PersistedState<string | null>(key, initialValue);
            persistedState.current = null;
            expect(persistedState.current).toBe(null);
            expect(localStorage.getItem(key)).toBe(JSON.stringify(null));
        });

        itWithEffect('can retrieve null from localStorage', () => {
            localStorage.setItem(key, JSON.stringify(null));
            const persistedState = new PersistedState<string | null>(key, initialValue);
            expect(persistedState.current).toBe(null);
        });

        itWithEffect('can set null then set a new value', () => {
            const persistedState = new PersistedState<string | null>(key, initialValue);
            persistedState.current = null;
            expect(persistedState.current).toBe(null);

            persistedState.current = newValue;
            expect(persistedState.current).toBe(newValue);
            expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue));
        });

        itWithEffect('triggers reactivity when set to null', () => {
            const values: (string | null)[] = [];
            const persistedState = new PersistedState<string | null>(key, initialValue);
            $effect(() => {
                values.push(persistedState.current);
            });
            flushSync();
            expect(values).toStrictEqual([initialValue]);

            flushSync(() => {
                persistedState.current = null;
            });
            expect(values).toStrictEqual([initialValue, null]);
        });
    });

    describe('disconnect/connect', () => {
        itWithEffect('disconnect prevents storage updates', () => {
            const persistedState = new PersistedState(key, initialValue);
            expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue));

            persistedState.disconnect();
            expect(localStorage.getItem(key)).toBeNull();

            persistedState.current = newValue;
            expect(persistedState.current).toBe(newValue);
            expect(localStorage.getItem(key)).toBeNull();
        });

        itWithEffect('connect re-enables storage updates', () => {
            const persistedState = new PersistedState(key, initialValue);
            persistedState.disconnect();

            persistedState.current = newValue;
            expect(localStorage.getItem(key)).toBeNull();

            persistedState.connect();
            expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue));
        });

        itWithEffect('connected getter returns correct state', () => {
            const persistedState = new PersistedState(key, initialValue);
            expect(persistedState.connected).toBe(true);

            persistedState.disconnect();
            expect(persistedState.connected).toBe(false);

            persistedState.connect();
            expect(persistedState.connected).toBe(true);
        });

        itWithEffect('disconnect stops cross-tab sync', () => {
            const persistedState = new PersistedState(key, initialValue);
            expect(persistedState.current).toBe(initialValue);

            persistedState.disconnect();

            localStorage.setItem(key, JSON.stringify(newValue));
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key,
                    oldValue: null,
                    newValue: JSON.stringify(newValue)
                })
            );

            expect(persistedState.current).toBe(initialValue);
        });

        itWithEffect('connect re-enables cross-tab sync', () => {
            const persistedState = new PersistedState(key, initialValue);
            persistedState.disconnect();
            persistedState.connect();

            localStorage.setItem(key, JSON.stringify(newValue));
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key,
                    oldValue: null,
                    newValue: JSON.stringify(newValue)
                })
            );

            expect(persistedState.current).toBe(newValue);
        });

        itWithEffect('can start disconnected via option', () => {
            const persistedState = new PersistedState(key, initialValue, {
                connected: false
            });
            expect(persistedState.connected).toBe(false);
            expect(localStorage.getItem(key)).toBeNull();

            persistedState.current = newValue;
            expect(localStorage.getItem(key)).toBeNull();
        });

        itWithEffect('works with sessionStorage', () => {
            const persistedState = new PersistedState(key, initialValue, {
                storageType: 'session'
            });
            expect(sessionStorage.getItem(key)).toBe(JSON.stringify(initialValue));

            persistedState.disconnect();
            expect(sessionStorage.getItem(key)).toBeNull();

            persistedState.current = newValue;
            expect(sessionStorage.getItem(key)).toBeNull();

            persistedState.connect();
            expect(sessionStorage.getItem(key)).toBe(JSON.stringify(newValue));
        });

        itWithEffect('disconnect is idempotent', () => {
            const persistedState = new PersistedState(key, initialValue);
            persistedState.disconnect();
            persistedState.disconnect();
            expect(persistedState.connected).toBe(false);
        });

        itWithEffect('connect is idempotent', () => {
            const persistedState = new PersistedState(key, initialValue);
            persistedState.connect();
            persistedState.connect();
            expect(persistedState.connected).toBe(true);
        });

        itWithEffect('value persists through disconnect/connect cycle', () => {
            const persistedState = new PersistedState(key, initialValue);
            persistedState.current = newValue;

            persistedState.disconnect();
            expect(persistedState.current).toBe(newValue);

            persistedState.connect();
            expect(persistedState.current).toBe(newValue);
            expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue));
        });
    });
});
