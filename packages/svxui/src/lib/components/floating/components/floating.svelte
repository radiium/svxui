<script lang="ts" module>
    let items: string[] = $state([]);
</script>

<script lang="ts">
    import Panel from '$lib/components/panel/components/panel.svelte';
    import { buildFloatingMiddlewares } from '$lib/utilities/floating-engine/internals/build-floating-middlewares.js';
    import { FloatingState } from '$lib/utilities/index.js';
    import { autoUpdate as floatingAutoUpdate } from '@floating-ui/dom';
    import { untrack } from 'svelte';
    import { fade } from 'svelte/transition';
    import { Portal } from '../../portal/index.js';
    import { defaultFloatingProps } from '../props.js';
    import type { FloatingProps } from '../types.js';
    import FloatingArrow from './floating-arrow.svelte';

    let {
        ref = $bindable(),
        isOpen = $bindable(),
        onClose = defaultFloatingProps.onClose,
        // Theme config
        size = defaultFloatingProps.size,
        color = defaultFloatingProps.color,
        variant = defaultFloatingProps.variant,
        outline = defaultFloatingProps.outline,
        radius = defaultFloatingProps.radius,
        backdrop = defaultFloatingProps.backdrop,
        // Floating config
        autoUpdate = defaultFloatingProps.autoUpdate,
        placement = defaultFloatingProps.placement,
        offset = defaultFloatingProps.offset,
        flip = defaultFloatingProps.flip,
        shift = defaultFloatingProps.shift,
        hide = defaultFloatingProps.hide,
        // Floating arrow config
        arrow = defaultFloatingProps.arrow,
        arrowWidth = defaultFloatingProps.arrowWidth,
        arrowHeight = defaultFloatingProps.arrowHeight,
        arrowTipRadius = defaultFloatingProps.arrowTipRadius,
        // Portal config
        portal = defaultFloatingProps.portal,
        portalTarget = defaultFloatingProps.portalTarget,
        // Focus config
        focusOnOpen = defaultFloatingProps.focusOnOpen,
        focusOnClose = defaultFloatingProps.focusOnClose,
        focusTrap = defaultFloatingProps.focusTrap,
        // Close config
        closeOnClickBackdrop = defaultFloatingProps.closeOnEscape,
        closeOnClickOutside = defaultFloatingProps.closeOnClickOutside,
        closeOnEscape = defaultFloatingProps.closeOnEscape,
        closeOnResize = defaultFloatingProps.closeOnResize,
        closeOnScroll = defaultFloatingProps.closeOnScroll,
        // Transition config
        transitionDelay = defaultFloatingProps.transitionDelay,
        transitionDuration = defaultFloatingProps.transitionDuration,
        // Snippets
        trigger,
        content,
        ...rest
    }: FloatingProps = $props();

    let arrowEl: HTMLElement | undefined = $state(undefined);
    const floating = new FloatingState({
        // pattern: 'popover',
        get isOpen() {
            return isOpen === true;
        },
        set isOpen(newIsOpen: boolean) {
            isOpen = newIsOpen;
            if (!isOpen) onClose?.();
        },
        engineOptions: {
            strategy: 'fixed',
            transform: true,
            get placement() {
                return placement;
            },
            get whileElementsMounted() {
                return autoUpdate ? floatingAutoUpdate : undefined;
            },
            get middleware() {
                return buildFloatingMiddlewares({
                    offset, //
                    flip,
                    shift,
                    hide,
                    arrow,
                    arrowEl
                });
            }
        },
        focus: {
            get onOpen() {
                return focusOnOpen;
            },
            get onClose() {
                return focusOnClose;
            },
            get trap() {
                return focusTrap;
            }
        },
        closeOn: {
            get clickBackdrop() {
                return closeOnClickBackdrop;
            },
            get clickOutside() {
                return closeOnClickOutside;
            },
            get escape() {
                return closeOnEscape;
            },
            get resize() {
                return closeOnResize;
            },
            get scroll() {
                return closeOnScroll;
            }
        }
    });

    // Manage current active floating
    let id = $props.id();
    let active = $derived(items.length > 0 && items.at(-1) === id);
    let index = $derived(items.findIndex((o) => o === id));
    $effect(() => {
        if (isOpen) {
            untrack(() => items.push(id));
        } else {
            untrack(() => (items = items.filter((o) => o !== id)));
        }
    });

    let cssClass = $derived([rest.class, 'floating-content']);
</script>

<!-- Reference -->
<div {...floating.triggerAttrs} class="floating-reference">
    {@render trigger?.()}
</div>

<!-- Floating -->
<Portal target={portalTarget} disabled={!portal}>
    {#if isOpen}
        <!-- Backdrop -->
        {#if backdrop}
            <div
                transition:fade={{ duration: transitionDuration, delay: transitionDelay }}
                {...floating.backdropAttrs}
                class="floating-backdrop"
                style:z-index={index}
            ></div>
        {/if}

        <!-- Content -->
        <div
            transition:fade={{ duration: transitionDuration, delay: transitionDelay }}
            {...floating.contentAttrs}
            bind:this={ref}
            class={cssClass}
            style:z-index={index}
            data-active={active}
        >
            <Panel {size} {color} {variant} {outline} {radius}>
                {@render content?.()}
            </Panel>

            {#if arrow}
                <FloatingArrow
                    bind:ref={arrowEl}
                    zIndex={index}
                    floatingState={floating.state}
                    {color}
                    {variant}
                    {outline}
                    width={arrowWidth}
                    height={arrowHeight}
                    tipRadius={arrowTipRadius}
                />
            {/if}
        </div>
    {/if}
</Portal>

<style>
    .floating-reference {
        position: relative;
        display: flex;
        width: max-content;
        height: max-content;
    }

    .floating-backdrop {
        position: fixed;
        z-index: 0;
        inset: 0 0 0 0;
        width: 100vw;
        height: 100vh;
        cursor: pointer;
        background: var(--color-overlay);
    }

    .floating-content {
        position: fixed;
        width: max-content;
        top: 0;
        left: 0;

        &[data-state='open'] {
            display: block;
        }

        &[data-state='close'] {
            display: none;
        }
    }
</style>
