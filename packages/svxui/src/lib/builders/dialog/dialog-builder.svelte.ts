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
 * Supports both controlled (external open) and uncontrolled modes.
 */
export class DialogBuilder {
    #id: string;
    #options: DialogBuilderOptions;
    #internalOpen: boolean = $state(false);
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
                if (!this.open) return;

                // untrack prevents layers mutation from re-triggering the effect.
                untrack(() => {
                    // Register this dialog in the stack, avoid duplicates.
                    if (!layers.includes(this.#id)) {
                        layers.push(this.#id);
                    }

                    // Listen for keyboard events (e.g. Escape to close).
                    window.addEventListener('keydown', this.#handleKeydown);
                });

                // Runs when open switches true → false, or when destroy() is called.
                return () => {
                    untrack(() => {
                        layers = layers.filter((id) => id !== this.#id);
                        window.removeEventListener('keydown', this.#handleKeydown);

                        // Works for both internal close() calls (reason = 'escape' | 'backdrop')
                        // and external open changes (reason = undefined).
                        this.#options.onClose?.(this.#pendingReason);
                        this.#pendingReason = undefined;
                    });
                };
            });
        });
    }

    get open(): boolean {
        return 'open' in this.#options //
            ? this.#options.open === true
            : this.#internalOpen;
    }

    set open(newOpen: boolean | undefined) {
        const open = newOpen === true;

        if ('open' in this.#options) {
            this.#options.open = open;
        } else {
            this.#internalOpen = open;
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
            // ARIA atributes
            role: 'presentation',
            inert: !this.#active ? true : undefined,
            // Data attributes
            [`data-${DIALOG_BACKDROP_KEY}`]: '',
            'data-state': this.open ? 'open' : 'closed',
            // Events
            onclick:
                this.#active && this.open && this.#options.closeOnBackdropClick
                    ? (event: MouseEvent) => {
                          if (event.target === event.currentTarget) {
                              this.closeDialog('backdrop');
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
            // ARIA atributes
            tabindex: -1,
            role: 'dialog',
            'aria-modal': true,
            inert: !this.#active ? true : undefined,
            // Data attributes
            [`data-${DIALOG_CONTENT_KEY}`]: '',
            'data-state': this.open ? 'open' : 'closed',
            // Attachments
            [this.#contentAttachmentKey]:
                this.#active && this.open && this.#options.focusTrap
                    ? focustrap({
                          enabled: this.#active && this.open && this.#options.focusTrap
                      })
                    : undefined
        } as const;
    }

    /**
     * Open the dialog
     */
    openDialog = (): void => {
        this.open = true;
    };

    /**
     * Close the dialog
     * @param reason optional close reason
     */
    closeDialog = (reason?: 'escape' | 'backdrop'): void => {
        if (!this.open) return;
        this.#pendingReason = reason;
        this.open = false;
    };

    /**
     * Toggle the dialog open state
     */
    toggleDialog = (): void => {
        if (this.open) {
            this.closeDialog();
        } else {
            this.openDialog();
        }
    };

    /**
     * Destroy root effect
     */
    destroy = (): void => {
        this.#cleanup?.();
    };

    /**
     * Keydown event handler for manage close on escape
     * @param event
     */
    #handleKeydown = (event: KeyboardEvent): void => {
        if (this.#active && this.open && this.#options.closeOnEscape) {
            if (event.key === 'Escape') {
                this.closeDialog('escape');
            }
        }
    };
}
