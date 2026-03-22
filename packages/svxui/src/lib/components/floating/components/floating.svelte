<script lang="ts" module>
    let layers: string[] = $state([]);
</script>

<script lang="ts">
    import { FloatingBuilder } from '$lib/builders/floating/index.js';
    import Panel from '$lib/components/panel/components/panel.svelte';
    import Portal from '$lib/components/portal/components/portal.svelte';
    import { buildFloatingMiddlewares } from '$lib/internals/build-floating-middlewares.js';
    import { autoUpdate as floatingAutoUpdate } from '@floating-ui/dom';
    import { untrack } from 'svelte';
    import { fade } from 'svelte/transition';
    import type { FloatingProps } from '../types.js';
    import FloatingArrow from './floating-arrow.svelte';

    let {
        ref = $bindable(),
        isOpen = $bindable(),
        onClose = undefined,
        // Theme config
        size = '3',
        color = undefined,
        variant = 'solid',
        outline = false,
        radius = undefined,
        backdrop = false,
        // Floating config
        placement = 'top',
        offset = 0,
        flip = false,
        shift = false,
        hide = false,
        autoUpdate = false,
        // Floating arrow config
        arrow = false,
        arrowWidth = undefined,
        arrowHeight = undefined,
        arrowTipRadius = undefined,
        // Portal config
        portal = false,
        portalTarget = '[data-theme-root]',
        // Focus config
        focusTrap = false,
        focusOnOpen = undefined,
        focusOnClose = undefined,
        // Close config
        closeOnBackdropClick = false,
        closeOnOutsideClick = false,
        closeOnEscape = false,
        closeOnResize = false,
        closeOnScroll = false,
        // Transition config
        transitionDelay = 0,
        transitionDuration = 150,
        // Snippets
        trigger,
        content,
        ...rest
    }: FloatingProps = $props();

    let arrowEl: SVGSVGElement | undefined = $state(undefined);
    const floating = new FloatingBuilder({
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
        get focusOnOpen() {
            return focusOnOpen;
        },
        get focusOnClose() {
            return focusOnClose;
        },
        get focusTrap() {
            return focusTrap;
        },
        get closeOnBackdropClick() {
            return closeOnBackdropClick;
        },
        get closeOnOutsideClick() {
            return closeOnOutsideClick;
        },
        get closeOnEscape() {
            return closeOnEscape;
        },
        get closeOnResize() {
            return closeOnResize;
        },
        get closeOnScroll() {
            return closeOnScroll;
        }
    });

    // Manage current active floating
    let id = $props.id();
    let active = $derived(layers.length > 0 && layers.at(-1) === id);
    let zIndex = $derived(layers.findIndex((o) => o === id) + 1);
    $effect(() => {
        if (isOpen) {
            untrack(() => layers.push(id));
        } else {
            untrack(() => (layers = layers.filter((o) => o !== id)));
        }
    });

    let cssClass = $derived([rest.class, 'floating-content']);
</script>

<!-- Reference -->
<div {...floating.triggerAttrs} class="floating-reference">
    {@render trigger?.()}
</div>

<!-- Floating -->
<Portal target={portalTarget} enabled={portal && isOpen}>
    {#if isOpen}
        <!-- Backdrop -->
        {#if backdrop}
            <div
                transition:fade={{ duration: transitionDuration, delay: transitionDelay }}
                {...floating.backdropAttrs}
                class="floating-backdrop"
                style:z-index={zIndex}
            ></div>
        {/if}

        <!-- Content -->
        <div
            transition:fade={{ duration: transitionDuration, delay: transitionDelay }}
            {...floating.contentAttrs}
            bind:this={ref}
            class={cssClass}
            style:z-index={zIndex}
            data-active={active}
        >
            <Panel {size} {color} {variant} {outline} {radius}>
                {@render content?.()}
            </Panel>

            {#if arrow}
                <FloatingArrow
                    bind:ref={arrowEl}
                    floatingState={floating.state}
                    {zIndex}
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
