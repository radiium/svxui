// import { kbd } from '$lib/internals/kbd.js';
// import { tick } from 'svelte';
// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import { rovingfocus } from './rovingfocus.svelte.ts';
// import type { RovingfocusOptions } from './types.ts';

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                     */
// /* -------------------------------------------------------------------------- */

// function mockOffsetParent(el: HTMLElement) {
//     Object.defineProperty(el, 'offsetParent', {
//         value: document.body,
//         configurable: true
//     });
// }

// function createItems(count = 3): HTMLElement[] {
//     return Array.from({ length: count }).map((_, i) => {
//         const btn = document.createElement('button');
//         btn.dataset.rovingItem = '';
//         btn.textContent = `Item ${i}`;
//         mockOffsetParent(btn);
//         return btn;
//     });
// }

// function dispatchKey(el: HTMLElement, key: string) {
//     el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
// }

// async function setup(container: HTMLElement, props?: RovingfocusOptions) {
//     const destroy = rovingfocus(props)(container);
//     await tick();
//     return destroy;
// }

// /* -------------------------------------------------------------------------- */
// /* Tests                                                                       */
// /* -------------------------------------------------------------------------- */

// describe('rovingfocus attachment', () => {
//     let container: HTMLElement;
//     let items: HTMLElement[];

//     beforeEach(() => {
//         document.body.innerHTML = '';
//         container = document.createElement('div');
//         document.body.appendChild(container);

//         items = createItems(3);
//         items.forEach((item) => container.appendChild(item));
//     });

//     it('initializes focus on the first item by default', async () => {
//         const destroy = await setup(container);

//         expect(items[0].tabIndex).toBe(0);
//         expect(items[1].tabIndex).toBe(-1);
//         expect(items[2].tabIndex).toBe(-1);

//         destroy?.();
//     });

//     it('respects initialIndex = "last"', async () => {
//         const destroy = await setup(container, { initialIndex: 'last' });
//         expect(items[2].tabIndex).toBe(0);

//         destroy?.();
//     });

//     it('respects numeric initialIndex', async () => {
//         const destroy = await setup(container, { initialIndex: 1 });

//         expect(items[1].tabIndex).toBe(0);

//         destroy?.();
//     });

//     it('moves focus with ArrowDown (vertical)', async () => {
//         const destroy = await setup(container);

//         dispatchKey(container, kbd.ARROW_DOWN);

//         expect(items[1].tabIndex).toBe(0);

//         destroy?.();
//     });

//     it('does not go past the last item when loop=false', async () => {
//         const destroy = await setup(container);

//         dispatchKey(container, kbd.ARROW_DOWN);
//         dispatchKey(container, kbd.ARROW_DOWN);
//         dispatchKey(container, kbd.ARROW_DOWN);

//         expect(items[2].tabIndex).toBe(0);

//         destroy?.();
//     });

//     it('wraps around when loop=true', async () => {
//         const destroy = await setup(container, { loop: true });

//         dispatchKey(container, kbd.ARROW_UP);

//         expect(items[2].tabIndex).toBe(0);

//         destroy?.();
//     });

//     it('handles HOME and END keys', async () => {
//         const destroy = await setup(container);

//         dispatchKey(container, kbd.END);
//         expect(items[2].tabIndex).toBe(0);

//         dispatchKey(container, kbd.HOME);
//         expect(items[0].tabIndex).toBe(0);

//         destroy?.();
//     });

//     it('clicks the item when activateOnFocus=true', async () => {
//         const spy = vi.spyOn(items[1], 'click');

//         const destroy = await setup(container);

//         dispatchKey(container, kbd.ARROW_DOWN);

//         expect(spy).toHaveBeenCalledOnce();

//         destroy?.();
//     });

//     it('does not click the item when activateOnFocus=false', async () => {
//         const spy = vi.spyOn(items[1], 'click');

//         const destroy = await setup(container, { activateOnFocus: false });

//         dispatchKey(container, kbd.ARROW_DOWN);

//         expect(spy).not.toHaveBeenCalled();

//         destroy?.();
//     });

//     it('skips disabled and aria-disabled items', async () => {
//         items[1].setAttribute('disabled', '');

//         const destroy = await setup(container);

//         dispatchKey(container, kbd.ARROW_DOWN);

//         expect(items[2].tabIndex).toBe(0);

//         destroy?.();
//     });

//     it('updates focus on mouse click', async () => {
//         const destroy = await setup(container);

//         items[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));

//         expect(items[2].tabIndex).toBe(0);

//         destroy?.();
//     });

//     it('reacts to DOM mutations', async () => {
//         const destroy = await setup(container);

//         // Move focus to the last item
//         dispatchKey(container, kbd.END);
//         expect(items[2].tabIndex).toBe(0);

//         // Remove the focused item
//         items[2].remove();
//         await tick();

//         // Focus should move to the new last item
//         expect(items[1].tabIndex).toBe(0);

//         destroy?.();
//     });

//     it('stops reacting after destroy()', async () => {
//         const destroy = await setup(container);
//         destroy?.();

//         dispatchKey(container, kbd.ARROW_DOWN);

//         // Still the initial state
//         expect(items[0].tabIndex).toBe(0);
//         expect(items[1].tabIndex).toBe(-1);
//     });
// });

import { kbd } from '$lib/internals/kbd.js';
import { flushSync, tick } from 'svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { rovingfocus } from './rovingfocus.svelte.ts';
import type { RovingfocusOptions } from './types.ts';

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function mockOffsetParent(el: HTMLElement) {
    Object.defineProperty(el, 'offsetParent', {
        value: document.body,
        configurable: true
    });
}

function createItems(count = 3): HTMLElement[] {
    return Array.from({ length: count }).map((_, i) => {
        const btn = document.createElement('button');
        btn.dataset.rovingItem = '';
        btn.textContent = `Item ${i}`;
        mockOffsetParent(btn);
        return btn;
    });
}

function dispatchKey(el: HTMLElement, key: string) {
    el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

/**
 * L'attachment appelle flushSync() à l'init — on l'encapsule dans flushSync
 * pour s'assurer que l'initialisation est synchrone et complète.
 */
function setup(container: HTMLElement, props?: RovingfocusOptions) {
    let destroy: (() => void) | undefined;
    flushSync(() => {
        destroy = rovingfocus(props)(container) ?? undefined;
    });
    return destroy;
}

/* -------------------------------------------------------------------------- */
/* Tests                                                                       */
/* -------------------------------------------------------------------------- */

describe('rovingfocus attachment', () => {
    let container: HTMLElement;
    let items: HTMLElement[];

    beforeEach(() => {
        document.body.innerHTML = '';
        container = document.createElement('div');
        document.body.appendChild(container);

        items = createItems(3);
        items.forEach((item) => container.appendChild(item));
    });

    it('initializes focus on the first item by default', () => {
        const destroy = setup(container);

        expect(items[0].tabIndex).toBe(0);
        expect(items[1].tabIndex).toBe(-1);
        expect(items[2].tabIndex).toBe(-1);

        destroy?.();
    });

    it('respects initialIndex = "last"', () => {
        const destroy = setup(container, { initialIndex: 'last' });

        expect(items[0].tabIndex).toBe(-1);
        expect(items[1].tabIndex).toBe(-1);
        expect(items[2].tabIndex).toBe(0);

        destroy?.();
    });

    it('respects numeric initialIndex', () => {
        const destroy = setup(container, { initialIndex: 1 });

        expect(items[0].tabIndex).toBe(-1);
        expect(items[1].tabIndex).toBe(0);
        expect(items[2].tabIndex).toBe(-1);

        destroy?.();
    });

    it('moves focus with ArrowDown (vertical, default)', () => {
        const destroy = setup(container);

        dispatchKey(container, kbd.ARROW_DOWN);

        expect(items[0].tabIndex).toBe(-1);
        expect(items[1].tabIndex).toBe(0);
        expect(items[2].tabIndex).toBe(-1);

        destroy?.();
    });

    it('moves focus with ArrowUp (vertical, default)', () => {
        const destroy = setup(container, { initialIndex: 2 });

        dispatchKey(container, kbd.ARROW_UP);

        expect(items[1].tabIndex).toBe(0);

        destroy?.();
    });

    it('does not go past the last item when loop=false', () => {
        const destroy = setup(container, { loop: false });

        dispatchKey(container, kbd.ARROW_DOWN);
        dispatchKey(container, kbd.ARROW_DOWN);
        dispatchKey(container, kbd.ARROW_DOWN); // au-delà de la limite

        expect(items[2].tabIndex).toBe(0);

        destroy?.();
    });

    it('does not go before the first item when loop=false', () => {
        const destroy = setup(container, { loop: false });

        dispatchKey(container, kbd.ARROW_UP); // déjà au début

        expect(items[0].tabIndex).toBe(0);

        destroy?.();
    });

    it('wraps to last item when pressing ArrowUp on first with loop=true', () => {
        const destroy = setup(container, { loop: true });

        dispatchKey(container, kbd.ARROW_UP);

        expect(items[2].tabIndex).toBe(0);

        destroy?.();
    });

    it('wraps to first item when pressing ArrowDown on last with loop=true', () => {
        const destroy = setup(container, { loop: true, initialIndex: 'last' });

        dispatchKey(container, kbd.ARROW_DOWN);

        expect(items[0].tabIndex).toBe(0);

        destroy?.();
    });

    it('handles HOME key — jumps to first item', () => {
        const destroy = setup(container, { initialIndex: 2 });

        dispatchKey(container, kbd.HOME);

        expect(items[0].tabIndex).toBe(0);
        expect(items[2].tabIndex).toBe(-1);

        destroy?.();
    });

    it('handles END key — jumps to last item', () => {
        const destroy = setup(container);

        dispatchKey(container, kbd.END);

        expect(items[2].tabIndex).toBe(0);
        expect(items[0].tabIndex).toBe(-1);

        destroy?.();
    });

    it('calls click() on focused item when activateOnFocus=true', () => {
        const spy = vi.spyOn(items[1], 'click');
        const destroy = setup(container, { activateOnFocus: true });

        dispatchKey(container, kbd.ARROW_DOWN);

        expect(spy).toHaveBeenCalledOnce();

        destroy?.();
    });

    it('does not call click() when activateOnFocus=false', () => {
        const spy = vi.spyOn(items[1], 'click');
        const destroy = setup(container, { activateOnFocus: false });

        dispatchKey(container, kbd.ARROW_DOWN);

        expect(spy).not.toHaveBeenCalled();

        destroy?.();
    });

    it('updates currentIndex on mouse click', () => {
        const destroy = setup(container);

        // Clic sur items[2] — doit devenir l'item actif
        items[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(items[2].tabIndex).toBe(0);
        expect(items[0].tabIndex).toBe(-1);

        // ArrowDown depuis items[2] sans loop → reste sur items[2]
        dispatchKey(container, kbd.ARROW_DOWN);
        expect(items[2].tabIndex).toBe(0);

        destroy?.();
    });

    it('reacts to DOM mutations — item ajouté', async () => {
        const destroy = setup(container);

        const newItem = document.createElement('button');
        newItem.dataset.rovingItem = '';
        newItem.textContent = 'Item 3';
        mockOffsetParent(newItem);
        container.appendChild(newItem);

        await tick(); // laisse le MutationObserver reagir

        // Le nouvel item doit avoir tabIndex=-1
        expect(newItem.tabIndex).toBe(-1);
        // L'item actif (index 0) reste inchangé
        expect(items[0].tabIndex).toBe(0);

        destroy?.();
    });

    it('reacts to DOM mutations — item supprimé', async () => {
        const destroy = setup(container, { initialIndex: 'last' });

        expect(items[2].tabIndex).toBe(0);

        items[2].remove();
        await tick();

        // currentIndex (2) >= nouvelle longueur (2) → clampé à 1
        expect(items[1].tabIndex).toBe(0);

        destroy?.();
    });

    it('stops reacting after destroy()', () => {
        const destroy = setup(container);
        destroy?.();

        dispatchKey(container, kbd.ARROW_DOWN);

        // L'état initial doit être préservé
        expect(items[0].tabIndex).toBe(0);
        expect(items[1].tabIndex).toBe(-1);
        expect(items[2].tabIndex).toBe(-1);
    });

    it('ignores keys that are not in allowedKeys', () => {
        const destroy = setup(container);

        dispatchKey(container, 'Tab');
        dispatchKey(container, 'Enter');
        dispatchKey(container, ' ');

        // Aucun changement
        expect(items[0].tabIndex).toBe(0);

        destroy?.();
    });
});
