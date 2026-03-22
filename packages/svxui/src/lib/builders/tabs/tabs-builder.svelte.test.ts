import { describe, expect, vi } from 'vitest';
import { itWithEffect } from '../../../tests/util.svelte.js';
import { TabsBuilder } from './tabs-builder.svelte.js';

describe('TabsBuilder — defaults', () => {
    itWithEffect('exposes a string id', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.id).toBeTypeOf('string');
        tabs.destroy();
    });

    itWithEffect('defaults orientation to vertical', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.orientation).toBe('vertical');
        tabs.destroy();
    });

    itWithEffect('defaults disabled to false', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.disabled).toBe(false);
        tabs.destroy();
    });

    itWithEffect('defaults loop to false', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.loop).toBe(false);
        tabs.destroy();
    });

    itWithEffect('defaults activateOnFocus to false', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.activateOnFocus).toBe(false);
        tabs.destroy();
    });
});

describe('TabsBuilder — isActive / activate', () => {
    itWithEffect('isActive returns true for the initial value', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        expect(tabs.isActive('a')).toBe(true);
        expect(tabs.isActive('b')).toBe(false);
        tabs.destroy();
    });

    itWithEffect('activate switches the active tab', () => {
        const opts = { value: 'a' as string };
        const tabs = new TabsBuilder(opts);
        tabs.activate('b');
        expect(tabs.isActive('b')).toBe(true);
        expect(tabs.isActive('a')).toBe(false);
        tabs.destroy();
    });

    itWithEffect('activate is a no-op when globally disabled', () => {
        const opts = { value: 'a' as string, disabled: true };
        const tabs = new TabsBuilder(opts);
        tabs.activate('b');
        expect(tabs.isActive('a')).toBe(true);
        tabs.destroy();
    });

    itWithEffect('onValueChange is called on activation', () => {
        const onValueChange = vi.fn();
        const opts = { value: 'a' as string, onValueChange };
        const tabs = new TabsBuilder(opts);
        tabs.activate('b');
        expect(onValueChange).toHaveBeenCalledWith('b');
        tabs.destroy();
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
        tabs.destroy();
    });

    itWithEffect('inactive trigger has data-state inactive', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        const trigger = tabs.getTrigger('b');
        expect(trigger.active).toBe(false);
        expect(trigger.attrs['data-state']).toBe('inactive');
        expect(trigger.attrs['aria-selected']).toBe(false);
        tabs.destroy();
    });

    itWithEffect('disabled trigger has no aria-selected', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        const trigger = tabs.getTrigger('a', { disabled: true });
        expect(trigger.disabled).toBe(true);
        expect(trigger.attrs['aria-selected']).toBeUndefined();
        expect(trigger.attrs.tabindex).toBe(-1);
        tabs.destroy();
    });
});

describe('TabsBuilder — getContent', () => {
    itWithEffect('active content is not hidden', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        const content = tabs.getContent('a');
        expect(content.active).toBe(true);
        expect(content.attrs.hidden).toBeUndefined();
        expect(content.attrs.role).toBe('tabpanel');
        tabs.destroy();
    });

    itWithEffect('inactive content is hidden', () => {
        const tabs = new TabsBuilder({ value: 'a' });
        const content = tabs.getContent('b');
        expect(content.active).toBe(false);
        expect(content.attrs.hidden).toBe(true);
        tabs.destroy();
    });
});

describe('TabsBuilder — rootAttrs', () => {
    itWithEffect('rootAttrs reflects orientation', () => {
        const tabs = new TabsBuilder({ value: 'a', orientation: 'horizontal' });
        expect(tabs.rootAttrs['data-orientation']).toBe('horizontal');
        tabs.destroy();
    });

    itWithEffect('rootAttrs reflects disabled state', () => {
        const tabs = new TabsBuilder({ value: 'a', disabled: true });
        expect(tabs.rootAttrs['data-disabled']).toBe('');
        tabs.destroy();
    });
});
