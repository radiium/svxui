import type { Attachment } from 'svelte/attachments';
import type { ClickoutsideOptions } from './types.js';

/**
 * @description Detects clicks outside a bound element and triggers a callback. Typically used to close dropdowns, modals, or popovers.
 */
export function clickoutside(options: ClickoutsideOptions): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        const {
            onClickOutside,
            enabled = true,
            ignoreElements = [],
            eventType = 'pointerdown',
            eventTarget = document
        } = options;

        if (!onClickOutside) {
            throw new Error('clickoutside: onClickOutside callback is required');
        }

        function onClick(event: Event) {
            if (!enabled) return;

            const target = event.target as Node | null;
            if (!target) return;

            // Ignore clicks inside the main node
            if (node.contains(target)) return;

            // Ignore clicks inside any ignored elements
            for (const el of ignoreElements) {
                if (el && el.contains(target)) return;
            }

            onClickOutside(event as MouseEvent | PointerEvent);
        }

        // Use capture phase to detect events early
        eventTarget.addEventListener(eventType, onClick, true);

        return () => {
            eventTarget.removeEventListener(eventType, onClick, true);
        };
    };
}

export type ClickoutsideCallback = (event: Event) => void;

export type ClickoutsideProps = {
    /**
     * Enable or disable the listener dynamically.
     * @default true
     */
    enabled?: boolean;
    /**
     * Root element to listen on.
     * @default document
     */
    root?: Document | HTMLElement | ShadowRoot;
    /**
     * Elements to exclude from clickoutside detection.
     * @default []
     */
    exclude?: Element[];
    /**
     * Event type to listen for.
     * @default 'click'
     */
    eventType?: 'click' | 'mousedown' | 'pointerdown' | 'contextmenu';
    /**
     * Event listener options (capture phase, passive, etc.).
     * @default true
     */
    eventOptions?: AddEventListenerOptions | boolean;
    /**
     * Delay before activating the listener (ms).
     * @default 10
     */
    delay?: number;
};
export function clickoutside2(
    callback: ClickoutsideCallback,
    props?: ClickoutsideProps
): Attachment<HTMLElement> {
    return (node: HTMLElement) => {
        let config = {
            enabled: props?.enabled ?? true,
            root: props?.root ?? document,
            exclude: props?.exclude?.filter(Boolean) ?? [],
            eventType: props?.eventType ?? 'click',
            eventOptions:
                typeof props?.eventOptions === 'boolean' //
                    ? { capture: props.eventOptions }
                    : (props?.eventOptions ?? { capture: true }),
            delay:
                typeof props?.delay === 'number' && props.delay >= 0 //
                    ? props?.delay
                    : 10
        };

        if (!config.enabled) return () => {};

        function handler(event: Event): void {
            const target = event.target as Node;
            if (
                node && //
                node.isConnected &&
                !node.contains(target) &&
                !config.exclude.some((el) => el?.contains(target)) &&
                !event.defaultPrevented
            ) {
                callback?.(event);
            }
        }

        let offEvent: (() => void) | undefined;
        const timeoutId = setTimeout(() => {
            config.root.addEventListener(config.eventType, handler, config.eventOptions);
            offEvent = () => {
                config.root.removeEventListener(config.eventType, handler, config.eventOptions);
            };
        }, config.delay);

        return () => {
            clearTimeout(timeoutId);
            offEvent?.();
        };
    };
}
