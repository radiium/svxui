<script lang="ts" module>
    let items: string[] = $state([]);
</script>

<script lang="ts">
    import { FloatingBuilder } from '$lib/builders/floating/index.js';
    import Panel from '$lib/components/panel/components/panel.svelte';
    import { autoUpdate as floatingAutoUpdate } from '@floating-ui/dom';
    import { untrack } from 'svelte';
    import { fade } from 'svelte/transition';
    import { portal as portalAttachment } from '../../../attachments/portal/index.js';
    import type { FloatingProps } from '../types.js';
    import FloatingArrow from './floating-arrow.svelte';
    import Portal from '$lib/components/portal/components/portal.svelte';
    import { buildFloatingMiddlewares } from '$lib/internals/build-floating-middlewares.js';

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
        portalTarget = '.svxui[data-theme-root]',
        // Focus config
        focusOnOpen = undefined,
        focusOnClose = undefined,
        focusTrap = false,
        // Close config
        closeOnClickBackdrop = false,
        closeOnClickOutside = false,
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

    let arrowEl: HTMLElement | undefined = $state(undefined);
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
    let zIndex = $derived(items.findIndex((o) => o === id) + 1);
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
<Portal target={portalTarget} enabled={portal}>
    <!-- <div {@attach portalAttachment({ enabled: portal, target: portalTarget })} style="display: content;"> -->
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
                    {zIndex}
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
    <!-- </div> -->
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
        /* cursor: pointer; */
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
