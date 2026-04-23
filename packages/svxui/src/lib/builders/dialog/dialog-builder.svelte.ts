import { focustrap } from '$lib/attachments/focustrap/index.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { untrack } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { DIALOG_BACKDROP_KEY, DIALOG_CONTENT_KEY } from './internals/keys.ts';
import type { DialogBackdropAttributes, DialogBuilderOptions, DialogContentAttributes } from './types.ts';

// Dialog stack management
let layers: string[] = $state([]);

/**
 * Manages dialog state, layering, and keyboard interactions.
 * Supports both controlled (external isOpen) and uncontrolled modes.
 */
export class DialogBuilder {
    #id: string;
    #options: DialogBuilderOptions;
    #internalIsOpen: boolean = $state(false);
    #active: boolean = $derived.by(() => layers.length > 0 && layers.at(-1) === this.#id);
    #index: number = $derived.by(() => layers.indexOf(this.#id));
    #contentAttachmentKey = createAttachmentKey();
    #pendingReason?: 'escape' | 'backdrop';
    #cleanup: (() => void) | undefined;

    /**
     * @param options - Dialog configuration options.
     *
     * **Lifecycle note:** `DialogBuilder` uses `$effect.root()` to keep its keyboard and stack
     * management effects alive outside any component lifecycle. Always call `destroy()` when you
     * are done with the builder to stop those effects and avoid memory leaks.
     */
    constructor(options: DialogBuilderOptions) {
        this.#id = useId();
        this.#options = options;

        // $effect.root keeps the effect alive outside the component lifecycle,
        // until destroy() is called manually.
        this.#cleanup = $effect.root(() => {
            $effect(() => {
                if (!this.isOpen) return;

                // untrack prevents layers mutation from re-triggering the effect.
                untrack(() => {
                    // Register this dialog in the stack, avoid duplicates.
                    if (!layers.includes(this.#id)) {
                        layers.push(this.#id);
                    }

                    // Listen for keyboard events (e.g. Escape to close).
                    window.addEventListener('keydown', this.#handleKeydown);
                });

                // Runs when isOpen switches true → false, or when destroy() is called.
                return () => {
                    untrack(() => {
                        layers = layers.filter((id) => id !== this.#id);
                        window.removeEventListener('keydown', this.#handleKeydown);

                        // Works for both internal close() calls (reason = 'escape' | 'backdrop')
                        // and external isOpen changes (reason = undefined).
                        this.#options.onClose?.(this.#pendingReason);
                        this.#pendingReason = undefined;
                    });
                };
            });
        });
    }

    get isOpen(): boolean {
        return 'isOpen' in this.#options //
            ? this.#options.isOpen === true
            : this.#internalIsOpen;
    }

    set isOpen(newIsOpen: boolean | undefined) {
        const isOpen = newIsOpen === true;

        if ('isOpen' in this.#options) {
            this.#options.isOpen = isOpen;
        } else {
            this.#internalIsOpen = isOpen;
        }
    }

    get active(): boolean {
        return this.#active;
    }

    get index(): number {
        return this.#index;
    }

    /**
     * Dialog backdrop attributes
     */
    get backdropAttrs(): DialogBackdropAttributes {
        return {
            id: `${DIALOG_BACKDROP_KEY}-${this.#id}`,
            // ARIA atributes
            role: 'presentation',
            inert: !this.#active ? true : undefined,
            // Data attributes
            [`data-${DIALOG_BACKDROP_KEY}`]: '',
            'data-state': this.isOpen ? 'open' : 'closed',
            // Events
            onclick:
                this.#active && this.isOpen && this.#options.closeOnBackdropClick
                    ? (event: MouseEvent) => {
                          if (event.target === event.currentTarget) {
                              this.close('backdrop');
                          }
                      }
                    : undefined
        } as const;
    }

    /**
     * Dialog content attributes
     */
    get contentAttrs(): DialogContentAttributes {
        return {
            id: `${DIALOG_CONTENT_KEY}-${this.#id}`,
            // ARIA atributes
            tabindex: -1,
            role: 'dialog',
            'aria-modal': true,
            inert: !this.#active ? true : undefined,
            // Data attributes
            [`data-${DIALOG_CONTENT_KEY}`]: '',
            'data-state': this.isOpen ? 'open' : 'closed',
            //Attachments
            [this.#contentAttachmentKey]:
                this.#active && this.isOpen && this.#options.focusTrap
                    ? focustrap({
                          enabled: this.#active && this.isOpen && this.#options.focusTrap
                      })
                    : undefined
        } as const;
    }

    /**
     * Open the dialog
     */
    open = (): void => {
        this.isOpen = true;
    };

    /**
     * Close the dialog
     * @param reason optional close reason
     */
    close = (reason?: 'escape' | 'backdrop'): void => {
        if (!this.isOpen) return;
        this.#pendingReason = reason;
        this.isOpen = false;
    };

    /**
     * Toggle the dialog open state
     */
    toggle = (): void => {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    };

    /**
     * Destoy root effect
     */
    destroy = (): void => {
        this.#cleanup?.();
    };

    /**
     * Keydown event handler for manage close on escape
     * @param event
     */
    #handleKeydown = (event: KeyboardEvent): void => {
        if (this.#active && this.isOpen && this.#options.closeOnEscape) {
            if (event.key === 'Escape') {
                this.close('escape');
            }
        }
    };
}
