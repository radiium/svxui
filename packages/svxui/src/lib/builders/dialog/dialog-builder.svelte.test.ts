import { describe, expect, vi } from 'vitest';
import { flushSync } from 'svelte';
import { itWithEffect } from '../../../tests/util.svelte.js';
import { DialogBuilder } from './dialog-builder.svelte.js';

describe('DialogBuilder — initial state', () => {
    itWithEffect('starts closed in uncontrolled mode', () => {
        const dialog = new DialogBuilder({});
        expect(dialog.isOpen).toBe(false);
        dialog.destroy();
    });

    itWithEffect('starts closed in controlled mode', () => {
        const opts = { isOpen: false };
        const dialog = new DialogBuilder(opts);
        expect(dialog.isOpen).toBe(false);
        dialog.destroy();
    });

    itWithEffect('starts open when controlled isOpen is true', () => {
        const opts = { isOpen: true };
        const dialog = new DialogBuilder(opts);
        expect(dialog.isOpen).toBe(true);
        dialog.destroy();
    });
});

describe('DialogBuilder — open / close / toggle', () => {
    itWithEffect('open sets isOpen to true', () => {
        const dialog = new DialogBuilder({});
        dialog.open();
        expect(dialog.isOpen).toBe(true);
        dialog.destroy();
    });

    itWithEffect('close sets isOpen to false', () => {
        const dialog = new DialogBuilder({});
        dialog.open();
        dialog.close();
        expect(dialog.isOpen).toBe(false);
        dialog.destroy();
    });

    itWithEffect('close is a no-op when already closed', () => {
        const dialog = new DialogBuilder({});
        dialog.close();
        expect(dialog.isOpen).toBe(false);
        dialog.destroy();
    });

    itWithEffect('toggle opens when closed', () => {
        const dialog = new DialogBuilder({});
        dialog.toggle();
        expect(dialog.isOpen).toBe(true);
        dialog.destroy();
    });

    itWithEffect('toggle closes when open', () => {
        const dialog = new DialogBuilder({});
        dialog.open();
        dialog.toggle();
        expect(dialog.isOpen).toBe(false);
        dialog.destroy();
    });
});

describe('DialogBuilder — controlled mode', () => {
    itWithEffect('open mutates the options object', () => {
        const opts = { isOpen: false };
        const dialog = new DialogBuilder(opts);
        dialog.open();
        expect(opts.isOpen).toBe(true);
        dialog.destroy();
    });

    itWithEffect('close mutates the options object', () => {
        const opts = { isOpen: true };
        const dialog = new DialogBuilder(opts);
        dialog.close();
        expect(opts.isOpen).toBe(false);
        dialog.destroy();
    });
});

describe('DialogBuilder — onClose callback', () => {
    itWithEffect('onClose is called with no reason on plain close', () => {
        const onClose = vi.fn();
        const dialog = new DialogBuilder({ onClose });
        flushSync(() => dialog.open());
        flushSync(() => dialog.close());
        expect(onClose).toHaveBeenCalledWith(undefined);
        dialog.destroy();
    });

    itWithEffect('onClose is called with escape reason', () => {
        const onClose = vi.fn();
        const dialog = new DialogBuilder({ onClose });
        flushSync(() => dialog.open());
        flushSync(() => dialog.close('escape'));
        expect(onClose).toHaveBeenCalledWith('escape');
        dialog.destroy();
    });

    itWithEffect('onClose is called with backdrop reason', () => {
        const onClose = vi.fn();
        const dialog = new DialogBuilder({ onClose });
        flushSync(() => dialog.open());
        flushSync(() => dialog.close('backdrop'));
        expect(onClose).toHaveBeenCalledWith('backdrop');
        dialog.destroy();
    });
});

describe('DialogBuilder — attrs', () => {
    itWithEffect('backdropAttrs data-state reflects isOpen', () => {
        const dialog = new DialogBuilder({});
        expect(dialog.backdropAttrs['data-state']).toBe('closed');
        dialog.open();
        expect(dialog.backdropAttrs['data-state']).toBe('open');
        dialog.destroy();
    });

    itWithEffect('contentAttrs has role dialog and aria-modal', () => {
        const dialog = new DialogBuilder({});
        expect(dialog.contentAttrs.role).toBe('dialog');
        expect(dialog.contentAttrs['aria-modal']).toBe(true);
        dialog.destroy();
    });

    itWithEffect('contentAttrs data-state reflects isOpen', () => {
        const dialog = new DialogBuilder({});
        expect(dialog.contentAttrs['data-state']).toBe('closed');
        dialog.open();
        expect(dialog.contentAttrs['data-state']).toBe('open');
        dialog.destroy();
    });
});
