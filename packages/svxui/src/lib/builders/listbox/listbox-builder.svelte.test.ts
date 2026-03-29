import { describe, expect, vi } from 'vitest';
import { itWithEffect } from '../../../tests/util.svelte.js';
import { ListboxBuilder } from './listbox-builder.svelte.js';

describe('ListboxBuilder — defaults', () => {
    itWithEffect('exposes a string id', () => {
        const listbox = new ListboxBuilder({ value: null, multiple: false });
        expect(listbox.id).toBeTypeOf('string');
        listbox.destroy();
    });

    itWithEffect('defaults orientation to vertical', () => {
        const listbox = new ListboxBuilder({ value: null, multiple: false });
        expect(listbox.orientation).toBe('vertical');
        listbox.destroy();
    });

    itWithEffect('defaults disabled to false', () => {
        const listbox = new ListboxBuilder({ value: null, multiple: false });
        expect(listbox.disabled).toBe(false);
        listbox.destroy();
    });

    itWithEffect('defaults loop to false', () => {
        const listbox = new ListboxBuilder({ value: null, multiple: false });
        expect(listbox.loop).toBe(false);
        listbox.destroy();
    });

    itWithEffect('defaults activateOnFocus to false', () => {
        const listbox = new ListboxBuilder({ value: null, multiple: false });
        expect(listbox.activateOnFocus).toBe(false);
        listbox.destroy();
    });
});

describe('ListboxBuilder — select / deselect / toggle', () => {
    itWithEffect('isSelected returns false initially', () => {
        const listbox = new ListboxBuilder<string, false>({ value: null, multiple: false });
        expect(listbox.isSelected('a')).toBe(false);
        listbox.destroy();
    });

    itWithEffect('select marks item as selected', () => {
        const opts = { value: null as string | null, multiple: false as const };
        const listbox = new ListboxBuilder(opts);
        listbox.select('a');
        expect(listbox.isSelected('a')).toBe(true);
        listbox.destroy();
    });

    itWithEffect('deselect removes selection', () => {
        const opts = { value: 'a' as string | null, multiple: false as const };
        const listbox = new ListboxBuilder(opts);
        listbox.deselect('a');
        expect(listbox.isSelected('a')).toBe(false);
        listbox.destroy();
    });

    itWithEffect('toggle selects then deselects', () => {
        const opts = { value: null as string | null, multiple: false as const };
        const listbox = new ListboxBuilder(opts);
        listbox.toggle('a');
        expect(listbox.isSelected('a')).toBe(true);
        listbox.toggle('a');
        expect(listbox.isSelected('a')).toBe(false);
        listbox.destroy();
    });

    itWithEffect('disabled blocks select/deselect/toggle', () => {
        const opts = { value: null as string | null, multiple: false as const, disabled: true };
        const listbox = new ListboxBuilder(opts);
        listbox.select('a');
        expect(listbox.isSelected('a')).toBe(false);
        listbox.toggle('a');
        expect(listbox.isSelected('a')).toBe(false);
        listbox.destroy();
    });

    itWithEffect('onValueChange is called on select', () => {
        const onValueChange = vi.fn();
        const opts = { value: null as string | null, multiple: false as const, onValueChange };
        const listbox = new ListboxBuilder(opts);
        listbox.select('a');
        expect(onValueChange).toHaveBeenCalledWith('a');
        listbox.destroy();
    });

    itWithEffect('multiple mode allows several items selected', () => {
        const opts = { value: [] as string[], multiple: true as const };
        const listbox = new ListboxBuilder(opts);
        listbox.select('a');
        listbox.select('b');
        expect(listbox.isSelected('a')).toBe(true);
        expect(listbox.isSelected('b')).toBe(true);
        listbox.destroy();
    });
});

describe('ListboxBuilder — rootAttrs', () => {
    itWithEffect('has role listbox', () => {
        const listbox = new ListboxBuilder({ value: null, multiple: false });
        expect(listbox.rootAttrs.role).toBe('listbox');
        listbox.destroy();
    });

    itWithEffect('aria-multiselectable reflects multiple option', () => {
        const single = new ListboxBuilder({ value: null, multiple: false });
        const multi = new ListboxBuilder({ value: [] as string[], multiple: true });
        expect(single.rootAttrs['aria-multiselectable']).toBe(false);
        expect(multi.rootAttrs['aria-multiselectable']).toBe(true);
        single.destroy();
        multi.destroy();
    });
});

describe('ListboxBuilder — getItem', () => {
    itWithEffect('unselected item has correct attrs', () => {
        const listbox = new ListboxBuilder<string, false>({ value: null, multiple: false });
        const item = listbox.getItem('a');
        expect(item.selected).toBe(false);
        expect(item.attrs.role).toBe('option');
        expect(item.attrs['aria-selected']).toBe(false);
        expect(item.attrs['data-state']).toBe('unselected');
        listbox.destroy();
    });

    itWithEffect('selected item has aria-selected true', () => {
        const opts = { value: 'a' as string | null, multiple: false as const };
        const listbox = new ListboxBuilder(opts);
        const item = listbox.getItem('a');
        expect(item.selected).toBe(true);
        expect(item.attrs['aria-selected']).toBe(true);
        expect(item.attrs['data-state']).toBe('selected');
        listbox.destroy();
    });

    itWithEffect('disabled item has no aria-selected', () => {
        const listbox = new ListboxBuilder<string, false>({ value: null, multiple: false });
        const item = listbox.getItem('a', { disabled: true });
        expect(item.disabled).toBe(true);
        expect(item.attrs['aria-selected']).toBeUndefined();
        expect(item.attrs['aria-disabled']).toBe(true);
        listbox.destroy();
    });
});
