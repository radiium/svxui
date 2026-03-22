import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { getHtmlElement, toHTMLElement } from './elements.js';

describe('getHtmlElement', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = '<span id="target"></span>';
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('returns the element for a matching CSS selector', () => {
        const result = getHtmlElement('#target', container);
        expect(result).toBeInstanceOf(HTMLElement);
    });

    it('returns the element itself when passed an HTMLElement', () => {
        const span = container.querySelector('#target') as HTMLElement;
        expect(getHtmlElement(span)).toBe(span);
    });

    it('returns undefined for an empty string', () => {
        expect(getHtmlElement('')).toBeUndefined();
    });

    it('returns undefined when selector matches nothing', () => {
        expect(getHtmlElement('#nonexistent', container)).toBeUndefined();
    });
});

describe('toHTMLElement', () => {
    it('returns document.documentElement when passed document', () => {
        expect(toHTMLElement(document)).toBe(document.documentElement);
    });

    it('returns the element itself when passed an HTMLElement', () => {
        const div = document.createElement('div');
        expect(toHTMLElement(div)).toBe(div);
    });
});
