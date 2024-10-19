<script lang="ts">
    import { createFloating } from '$lib/actions/create-floating/create-floating.js';
    import { clsx } from '$lib/utils/clsx.js';
    import { fade } from 'svelte/transition';
    import { clickoutsideAction } from '../../actions/clickoutside.action.js';
    import Portal from '../Portal/Portal.svelte';
    import { defaultFloatingProps } from './Floating.props.js';
    import type { FloatingProps } from './Floating.types.js';

    type $$Props = FloatingProps;
    export let elementRef: $$Props['elementRef'] = defaultFloatingProps.elementRef;
    export let isOpen: $$Props['isOpen'] = defaultFloatingProps.isOpen;
    export let size: $$Props['size'] = defaultFloatingProps.size;
    export let radius: $$Props['radius'] = defaultFloatingProps.radius;
    export let backdrop: $$Props['backdrop'] = defaultFloatingProps.backdrop;
    export let closeOnClickBackdrop: $$Props['closeOnClickBackdrop'] = defaultFloatingProps.closeOnEscape;
    export let closeOnClickOutside: $$Props['closeOnClickOutside'] = defaultFloatingProps.closeOnClickOutside;
    export let closeOnEscape: $$Props['closeOnEscape'] = defaultFloatingProps.closeOnEscape;
    export let closeOnResize: $$Props['closeOnResize'] = defaultFloatingProps.closeOnResize;
    export let closeOnScroll: $$Props['closeOnScroll'] = defaultFloatingProps.closeOnScroll;
    export let arrow: $$Props['arrow'] = defaultFloatingProps.arrow;
    export let flip: $$Props['flip'] = defaultFloatingProps.flip;
    export let shift: $$Props['arrow'] = defaultFloatingProps.shift;
    export let hide: $$Props['hide'] = defaultFloatingProps.hide;
    export let placement: $$Props['placement'] = defaultFloatingProps.placement;
    export let offset: $$Props['offset'] = defaultFloatingProps.offset;
    export let outline: $$Props['outline'] = defaultFloatingProps.outline;
    export let autoUpdate: $$Props['autoUpdate'] = defaultFloatingProps.autoUpdate;
    export let portal: $$Props['portal'] = defaultFloatingProps.portal;
    export let transitionDelay: $$Props['transitionDelay'] = defaultFloatingProps.transitionDelay;
    export let transitionDuration: $$Props['transitionDuration'] = defaultFloatingProps.transitionDuration;

    const {
        actions: { referenceAction, floatingAction, arrowAction },
        states: { updateProps, props, state }
    } = createFloating({
        strategy: 'absolute',
        transform: true,
        autoUpdate,
        placement,
        arrow,
        flip,
        shift,
        hide,
        offset: 0
    });

    $: {
        size && outline;
        updateProps({ arrow, placement, offset, autoUpdate });
    }

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
    function handlekeydown(evt: KeyboardEvent): void {
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

    $: cssClassFloating = clsx($$restProps.class, 'Floating-content', {
        'Floating-outline': outline,
        [`Floating-size-${size}`]: size
    });
</script>

<!-- Handle windows events close -->
<svelte:window on:keydown={handlekeydown} on:resize={handleResize} />
<svelte:body on:scroll|capture={handleScroll} />

<!-- Reference button -->
<div use:referenceAction class="Floating-reference">
    <slot name="trigger" />
</div>

<Portal target=".svxui[data-theme-root='true']" disabled={!portal}>
    {#if isOpen}
        <!-- Backfrop -->
        {#if backdrop}
            <div
                role="button"
                class="Floating-backdrop"
                tabindex="-1"
                transition:fade={{ duration: transitionDuration, delay: transitionDelay }}
                on:click|self={handleClickBackdrop}
                on:keydown={handlekeydown}
            ></div>
        {/if}

        <!-- Content -->
        <div
            use:floatingAction
            use:clickoutsideAction
            on:clickoutside={handleClickOutside}
            transition:fade={{ duration: transitionDuration, delay: transitionDelay }}
            class={cssClassFloating}
            role="dialog"
            active={isOpen}
            data-floating
            data-state={isOpen ? 'open' : 'close'}
            data-side={$state?.side}
            data-align={$state?.align}
            data-size={size}
            data-radius={radius}
            style={$$restProps.style}
            bind:this={elementRef}
        >
            {#if arrow}
                <svg
                    use:arrowAction
                    class="Floating-arrow {$state?.side}"
                    viewBox="0 0 14 8"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path class="bg" d="M0 0 14 0 7 8Z" />
                    {#if outline}
                        <path class="outline" d="M14 0 7 8 0 0" />
                    {/if}
                </svg>
            {/if}
            <slot name="content" />
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

    [data-floating] {
        --floating-color: var(--color);
        --floating-background: var(--color-background-2);
        --floating-border-color: var(--accent-a8);
    }

    .Floating-content {
        position: absolute;
        width: max-content;
        top: 0;
        left: 0;

        z-index: 10002;
        color: var(--floating-color);
        background: var(--floating-background);
        border: none;
        padding: var(--floating-padding);
        border-radius: var(--floating-border-radius);

        &[data-state='open'] {
            display: block;
        }

        &[data-state='close'] {
            display: none;
        }

        // Outline
        &.Floating-outline {
            border: 1px solid var(--floating-border-color);
        }

        // Sizes
        &.Floating-size-0 {
            --floating-padding: var(--space-0);
            --floating-border-radius: var(--radius-3);
        }
        &.Floating-size-1 {
            --floating-padding: var(--space-3);
            --floating-border-radius: var(--radius-4);
        }
        &.Floating-size-2 {
            --floating-padding: var(--space-4);
            --floating-border-radius: var(--radius-4);
        }
        &.Floating-size-3 {
            --floating-padding: var(--space-5);
            --floating-border-radius: var(--radius-5);
        }
        &.Floating-size-4 {
            --floating-padding: var(--space-6);
            --floating-border-radius: var(--radius-5);
        }
        &.Floating-size-5 {
            --floating-padding: var(--space-8);
            --floating-border-radius: var(--radius-6);
        }

        .Floating-arrow {
            position: absolute;
            width: 14px;
            height: 7px;
            z-index: 10;
            pointer-events: none;

            path {
                &.bg {
                    fill: var(--floating-background);
                    stroke-width: 0;
                    stroke: none;
                }
                &.outline {
                    fill: transparent;
                    stroke-width: 1px;
                    stroke: var(--floating-border-color);
                }
            }
            &.top {
                transform: rotate(0deg) translateY(2px);
            }
            &.bottom {
                transform: rotate(180deg) translateY(2px);
            }
            &.left {
                transform: rotate(-90deg) translateY(5.5px);
            }
            &.right {
                transform: rotate(90deg) translateY(5.5px);
            }
        }
    }
</style>
