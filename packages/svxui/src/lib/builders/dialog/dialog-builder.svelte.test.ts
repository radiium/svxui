import { flushSync } from 'svelte';
import { describe, expect, vi } from 'vitest';
import { itWithEffect } from '../../../tests/util.svelte.js';
import { DialogBuilder } from './dialog-builder.svelte.js';

describe('DialogBuilder — initial state', () => {
    itWithEffect('starts closed in uncontrolled mode', () => {
        const dialog = new DialogBuilder({});
        expect(dialog.open).toBe(false);
        dialog.destroy();
    });

    itWithEffect('starts closed in controlled mode', () => {
        const opts = { open: false };
        const dialog = new DialogBuilder(opts);
        expect(dialog.open).toBe(false);
        dialog.destroy();
    });

    itWithEffect('starts open when controlled open is true', () => {
        const opts = { open: true };
        const dialog = new DialogBuilder(opts);
        expect(dialog.open).toBe(true);
        dialog.destroy();
    });
});

describe('DialogBuilder — open / close / toggle', () => {
    itWithEffect('open sets open to true', () => {
        const dialog = new DialogBuilder({});
        dialog.openDialog();
        expect(dialog.open).toBe(true);
        dialog.destroy();
    });

    itWithEffect('close sets open to false', () => {
        const dialog = new DialogBuilder({});
        dialog.openDialog();
        dialog.closeDialog();
        expect(dialog.open).toBe(false);
        dialog.destroy();
    });

    itWithEffect('close is a no-op when already closed', () => {
        const dialog = new DialogBuilder({});
        dialog.closeDialog();
        expect(dialog.open).toBe(false);
        dialog.destroy();
    });

    itWithEffect('toggle opens when closed', () => {
        const dialog = new DialogBuilder({});
        dialog.toggleDialog();
        expect(dialog.open).toBe(true);
        dialog.destroy();
    });

    itWithEffect('toggle closes when open', () => {
        const dialog = new DialogBuilder({});
        dialog.openDialog();
        dialog.toggleDialog();
        expect(dialog.open).toBe(false);
        dialog.destroy();
    });
});

describe('DialogBuilder — controlled mode', () => {
    itWithEffect('open mutates the options object', () => {
        const opts = { open: false };
        const dialog = new DialogBuilder(opts);
        dialog.openDialog();
        expect(opts.open).toBe(true);
        dialog.destroy();
    });

    itWithEffect('close mutates the options object', () => {
        const opts = { open: true };
        const dialog = new DialogBuilder(opts);
        dialog.closeDialog();
        expect(opts.open).toBe(false);
        dialog.destroy();
    });
});

describe('DialogBuilder — onClose callback', () => {
    itWithEffect('onClose is called with no reason on plain close', () => {
        const onClose = vi.fn();
        const dialog = new DialogBuilder({ onClose });
        flushSync(() => dialog.openDialog());
        flushSync(() => dialog.closeDialog());
        expect(onClose).toHaveBeenCalledWith(undefined);
        dialog.destroy();
    });

    itWithEffect('onClose is called with escape reason', () => {
        const onClose = vi.fn();
        const dialog = new DialogBuilder({ onClose });
        flushSync(() => dialog.openDialog());
        flushSync(() => dialog.closeDialog('escape'));
        expect(onClose).toHaveBeenCalledWith('escape');
        dialog.destroy();
    });

    itWithEffect('onClose is called with backdrop reason', () => {
        const onClose = vi.fn();
        const dialog = new DialogBuilder({ onClose });
        flushSync(() => dialog.openDialog());
        flushSync(() => dialog.closeDialog('backdrop'));
        expect(onClose).toHaveBeenCalledWith('backdrop');
        dialog.destroy();
    });
});

describe('DialogBuilder — attrs', () => {
    itWithEffect('backdropAttrs data-state reflects open', () => {
        const dialog = new DialogBuilder({});
        expect(dialog.backdropAttrs['data-state']).toBe('closed');
        dialog.openDialog();
        expect(dialog.backdropAttrs['data-state']).toBe('open');
        dialog.destroy();
    });

    itWithEffect('contentAttrs has role dialog and aria-modal', () => {
        const dialog = new DialogBuilder({});
        expect(dialog.contentAttrs.role).toBe('dialog');
        expect(dialog.contentAttrs['aria-modal']).toBe(true);
        dialog.destroy();
    });

    itWithEffect('contentAttrs data-state reflects open', () => {
        const dialog = new DialogBuilder({});
        expect(dialog.contentAttrs['data-state']).toBe('closed');
        dialog.openDialog();
        expect(dialog.contentAttrs['data-state']).toBe('open');
        dialog.destroy();
    });
});
