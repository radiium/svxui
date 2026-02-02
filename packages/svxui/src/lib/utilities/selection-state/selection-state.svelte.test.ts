import { describe, expect, it } from 'vitest';
import { SelectionState } from './selection-state.svelte.js';

describe('Selection – single mode', () => {
    it('initializes with a single value', () => {
        const selection = new SelectionState<string, false>({
            value: 'a',
            multiple: false
        });

        expect(selection.multiple).toBe(false);
        expect(selection.count).toBe(1);
        expect(selection.has('a')).toBe(true);
        expect(selection.has('b')).toBe(false);
    });

    it('handles null and undefined values', () => {
        const selectionNull = new SelectionState<string, false>({ value: null });
        const selectionUndefined = new SelectionState<string, false>({ value: undefined });

        expect(selectionNull.count).toBe(0);
        expect(selectionUndefined.count).toBe(0);
    });

    it('select replaces the current value', () => {
        const selection = new SelectionState<string, false>({ value: null });

        selection.select('a');

        expect(selection.count).toBe(1);
        expect(selection.has('a')).toBe(true);
    });

    it('deselect sets value to null if item is selected', () => {
        const selection = new SelectionState<string, false>({ value: 'a' });

        selection.deselect('a');

        expect(selection.count).toBe(0);
        expect(selection.has('a')).toBe(false);
    });

    it('toggle selects and then deselects an item', () => {
        const selection = new SelectionState<string, false>({ value: null });

        selection.toggle('a');
        expect(selection.has('a')).toBe(true);

        selection.toggle('a');
        expect(selection.has('a')).toBe(false);
    });

    it('clear resets the value to null', () => {
        const selection = new SelectionState<string, false>({ value: 'a' });

        selection.clear();

        expect(selection.count).toBe(0);
    });
});

describe('Selection – multiple mode', () => {
    it('initializes with an array of values', () => {
        const selection = new SelectionState<string, true>({
            value: ['a', 'b'],
            multiple: true
        });

        expect(selection.multiple).toBe(true);
        expect(selection.count).toBe(2);
        expect(selection.has('a')).toBe(true);
        expect(selection.has('c')).toBe(false);
    });

    it('select adds a unique item', () => {
        const selection = new SelectionState<string, true>({
            value: ['a'],
            multiple: true
        });

        selection.select('b');
        selection.select('a'); // duplicate

        expect(selection.count).toBe(2);
        expect(selection.has('a')).toBe(true);
        expect(selection.has('b')).toBe(true);
    });

    it('deselect removes only the targeted item', () => {
        const selection = new SelectionState<string, true>({
            value: ['a', 'b', 'c'],
            multiple: true
        });

        selection.deselect('b');

        expect(selection.count).toBe(2);
        expect(selection.has('b')).toBe(false);
        expect(selection.has('a')).toBe(true);
        expect(selection.has('c')).toBe(true);
    });

    it('toggle adds and then removes an item', () => {
        const selection = new SelectionState<string, true>({
            value: [],
            multiple: true
        });

        selection.toggle('a');
        expect(selection.has('a')).toBe(true);

        selection.toggle('a');
        expect(selection.has('a')).toBe(false);
        expect(selection.count).toBe(0);
    });

    it('clear empties the array', () => {
        const selection = new SelectionState<string, true>({
            value: ['a', 'b'],
            multiple: true
        });

        selection.clear();

        expect(selection.count).toBe(0);
    });
});

describe('Selection – edge cases', () => {
    it('returns count = 0 when multiple=true and value is undefined', () => {
        const selection = new SelectionState<string, true>({
            value: undefined,
            multiple: true
        });

        expect(selection.count).toBe(0);
    });

    it('has returns false when value is not an array in multiple mode', () => {
        const selection = new SelectionState<string, true>({
            value: null,
            multiple: true
        });

        expect(selection.has('a')).toBe(false);
    });
});
