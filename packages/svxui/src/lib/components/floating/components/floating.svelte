<script lang="ts">
    import Panel from '$lib/components/panel/components/panel.svelte';
    import { useFloatingMiddleware } from '$lib/hooks/floating/hooks/use-floating-middleware.svelte.js';
    import { useFloating } from '$lib/hooks/floating/index.js';
    import { clsx } from '$lib/utils/clsx.js';
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

    const floating = useFloating({
        strategy: 'fixed',
        transform: true,
        get whileElementsMounted() {
            return autoUpdate ? floatingAutoUpdate : undefined;
        },
        get placement() {
            return placement;
        },
        get middleware() {
            return useFloatingMiddleware({ offset, flip, shift, hide, arrow, arrowEl });
        }
    });

    function handleClickBackdrop(): void {
        if (closeOnClickBackdrop) {
            isOpen = false;
        }
    }

    function handleClickOutside(): void {
        if (closeOnClickOutside) {
            isOpen = false;
        }
    }
    function handleKeydown(evt: KeyboardEvent): void {
        if (closeOnEscape && evt.key === 'Escape') {
            isOpen = false;
        }
    }

    function handleResize(): void {
        if (closeOnResize) {
            isOpen = false;
        }
    }

    function handleScroll(): void {
        if (closeOnScroll) {
            isOpen = false;
        }
    }

    let cssClass = $derived(clsx(rest.class, 'Floating-content'));
</script>

<!-- Handle globals events -->
<svelte:window onkeydown={handleKeydown} onresize={handleResize} />
<svelte:body onscrollcapture={handleScroll} />

<!-- Reference button -->
<div bind:this={floating.reference} class="Floating-reference">
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
                class="Floating-backdrop"
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
            <Panel {color} {variant} {radius}>
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

<style lang="scss">
    .Floating-backdrop {
        position: fixed;
        z-index: 10000;
        inset: 0 0 0 0;
        width: 100vw;
        height: 100vh;
        background: var(--color-overlay);
        cursor: pointer;
    }

    .Floating-reference {
        position: relative;
        display: flex;
        width: max-content;
        height: max-content;
    }

    .Floating-content {
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
