import { describe, expect, it } from 'vitest';
import { isBrowser, isHtmlElement, isNil, isObject } from './is.js';

describe('isBrowser', () => {
    it('returns true in browser', () => {
        expect(isBrowser()).toBe(true);
    });
});

describe('isObject', () => {
    it('returns true for plain objects', () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ a: 1 })).toBe(true);
    });

    it('returns true for arrays', () => {
        expect(isObject([])).toBe(true);
    });

    it('returns false for null', () => {
        expect(isObject(null)).toBe(false);
    });

    it('returns false for primitives', () => {
        expect(isObject(42)).toBe(false);
        expect(isObject('str')).toBe(false);
        expect(isObject(undefined)).toBe(false);
    });
});

describe('isHtmlElement', () => {
    it('returns true for an HTMLElement', () => {
        const div = document.createElement('div');
        expect(isHtmlElement(div)).toBe(true);
    });

    it('returns false for a plain object', () => {
        expect(isHtmlElement({})).toBe(false);
    });

    it('returns false for null', () => {
        expect(isHtmlElement(null)).toBe(false);
    });

    it('returns false for a string', () => {
        expect(isHtmlElement('div')).toBe(false);
    });
});

describe('isNil', () => {
    it('returns true for null', () => {
        expect(isNil(null)).toBe(true);
    });

    it('returns true for undefined', () => {
        expect(isNil(undefined)).toBe(true);
    });

    it('returns false for falsy non-nil values', () => {
        expect(isNil(0)).toBe(false);
        expect(isNil('')).toBe(false);
        expect(isNil(false)).toBe(false);
    });

    it('returns false for truthy values', () => {
        expect(isNil(1)).toBe(false);
        expect(isNil('text')).toBe(false);
        expect(isNil({})).toBe(false);
    });
});
