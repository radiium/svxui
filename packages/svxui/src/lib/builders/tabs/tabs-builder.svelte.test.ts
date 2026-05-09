import { describe, expect, vi } from 'vitest';
import { itWithEffect } from '../../../tests/util.svelte.js';
import { TabsBuilder } from './tabs-builder.svelte.js';

describe('TabsBuilder — defaults', () => {
    itWithEffect('exposes a string id', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.id).toBeTypeOf('string');
    });

    itWithEffect('defaults orientation to vertical', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.orientation).toBe('vertical');
    });

    itWithEffect('defaults disabled to false', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.disabled).toBe(false);
    });

    itWithEffect('defaults loop to false', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.loop).toBe(false);
    });

    itWithEffect('defaults activateOnFocus to false', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.activateOnFocus).toBe(false);
    });
});

describe('TabsBuilder — isActive / activate', () => {
    itWithEffect('isActive returns true for the initial value', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.isActive('a')).toBe(true);
        expect(tabs.isActive('b')).toBe(false);
    });

    itWithEffect('activate switches the active tab', () => {
        const opts = { value: 'a' as string };
        const tabs = new TabsBuilder(opts);
        tabs.activate('b');
        expect(tabs.isActive('b')).toBe(true);
        expect(tabs.isActive('a')).toBe(false);
    });

    itWithEffect('activate is a no-op when globally disabled', () => {
        const opts = { value: 'a' as string, disabled: true };
        const tabs = new TabsBuilder(opts);
        tabs.activate('b');
        expect(tabs.isActive('a')).toBe(true);
    });

    itWithEffect('onValueChange is called on activation', () => {
        const onValueChange = vi.fn();
        const opts = { value: 'a' as string, onValueChange };
        const tabs = new TabsBuilder(opts);
        tabs.activate('b');
        expect(onValueChange).toHaveBeenCalledWith('b');
    });
});

describe('TabsBuilder — getTrigger', () => {
    itWithEffect('active trigger has data-state active', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        const trigger = tabs.getTrigger('a');
        expect(trigger.active).toBe(true);
        expect(trigger.attrs['data-state']).toBe('active');
        expect(trigger.attrs.role).toBe('tab');
        expect(trigger.attrs['aria-selected']).toBe(true);
    });

    itWithEffect('inactive trigger has data-state inactive', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        const trigger = tabs.getTrigger('b');
        expect(trigger.active).toBe(false);
        expect(trigger.attrs['data-state']).toBe('inactive');
        expect(trigger.attrs['aria-selected']).toBe(false);
    });

    itWithEffect('disabled trigger has no aria-selected', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        const trigger = tabs.getTrigger('a', { disabled: true });
        expect(trigger.disabled).toBe(true);
        expect(trigger.attrs['aria-selected']).toBeUndefined();
        expect(trigger.attrs.tabindex).toBe(-1);
    });
});

describe('TabsBuilder — getContent', () => {
    itWithEffect('active content is not hidden', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        const content = tabs.getContent('a');
        expect(content.active).toBe(true);
        expect(content.attrs.hidden).toBeUndefined();
        expect(content.attrs.role).toBe('tabpanel');
    });

    itWithEffect('inactive content is hidden', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        const content = tabs.getContent('b');
        expect(content.active).toBe(false);
        expect(content.attrs.hidden).toBe(true);
    });
});

describe('TabsBuilder — rootAttrs', () => {
    itWithEffect('rootAttrs reflects orientation', () => {
        const tabs = new TabsBuilder({ value: 'a', orientation: 'horizontal' });
        expect(tabs.rootAttrs['data-orientation']).toBe('horizontal');
    });

    itWithEffect('rootAttrs reflects disabled state', () => {
        const tabs = new TabsBuilder({ value: 'a', disabled: true });
        expect(tabs.rootAttrs['data-disabled']).toBe('');
    });
});
