import { describe, it, expect } from 'vitest';
import { styleObjectToString } from './style-object-to-string.js';

describe('styleObjectToString', () => {
    it('converts a single style entry to a string', () => {
        const style = {
            color: 'red'
        };

        const result = styleObjectToString(style);

        expect(result).toBe('color: red;');
    });

    it('converts multiple style entries to a semicolon-separated string', () => {
        const style = {
            color: 'red',
            background: 'blue',
            display: 'block'
        };

        const result = styleObjectToString(style);

        expect(result).toBe('color: red;background: blue;display: block;');
    });

    it('keeps the object key order', () => {
        const style = {
            'z-index': '10',
            position: 'absolute',
            top: '0'
        };

        const result = styleObjectToString(style);

        expect(result).toBe('z-index: 10;position: absolute;top: 0;');
    });

    it('includes undefined values as "undefined"', () => {
        const style = {
            color: undefined,
            background: null,
            height: '',
            display: 'block'
        };

        const result = styleObjectToString(style);

        expect(result).toBe('display: block;');
    });

    it('returns an empty string for an empty object', () => {
        const result = styleObjectToString({});

        expect(result).toBe('');
    });
});
