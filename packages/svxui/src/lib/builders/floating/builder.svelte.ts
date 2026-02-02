import { clickoutside } from '$lib/attachments/clickoutside/index.js';
import { focustrap } from '$lib/attachments/focustrap/index.js';
import { getHtmlElement } from '$lib/internals/elements.js';
import { kbd } from '$lib/internals/kbd.js';
import { FloatingEngine, type FloatingEngineOptions } from '$lib/utilities/floating-engine/index.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { flushSync } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { on } from 'svelte/events';
import { FloatingPattern, type FloatingPatternState } from './internals/floating-pattern.js';
import type { FloatingBuilderOptions } from './types.js';

/**
 * Builder class for creating accessible floating UI elements like tooltips and popovers. It connects triggers, content, and optional backdrops to a positioning engine while handling focus management, ARIA patterns, and common close behaviors (outside click, escape, scroll, resize).
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
            open: this.#options.isOpen === true,
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
     * Returns whether the floating element is open
     */
    get #isOpen() {
        return this.#options.isOpen;
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
    get triggerAttrs() {
        return {
            [this.#triggerDataAttr]: '',
            [this.#triggerAttachmentKey]: this.#triggerAttachment,
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
        let prevTransform = node.style.transform;
        if (node.offsetParent && node.offsetParent instanceof HTMLElement) {
            const { left, top } = node.offsetParent.getBoundingClientRect();
            node.style.transform = `translate(-${left}px, -${top}px)`;
        }

        // Close on backdrop click
        const off = on(node, 'click', () => {
            if (this.#options.closeOn?.clickBackdrop === true) this.close();
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
    get backdropAttrs() {
        return {
            role: 'button',
            tabindex: -1,
            [this.#backdropDataAttr]: '',
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
                enabled: this.#isOpen && this.#options.focus?.trap === true
            })(node),

            // Close on outside click
            clickoutside({
                enabled: this.#isOpen && this.#options.closeOn?.clickOutside === true,
                ignoreElements: [this.#engine.reference, this.#backdropEl].filter(Boolean) as HTMLElement[],
                onClickOutside: () => this.close()
            })(node),

            // Close on Escape key
            on(window, 'keydown', (evt: KeyboardEvent) => {
                if (this.#isOpen && this.#options.closeOn?.escape === true && evt.key === kbd.ESCAPE) {
                    this.close();
                }
            }),

            // Close on window resize
            on(window, 'resize', () => {
                if (this.#isOpen && this.#options.closeOn?.resize === true) {
                    this.close();
                }
            }),

            // Close on scroll
            on(
                window,
                'scroll',
                () => {
                    if (this.#isOpen && this.#options.closeOn?.scroll === true) {
                        this.close();
                    }
                },
                { capture: true }
            )
        ];

        // Focus element on open
        this.#focusElement(this.#options.focus?.onOpen);

        return () => {
            // Restore focus on close
            this.#focusElement(this.#options.focus?.onClose);
            offs.forEach((off) => off?.());
            this.#engine.floating = undefined;
        };
    };

    /**
     * Content element attributes
     */
    get contentAttrs() {
        return {
            'data-state': this.#isOpen ? 'open' : 'close',
            'data-side': this.#engine.state?.side,
            'data-align': this.#engine.state?.alignment,
            [this.#contentDataAttr]: '',
            [this.#contentAttachmentKey]: this.#contentAttachment,
            style: this.#engine.style,
            ...this.#pattern.contentAttrs
        };
    }
}
