import { clickoutside } from '$lib/attachments/clickoutside/index.js';
import { focustrap } from '$lib/attachments/focustrap/index.js';
import { getHtmlElement } from '$lib/internals/elements.js';
import { kbd } from '$lib/internals/kbd.js';
import { FloatingEngine, type FloatingEngineOptions } from '$lib/utilities/floating-engine/index.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { flushSync } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { on } from 'svelte/events';
import { FloatingPattern, type FloatingPatternState } from './internals/floating-pattern.ts';
import type {
    FloatingBackdropAttributes,
    FloatingBuilderOptions,
    FloatingContentAttributes,
    FloatingTriggerAttributes
} from './types.ts';

/**
 * Builder class for creating accessible floating UI elements like tooltips and popovers. Uses `FloatingEngine` internally for position computation, and adds ARIA patterns, focus management, and common close behaviors (outside click, escape, scroll, resize).
 *
 * For raw position computation without ARIA or UX behaviors, use `FloatingEngine` directly.
 */
export class FloatingBuilder {
    /**
     * User-provided builder options
     */
    #options: FloatingBuilderOptions;

    /**
     * Floating positioning engine instance
     */
    #engine: FloatingEngine;

    /**
     * Reactive engine configuration
     */
    #engineOptions: FloatingEngineOptions = $derived.by(() => this.#options.engineOptions ?? {});

    /**
     * Resolved ARIA pattern attributes (tooltip or popover)
     */
    #pattern: FloatingPatternState = $derived.by(() =>
        FloatingPattern.resolve({
            open: this.isOpen,
            pattern: this.#options.pattern,
            triggerId: this.#triggerId,
            contentId: this.#contentId
        })
    );

    /**
     * Current backdrop element reference
     */
    #backdropEl?: HTMLElement | SVGElement = $state();

    constructor(options: FloatingBuilderOptions) {
        this.#options = options;
        this.#engine = new FloatingEngine(this.#engineOptions);
    }

    /**
     * Returns whether the floating element is currently open
     */
    get isOpen(): boolean {
        return this.#options.isOpen === true;
    }

    /**
     * Current computed floating engine state
     */
    get state() {
        return this.#engine.state;
    }

    /**
     * Open the floating element
     */
    open = () => (this.#options.isOpen = true);

    /**
     * Close the floating element
     */
    close = () => (this.#options.isOpen = false);

    /**
     * Toggle the open state
     */
    toggle = () => (this.#options.isOpen = !this.#options.isOpen);

    /**
     * Focuses a DOM element by reference or selector
     * @param el Target element or selector
     */
    #focusElement(el?: string | HTMLElement): void {
        if (el) {
            flushSync();
            getHtmlElement(el)?.focus();
        }
    }

    /**
     * =================
     * TRIGGER
     * =================
     */

    /** Trigger element id */
    #triggerId = $state(useId());
    /** Trigger data attribute name */
    #triggerDataAttr = 'data-floating-trigger';
    /** Attachment key for trigger element */
    #triggerAttachmentKey = createAttachmentKey();
    /** Attachment for trigger element */
    #triggerAttachment = (node: HTMLElement) => {
        this.#engine.reference = node;

        // Resolve trigger id
        if (node.id) this.#triggerId = node.id;
        else node.id = this.#triggerId;

        return () => {
            this.#engine.reference = undefined;
        };
    };

    /**
     * Trigger attributes to spread on the trigger element
     */
    get triggerAttrs(): FloatingTriggerAttributes {
        return {
            // Data attributes
            [this.#triggerDataAttr]: '',
            'data-state': this.isOpen ? 'open' : 'closed',
            // Attachment
            [this.#triggerAttachmentKey]: this.#triggerAttachment,
            // Other attributes from the current pattern
            ...this.#pattern.triggerAttrs
        };
    }

    /**
     * =================
     * BACKDROP
     * =================
     */

    /** Backdrop element id */
    #backdropId = $state(useId());
    /** Backdrop data attribute name */
    #backdropDataAttr = 'data-floating-backdrop';
    /** Attachment key for backdrop element */
    #backdropAttachmentKey = createAttachmentKey();
    /** Attachment for backdrop element */
    #backdropAttachment = (node: HTMLElement) => {
        this.#backdropEl = node;

        // Resolve backdrop id
        if (node.id) this.#backdropId = node.id;
        else node.id = this.#backdropId;

        // Fix nested backdrop positioning
        const prevTransform = node.style.transform;
        if (node.offsetParent && node.offsetParent instanceof HTMLElement) {
            const { left, top } = node.offsetParent.getBoundingClientRect();
            node.style.transform = `translate(-${left}px, -${top}px)`;
        }

        // Close on backdrop click
        const off = on(node, 'click', () => {
            if (this.#options.closeOnBackdropClick === true) this.close();
        });

        return () => {
            off();
            node.style.transform = prevTransform;
            this.#backdropEl = undefined;
        };
    };

    /**
     * Backdrop attributes to spread on the backdrop element
     */
    get backdropAttrs(): FloatingBackdropAttributes {
        return {
            // Data attributes
            [this.#backdropDataAttr]: '',
            'data-state': this.isOpen ? 'open' : 'closed',
            // ARIA attributes
            role: 'button',
            tabindex: -1,
            // Attachment
            [this.#backdropAttachmentKey]: this.#backdropAttachment
        };
    }

    /**
     * =================
     * CONTENT
     * =================
     */

    /** Floating content element id */
    #contentId = $state(useId());
    /** Content data attribute name */
    #contentDataAttr = 'data-floating-content';
    /** Attachment key for content element */
    #contentAttachmentKey = createAttachmentKey();
    /** Attachment for content element*/
    #contentAttachment = (node: HTMLElement) => {
        this.#engine.floating = node;

        // Resolve content id
        if (node.id) this.#contentId = node.id;
        else node.id = this.#contentId;

        const offs = [
            // Trap focus inside content
            focustrap({
                enabled: this.isOpen && this.#options.focusTrap === true
            })(node),

            // Close on outside click
            clickoutside({
                enabled: this.isOpen && this.#options.closeOnOutsideClick === true,
                ignoreElements: [this.#engine.reference, this.#backdropEl].filter(Boolean) as HTMLElement[],
                onClickOutside: () => this.close()
            })(node),

            // Close on Escape key
            on(window, 'keydown', (evt: KeyboardEvent) => {
                if (this.isOpen && this.#options.closeOnEscape === true && evt.key === kbd.ESCAPE) {
                    this.close();
                }
            }),

            // Close on window resize
            on(window, 'resize', () => {
                if (this.isOpen && this.#options.closeOnResize === true) {
                    this.close();
                }
            }),

            // Close on scroll
            on(
                window,
                'scroll',
                () => {
                    if (this.isOpen && this.#options.closeOnScroll === true) {
                        this.close();
                    }
                },
                { capture: true }
            )
        ];

        // Focus element on open
        this.#focusElement(this.#options.focusOnOpen);

        return () => {
            // Restore focus on close
            this.#focusElement(this.#options.focusOnClose);
            offs.forEach((off) => off?.());
            this.#engine.floating = undefined;
        };
    };

    /**
     * Content element attributes
     */
    get contentAttrs(): FloatingContentAttributes {
        return {
            // Data attributes
            [this.#contentDataAttr]: '',
            'data-state': this.isOpen ? 'open' : 'closed',
            'data-side': this.#engine.state?.side,
            'data-align': this.#engine.state?.alignment,
            // Attachment
            [this.#contentAttachmentKey]: this.#contentAttachment,
            // Custom style
            style: this.#engine.style,
            // Other attributes from the current pattern
            ...this.#pattern.contentAttrs
        };
    }
}
