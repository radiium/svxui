import { clickoutside } from '$lib/attachments/clickoutside/index.js';
import { focustrap } from '$lib/attachments/focustrap/index.js';
import { getHtmlElement } from '$lib/internals/elements.js';
import { kbd } from '$lib/internals/kbd.js';
import { type FloatingEngineOptions, FloatingEngine } from '$lib/utilities/floating-engine/index.js';
import { useId } from '$lib/utilities/use-id/index.js';
import { flushSync } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { on } from 'svelte/events';
import { FloatingPattern } from './internals/floating-pattern.js';
import type { FloatingBuilderOptions, FloatingPatternState } from './types.js';

export class FloatingBuilder {
    #options: FloatingBuilderOptions;
    #engine: FloatingEngine;
    #engineOptions: FloatingEngineOptions = $derived.by(() => this.#options.engineOptions ?? {});
    #pattern: FloatingPatternState = $derived.by(() =>
        FloatingPattern.resolve({
            open: this.#options.isOpen === true,
            pattern: this.#options.pattern,
            triggerId: this.#triggerId,
            contentId: this.#contentId
        })
    );

    #backdropEl?: HTMLElement | SVGElement = $state();

    constructor(options: FloatingBuilderOptions) {
        this.#options = options;
        this.#engine = new FloatingEngine(this.#engineOptions);
    }

    get state() {
        return this.#engine.state;
    }
    get #isOpen() {
        return this.#options.isOpen;
    }

    toggle = () => (this.#options.isOpen = !this.#options.isOpen);
    open = () => (this.#options.isOpen = true);
    close = () => (this.#options.isOpen = false);

    #focusElement(el?: string | HTMLElement): void {
        if (el) {
            flushSync();
            getHtmlElement(el)?.focus();
        }
    }

    /**
     *
     * TRIGGER
     *
     */

    #triggerId = $state(useId());
    #triggerDataAttr = 'data-floating-trigger';
    #triggerAttachmentKey = createAttachmentKey();
    #triggerAttachment = (node: HTMLElement) => {
        this.#engine.reference = node;

        // Resolve trigger id
        if (node.id) this.#triggerId = node.id;
        else node.id = this.#triggerId;

        return () => {
            this.#engine.reference = undefined;
        };
    };
    get triggerAttrs() {
        return {
            [this.#triggerDataAttr]: '',
            [this.#triggerAttachmentKey]: this.#triggerAttachment,
            ...this.#pattern.triggerAttrs
        };
    }

    /**
     *
     * BACKDROP
     *
     */

    #backdropId = $state(useId());
    #backdropDataAttr = 'data-floating-backdrop';
    #backdropAttachmentKey = createAttachmentKey();
    #backdropAttachment = (node: HTMLElement) => {
        this.#backdropEl = node;

        // Resolve backdrop id
        if (node.id) this.#backdropId = node.id;
        else node.id = this.#backdropId;

        // Fix nested backdrop
        let prevTransform = node.style.transform;
        if (node.offsetParent && node.offsetParent instanceof HTMLElement) {
            const { left, top } = node.offsetParent.getBoundingClientRect();
            node.style.transform = `translate(-${left}px, -${top}px)`;
        }
        // Close on click backdrop
        const off = on(node, 'click', () => {
            if (this.#options.closeOn?.clickBackdrop === true) this.close();
        });
        return () => {
            off();
            node.style.transform = prevTransform;
            this.#backdropEl = undefined;
        };
    };
    get backdropAttrs() {
        return {
            role: 'button',
            tabindex: -1,
            [this.#backdropDataAttr]: '',
            [this.#backdropAttachmentKey]: this.#backdropAttachment
        };
    }

    /**
     *
     * CONTENT
     *
     */

    #contentId = $state(useId());
    #contentDataAttr = 'data-floating-content';
    #contentAttachmentKey = createAttachmentKey();
    #contentAttachment = (node: HTMLElement) => {
        this.#engine.floating = node;

        // Resolve content id
        if (node.id) this.#contentId = node.id;
        else node.id = this.#contentId;

        const offs = [
            // Focus trap
            focustrap({
                enabled: this.#isOpen && this.#options.focus?.trap === true,
                returnFocus: false
            })(node),
            // Close on click outside
            clickoutside({
                enabled: this.#isOpen && this.#options.closeOn?.clickOutside === true,
                ignoreElements: [this.#engine.reference, this.#backdropEl].filter(Boolean) as HTMLElement[],
                onClickOutside: () => this.close()
            })(node),
            // Close on escape
            on(window, 'keydown', (evt: KeyboardEvent) => {
                if (this.#isOpen && this.#options.closeOn?.escape === true && evt.key === kbd.ESCAPE) {
                    this.close();
                }
            }),
            // Close on resize
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

        // Focus element inside content on open
        this.#focusElement(this.#options.focus?.onOpen);

        return () => {
            // Focus element outside content
            this.#focusElement(this.#options.focus?.onClose);
            offs.forEach((off) => off?.());
            this.#engine.floating = undefined;
        };
    };
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
