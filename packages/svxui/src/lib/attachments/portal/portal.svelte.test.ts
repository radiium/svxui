import { beforeEach, describe, expect, it } from 'vitest';
import { portal } from './portal.svelte.ts';
import { ROOT_SELECTOR } from '$lib/internals/root-selector.js';

describe('portal attachment', () => {
    let node: HTMLElement;
    let host: HTMLElement;
    let target: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = '';

        host = document.createElement('div');
        host.id = 'host';
        host.classList.add('svxui');
        host.setAttribute('data-theme-root', '');

        node = document.createElement('div');
        node.id = 'node';

        target = document.createElement('div');
        target.id = 'target';

        host.appendChild(node);
        document.body.appendChild(host);
        document.body.appendChild(target);
    });

    it('moves the node to root selector by default', () => {
        const attachment = portal();
        const cleanup = attachment(node);

        expect(node.parentElement).toBe(document.body.querySelector(ROOT_SELECTOR));

        cleanup?.();
    });

    it('moves the node to an HTMLElement target', () => {
        const attachment = portal({ target });
        const cleanup = attachment(node);

        expect(node.parentElement).toBe(target);

        cleanup?.();
    });

    it('moves the node to a CSS selector target', () => {
        const attachment = portal({ target: '#target' });
        const cleanup = attachment(node);

        expect(node.parentElement).toBe(target);

        cleanup?.();
    });

    it('does not move the node when enabled is false', () => {
        const attachment = portal({ enabled: false });
        const cleanup = attachment(node);

        expect(node.parentElement).toBe(host);

        cleanup?.();
    });

    it('restores the node to its original parent on cleanup', () => {
        const attachment = portal({ target });
        const cleanup = attachment(node);

        expect(node.parentElement).toBe(target);

        cleanup?.();

        expect(node.parentElement).toBe(host);
    });

    it('preserves sibling order when restoring the node', () => {
        const sibling = document.createElement('span');
        sibling.id = 'sibling';
        host.appendChild(sibling);

        const attachment = portal({ target });
        const cleanup = attachment(node);

        cleanup?.();

        expect(host.children[0]).toBe(node);
        expect(host.children[1]).toBe(sibling);
    });

    it('throws an error when the CSS selector target is not found', () => {
        const attachment = portal({ target: '#does-not-exist' });

        expect(() => attachment(node)).toThrowError(
            'No element found matching css selector: "#does-not-exist"'
        );
    });

    it('throws a TypeError when the target type is invalid', () => {
        // @ts-expect-error runtime invalid target
        const attachment = portal({ target: 123 });

        expect(() => attachment(node)).toThrow(TypeError);
    });
});
