<script>import { afterUpdate } from 'svelte';
import { fade, fly } from 'svelte/transition';
import { computePosition, flip as flipMiddleware, offset as offsetMiddleware, arrow as arrowMiddleware, shift as shiftMiddleware } from '@floating-ui/dom';
import { clickoutside } from '../../actions/clickoutside.js';
import { focusTrap } from '../../actions/focus-trap.js';
import { defaultPopoverProps } from './Popover.props.js';
export let isOpen = defaultPopoverProps.isOpen;
export let backdrop = defaultPopoverProps.backdrop;
export let arrow = defaultPopoverProps.arrow;
export let strategy = defaultPopoverProps.strategy;
export let placement = defaultPopoverProps.placement;
export let offset = defaultPopoverProps.offset;
export let flip = defaultPopoverProps.flip;
export let shift = defaultPopoverProps.shift;
export let transitionOpacity = defaultPopoverProps.transitionOpacity;
export let transitionY = defaultPopoverProps.transitionY;
export let transitionDuration = defaultPopoverProps.transitionDuration;
let triggerRef = undefined;
let arrowRef = undefined;
let popoverRef = undefined;
let side;
let align;
function open() {
    isOpen = true;
}
function close() {
    isOpen = false;
}
function handlekeydown(evt) {
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
        side = response.placement.split('-')[0];
        align = (response.placement.split('-')[1] || 'center');
        Object.assign(popoverRef?.style, {
            left: `${response.x}px`,
            top: `${response.y}px`
        });
        if (response.middlewareData.arrow && arrow && arrowRef) {
            const arrowX = response.middlewareData.arrow?.x;
            const arrowY = response.middlewareData.arrow?.y;
            const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right'
            }[side];
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

<style>[data-popover] {
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
}
.popover[data-state=open] {
  display: block;
}
.popover[data-state=close] {
  display: none;
}
.popover .popover-arrow {
  position: absolute;
  width: 14px;
  height: 7px;
  z-index: 10;
  pointer-events: none;
}
.popover .popover-arrow path.bg {
  fill: var(--popover-background);
  stroke-width: 0;
  stroke: none;
}
.popover .popover-arrow path.border {
  fill: transparent;
  stroke-width: 1px;
  stroke: var(--popover-border-color);
}
.popover .popover-arrow.top {
  transform: rotate(0deg) translateY(2px);
}
.popover .popover-arrow.bottom {
  transform: rotate(180deg) translateY(2px);
}
.popover .popover-arrow.left {
  transform: rotate(-90deg) translateY(5.5px);
}
.popover .popover-arrow.right {
  transform: rotate(90deg) translateY(5.5px);
}</style>
