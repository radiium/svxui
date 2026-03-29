import { describe, expect, vi } from 'vitest';
import { itWithEffect } from '../../../tests/util.svelte.js';
import { AccordionBuilder } from './accordion-builder.svelte.js';

describe('AccordionBuilder — defaults', () => {
    itWithEffect('exposes a string id', () => {
        const accordion = new AccordionBuilder({ value: null, multiple: false });
        expect(accordion.id).toBeTypeOf('string');
        accordion.destroy();
    });

    itWithEffect('defaults orientation to vertical', () => {
        const accordion = new AccordionBuilder({ value: null, multiple: false });
        expect(accordion.orientation).toBe('vertical');
        accordion.destroy();
    });

    itWithEffect('defaults disabled to false', () => {
        const accordion = new AccordionBuilder({ value: null, multiple: false });
        expect(accordion.disabled).toBe(false);
        accordion.destroy();
    });

    itWithEffect('multiple reflects the option', () => {
        const single = new AccordionBuilder({ value: null, multiple: false });
        const multi = new AccordionBuilder({ value: [] as string[], multiple: true });
        expect(single.multiple).toBe(false);
        expect(multi.multiple).toBe(true);
        single.destroy();
        multi.destroy();
    });
});

describe('AccordionBuilder — expand / collapse / toggle', () => {
    itWithEffect('isExpanded returns false initially', () => {
        const accordion = new AccordionBuilder<string, false>({ value: null, multiple: false });
        expect(accordion.isExpanded('a')).toBe(false);
        accordion.destroy();
    });

    itWithEffect('expand sets the item as expanded', () => {
        const opts = { value: null as string | null, multiple: false as const };
        const accordion = new AccordionBuilder(opts);
        accordion.expand('a');
        expect(accordion.isExpanded('a')).toBe(true);
        accordion.destroy();
    });

    itWithEffect('collapse removes the expanded state', () => {
        const opts = { value: 'a' as string | null, multiple: false as const };
        const accordion = new AccordionBuilder(opts);
        accordion.collapse('a');
        expect(accordion.isExpanded('a')).toBe(false);
        accordion.destroy();
    });

    itWithEffect('toggle expands then collapses', () => {
        const opts = { value: null as string | null, multiple: false as const };
        const accordion = new AccordionBuilder(opts);
        accordion.toggle('a');
        expect(accordion.isExpanded('a')).toBe(true);
        accordion.toggle('a');
        expect(accordion.isExpanded('a')).toBe(false);
        accordion.destroy();
    });

    itWithEffect('disabled blocks expand/collapse/toggle', () => {
        const opts = { value: null as string | null, multiple: false as const, disabled: true };
        const accordion = new AccordionBuilder(opts);
        accordion.expand('a');
        expect(accordion.isExpanded('a')).toBe(false);
        accordion.toggle('a');
        expect(accordion.isExpanded('a')).toBe(false);
        accordion.destroy();
    });

    itWithEffect('onValueChange is called on expand', () => {
        const onValueChange = vi.fn();
        const opts = { value: null as string | null, multiple: false as const, onValueChange };
        const accordion = new AccordionBuilder(opts);
        accordion.expand('a');
        expect(onValueChange).toHaveBeenCalledWith('a');
        accordion.destroy();
    });

    itWithEffect('multiple mode allows several items expanded', () => {
        const opts = { value: [] as string[], multiple: true as const };
        const accordion = new AccordionBuilder(opts);
        accordion.expand('a');
        accordion.expand('b');
        expect(accordion.isExpanded('a')).toBe(true);
        expect(accordion.isExpanded('b')).toBe(true);
        accordion.destroy();
    });
});

describe('AccordionBuilder — getItem', () => {
    itWithEffect('collapsed item has correct data-state and aria-expanded', () => {
        const accordion = new AccordionBuilder<string, false>({ value: null, multiple: false });
        const item = accordion.getItem('a');
        expect(item.expanded).toBe(false);
        expect(item.triggerAttrs['aria-expanded']).toBe(false);
        expect(item.triggerAttrs['data-state']).toBe('closed');
        accordion.destroy();
    });

    itWithEffect('expanded item has correct data-state and aria-expanded', () => {
        const opts = { value: 'a' as string | null, multiple: false as const };
        const accordion = new AccordionBuilder(opts);
        const item = accordion.getItem('a');
        expect(item.expanded).toBe(true);
        expect(item.triggerAttrs['aria-expanded']).toBe(true);
        expect(item.triggerAttrs['data-state']).toBe('open');
        accordion.destroy();
    });

    itWithEffect('trigger aria-controls points to content id', () => {
        const accordion = new AccordionBuilder<string, false>({ value: null, multiple: false });
        const item = accordion.getItem('a', { id: 'test-id' });
        expect(item.triggerAttrs['aria-controls']).toBe('accordion-content-test-id');
        expect(item.contentAttrs.id).toBe('accordion-content-test-id');
        accordion.destroy();
    });

    itWithEffect('content has role region', () => {
        const accordion = new AccordionBuilder<string, false>({ value: null, multiple: false });
        const item = accordion.getItem('a');
        expect(item.contentAttrs.role).toBe('region');
        accordion.destroy();
    });

    itWithEffect('disabled item has aria-disabled on trigger', () => {
        const accordion = new AccordionBuilder<string, false>({ value: null, multiple: false });
        const item = accordion.getItem('a', { disabled: true });
        expect(item.disabled).toBe(true);
        expect(item.triggerAttrs['aria-disabled']).toBe(true);
        expect(item.triggerAttrs.tabindex).toBe(-1);
        accordion.destroy();
    });
});
