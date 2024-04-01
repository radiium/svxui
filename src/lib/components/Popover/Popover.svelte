<script lang="ts">
    import { afterUpdate } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import {
        computePosition,
        flip as flipMiddleware,
        offset as offsetMiddleware,
        arrow as arrowMiddleware,
        shift as shiftMiddleware,
        type Side,
        type Alignment
    } from '@floating-ui/dom';
    import { clickoutside } from '../../actions/clickoutside.js';
    import { focusTrap } from '../../actions/focus-trap.js';
    import { defaultPopoverProps } from './Popover.props.js';
    import type { PopoverProps } from './Popover.types.js';

    type $$Props = PopoverProps;
    export let isOpen: $$Props['isOpen'] = defaultPopoverProps.isOpen;
    export let backdrop: $$Props['backdrop'] = defaultPopoverProps.backdrop;
    export let arrow: $$Props['arrow'] = defaultPopoverProps.arrow;
    export let strategy: $$Props['strategy'] = defaultPopoverProps.strategy;
    export let placement: $$Props['placement'] = defaultPopoverProps.placement;
    export let offset: $$Props['offset'] = defaultPopoverProps.offset;
    export let flip: $$Props['flip'] = defaultPopoverProps.flip;
    export let shift: $$Props['shift'] = defaultPopoverProps.shift;
    export let transitionOpacity: $$Props['transitionOpacity'] = defaultPopoverProps.transitionOpacity;
    export let transitionY: $$Props['transitionY'] = defaultPopoverProps.transitionY;
    export let transitionDuration: $$Props['transitionDuration'] = defaultPopoverProps.transitionDuration;

    let triggerRef: HTMLDivElement | undefined = undefined;
    let arrowRef: SVGElement | undefined = undefined;
    let popoverRef: HTMLDivElement | undefined = undefined;

    let side: Side;
    let align: Alignment | 'center';

    function open(): void {
        isOpen = true;
    }

    function close(): void {
        isOpen = false;
    }

    function handlekeydown(evt: KeyboardEvent): void {
        if (evt.key === 'Escape') {
            close();
        }
    }

    afterUpdate(async () => {
        if (isOpen && triggerRef && popoverRef && ((arrow && arrowRef) || !arrow)) {
            const response = await computePosition(triggerRef, popoverRef, {
                strategy,
                placement,
                middleware: [
                    offsetMiddleware(offset ?? 0),
                    flip && flipMiddleware(),
                    shift && shiftMiddleware({ padding: 10 }),
                    arrow && arrowRef && arrowMiddleware({ element: arrowRef })
                ]
            });

            side = response.placement.split('-')[0] as Side;
            align = (response.placement.split('-')[1] || 'center') as Alignment | 'center';

            Object.assign(popoverRef?.style, {
                left: `${response.x}px`,
                top: `${response.y}px`
            });

            if (response.middlewareData.arrow && arrow && arrowRef) {
                const arrowX = response.middlewareData.arrow?.x;
                const arrowY = response.middlewareData.arrow?.y;
                const staticSide: string = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right'
                }[side]!;

                Object.assign(arrowRef.style, {
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    right: '',
                    bottom: '',
                    [staticSide]: '-5px'
                });
            }
        }
    });
</script>

<svelte:window on:keydown={handlekeydown} />

<div class="trigger-wrapper" bind:this={triggerRef}>
    <slot name="trigger" {isOpen} {open} {close} />
</div>

{#if isOpen}
    {#if backdrop}
        <div
            role="button"
            class="backdrop"
            tabindex="-1"
            in:fade={{ duration: 200 }}
            out:fade={{ duration: 0 }}
            on:click|self={close}
            on:keydown={handlekeydown}
        />
    {/if}
    <div
        use:clickoutside
        use:focusTrap
        on:clickoutside={close}
        transition:fly={{
            opacity: transitionOpacity,
            y: transitionY,
            duration: transitionDuration
        }}
        bind:this={popoverRef}
        style:position={strategy}
        role="dialog"
        class="popover"
        active={isOpen}
        data-popover
        data-state={isOpen ? 'open' : 'close'}
        data-side={side}
        data-align={align}
    >
        {#if arrow}
            <svg
                bind:this={arrowRef}
                viewBox="0 0 14 8"
                class="popover-arrow {side}"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path class="bg" d="M0 0 14 0 7 8Z" />
                <path class="border" d="M14 0 7 8 0 0" />
            </svg>
        {/if}
        <slot {isOpen} {open} {close} />
    </div>
{/if}

<style lang="scss">
    [data-popover] {
        --popover-color: var(--color);
        --popover-background: var(--background-level-2);
        --popover-border-color: var(--accent-a8);
        --popover-border-radius: var(--radius-3);
    }

    .trigger-wrapper {
        position: relative;
    }

    .backdrop {
        position: fixed;
        z-index: 10000;
        inset: 0 0 0 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        cursor: pointer;
    }

    .popover {
        top: 0;
        left: 0;
        z-index: 10002;
        color: var(--popover-color);
        background: var(--popover-background);
        border: 1px solid var(--popover-border-color);
        border-radius: var(--popover-border-radius);

        &[data-state='open'] {
            display: block;
        }

        &[data-state='close'] {
            display: none;
        }

        .popover-arrow {
            position: absolute;
            width: 14px;
            height: 7px;
            z-index: 10;
            pointer-events: none;

            path {
                &.bg {
                    fill: var(--popover-background);
                    stroke-width: 0;
                    stroke: none;
                }
                &.border {
                    fill: transparent;
                    stroke-width: 1px;
                    stroke: var(--popover-border-color);
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
