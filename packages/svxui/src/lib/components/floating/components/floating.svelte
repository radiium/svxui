<script lang="ts">
    import Panel from '$lib/components/panel/components/panel.svelte';
    import { FloatingStateManager } from '$lib/index.js';
    import { buildFloatingMiddlewares } from '$lib/utils/floating/utils/build-floating-middlewares.js';
    import { autoUpdate as floatingAutoUpdate } from '@floating-ui/dom';
    import { fade } from 'svelte/transition';
    import { clickOutsideAction } from '../../../actions/clickoutside/index.js';
    import { Portal } from '../../portal/index.js';
    import { defaultFloatingProps } from '../props.js';
    import type { FloatingProps } from '../types.js';
    import FloatingArrow from './floating-arrow.svelte';

    let {
        elementRef = $bindable(),
        isOpen = $bindable(),
        onClose = defaultFloatingProps.onClose,
        size = defaultFloatingProps.size,
        color = defaultFloatingProps.color,
        variant = defaultFloatingProps.variant,
        radius = defaultFloatingProps.radius,

        autoUpdate = defaultFloatingProps.autoUpdate,
        placement = defaultFloatingProps.placement,
        offset = defaultFloatingProps.offset,
        arrow = defaultFloatingProps.arrow,
        flip = defaultFloatingProps.flip,
        shift = defaultFloatingProps.shift,
        hide = defaultFloatingProps.hide,

        backdrop = defaultFloatingProps.backdrop,
        portal = defaultFloatingProps.portal,
        portalTarget = defaultFloatingProps.portalTarget,

        closeOnClickBackdrop = defaultFloatingProps.closeOnEscape,
        closeOnClickOutside = defaultFloatingProps.closeOnClickOutside,
        closeOnEscape = defaultFloatingProps.closeOnEscape,
        closeOnResize = defaultFloatingProps.closeOnResize,
        closeOnScroll = defaultFloatingProps.closeOnScroll,

        transitionDelay = defaultFloatingProps.transitionDelay,
        transitionDuration = defaultFloatingProps.transitionDuration,

        trigger,
        content,
        ...rest
    }: FloatingProps = $props();

    let arrowEl: HTMLElement | undefined = $state(undefined);

    const floating = new FloatingStateManager({
        strategy: 'fixed',
        transform: true,
        get whileElementsMounted() {
            return autoUpdate ? floatingAutoUpdate : undefined;
        },
        get placement() {
            return placement;
        },
        get middleware() {
            return buildFloatingMiddlewares({ offset, flip, shift, hide, arrow, arrowEl });
        }
    });

    function close(): void {
        isOpen = false;
        onClose?.();
    }

    function handleClickBackdrop(): void {
        if (closeOnClickBackdrop) {
            close();
        }
    }

    function handleClickOutside(evt: CustomEvent<MouseEvent>): void {
        if (closeOnClickOutside && !isEventInElement(evt.detail)) {
            close();
        }
    }
    function handleKeydown(evt: KeyboardEvent): void {
        if (closeOnEscape && evt.key === 'Escape') {
            close();
        }
    }

    function handleResize(): void {
        if (closeOnResize) {
            close();
        }
    }

    function handleScroll(): void {
        if (closeOnScroll) {
            close();
        }
    }

    function isEventInElement(event: MouseEvent) {
        const rect = floating.reference?.getBoundingClientRect();
        if (rect) {
            const x = event.clientX;
            if (x < rect.left || x >= rect.right) {
                return false;
            }
            const y = event.clientY;
            if (y < rect.top || y >= rect.bottom) {
                return false;
            }
            return true;
        }
        return false;
    }

    let cssClass = $derived([rest.class, 'floating-content']);
</script>

<!-- Handle globals events -->
<svelte:window onkeydown={handleKeydown} onresize={handleResize} onscrollcapture={handleScroll} />

<!-- Reference button -->
<div bind:this={floating.reference} class="floating-reference">
    {@render trigger?.()}
</div>

<Portal target={portalTarget as string} disabled={!portal}>
    {#if isOpen}
        <!-- Backdrop -->
        {#if backdrop}
            <div
                transition:fade={{ duration: transitionDuration, delay: transitionDelay }}
                onclick={handleClickBackdrop}
                onkeydown={handleKeydown}
                class="floating-backdrop"
                role="button"
                tabindex="-1"
            ></div>
        {/if}

        <!-- Content -->
        <div
            transition:fade={{ duration: transitionDuration, delay: transitionDelay }}
            bind:this={floating.floating}
            bind:this={elementRef}
            use:clickOutsideAction
            onclickoutside={handleClickOutside}
            style={floating.style}
            class={cssClass}
            role="dialog"
            data-floating
            data-state={isOpen ? 'open' : 'close'}
            data-side={floating.state?.side}
            data-align={floating.state?.alignment}
        >
            <Panel {size} {color} {variant} {radius}>
                {#if arrow}
                    <FloatingArrow
                        bind:elementRef={arrowEl}
                        floatingState={floating.state}
                        {color}
                        {variant}
                    />
                {/if}
                {@render content?.()}
            </Panel>
        </div>
    {/if}
</Portal>

<style>
    .floating-backdrop {
        position: fixed;
        z-index: 10000;
        inset: 0 0 0 0;
        width: 100vw;
        height: 100vh;
        background: var(--color-overlay);
        cursor: pointer;
    }

    .floating-reference {
        position: relative;
        display: flex;
        width: max-content;
        height: max-content;
    }

    .floating-content {
        position: fixed;
        width: max-content;
        top: 0;
        left: 0;
        z-index: 10002;

        &[data-state='open'] {
            display: block;
        }

        &[data-state='close'] {
            display: none;
        }
    }
</style>
