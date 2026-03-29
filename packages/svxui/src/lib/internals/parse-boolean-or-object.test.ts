import { describe, it, expect } from 'vitest';
import { parseBooleanOrObject } from './parse-boolean-or-object.js';

describe('parseBooleanOrObject', () => {
    it('should return undefined when value is true', () => {
        const result = parseBooleanOrObject(true);
        expect(result).toBeUndefined();
    });

    it('should return undefined when value is false', () => {
        const result = parseBooleanOrObject(false);
        expect(result).toBeUndefined();
    });

    it('should return undefined when value is not provided', () => {
        const result = parseBooleanOrObject();
        expect(result).toBeUndefined();
    });

    it('should return the object when value is an object', () => {
        const obj = { foo: 'bar', baz: 123 };
        const result = parseBooleanOrObject(obj);
        expect(result).toEqual(obj);
        expect(result).toBe(obj); // Same reference
    });

    it('should return the string when value is a string', () => {
        const result = parseBooleanOrObject('test');
        expect(result).toBe('test');
    });

    it('should return the number when value is a number', () => {
        const result = parseBooleanOrObject(42);
        expect(result).toBe(42);
    });

    it('should return the array when value is an array', () => {
        const arr = [1, 2, 3];
        const result = parseBooleanOrObject(arr);
        expect(result).toEqual(arr);
        expect(result).toBe(arr);
    });

    it('should return null when value is null', () => {
        const result = parseBooleanOrObject(null);
        expect(result).toBeNull();
    });

    it('should handle complex nested objects', () => {
        const complexObj = {
            nested: {
                deep: {
                    value: 'test'
                }
            },
            array: [1, 2, 3]
        };
        const result = parseBooleanOrObject(complexObj);
        expect(result).toEqual(complexObj);
    });

    it('should preserve object type', () => {
        type Config = {
            enabled: boolean;
            timeout: number;
        };

        const config: Config = { enabled: true, timeout: 5000 };
        const result = parseBooleanOrObject<Config>(config);

        expect(result).toEqual(config);
        if (result) {
            expect(result.enabled).toBe(true);
            expect(result.timeout).toBe(5000);
        }
    });

    it('should handle functions as value', () => {
        const fn = () => 'test';
        const result = parseBooleanOrObject(fn);
        expect(result).toBe(fn);
        expect(typeof result).toBe('function');
    });
});
