<script context="module">"use strict";
let allDialog = [];
const addDialog = (dialog) => {
    if (dialog) {
        allDialog.push(dialog);
    }
};
const removeDialog = (dialog) => {
    if (dialog) {
        allDialog = allDialog.filter((m) => m !== dialog);
    }
};
const lastDialog = () => {
    return allDialog && allDialog.length > 0 ? allDialog[allDialog.length - 1] : undefined;
};
</script>

<script>import X from '../../icons/X.svelte';
import { fade, scale } from 'svelte/transition';
import { isBrowser } from '../../utils/is-browser.js';
import { focusTrap } from '../../actions/focus-trap.js';
import { clsx } from '../../utils/clsx.js';
import Button from '../Button/Button.svelte';
import { defaultDialogProps } from './Dialog.props.js';
export let isOpen = defaultDialogProps.isOpen;
export let size = defaultDialogProps.size;
export let closeOnBackdropClick = defaultDialogProps.closeOnBackdropClick;
export let closeOnEscape = defaultDialogProps.closeOnEscape;
export let showCloseButton = defaultDialogProps.showCloseButton;
export let blockScroll = defaultDialogProps.blockScroll;
let dialogRef;
$: {
    if (isOpen) {
        addDialog(dialogRef);
        if (blockScroll) {
            disableScroll();
        }
    }
    else {
        removeDialog(dialogRef);
        if (blockScroll) {
            enableScroll();
        }
    }
}
const handlekeydown = (event) => {
    if (closeOnEscape) {
        if (event.key === 'Escape') {
            close();
        }
    }
};
const open = () => {
    isOpen = true;
};
const close = () => {
    isOpen = false;
};
const onBackdropClick = () => {
    if (closeOnBackdropClick) {
        close();
    }
};
let scrollTop;
let scrollLeft;
function disableScroll() {
    if (isBrowser()) {
        scrollTop = window.scrollY || window.document.documentElement.scrollTop;
        (scrollLeft = window.scrollX || window.document.documentElement.scrollLeft),
            (window.onscroll = function () {
                window.scrollTo({
                    left: scrollLeft,
                    top: scrollTop
                });
            });
    }
}
function enableScroll() {
    if (isBrowser()) {
        window.onscroll = function () { };
    }
}
let closeButtonSize;
$: closeButtonSize = getCloseButtonSize(size);
function getCloseButtonSize(s) {
    switch (s) {
        case '4':
        case '3':
        case '2':
            return '2';
        case '1':
        case '0':
        default:
            return '1';
    }
}
$: cssClass = clsx($$restProps.class, `Dialog`, {
    [`Dialog-size-${size}`]: size
});
</script>

<svelte:window on:keydown={handlekeydown} />

{#if isOpen}
    <div id={dialogRef?.id} class={cssClass} bind:this={dialogRef}>
        <div
            role="button"
            class="Dialog-backdrop"
            tabindex="-1"
            on:click={onBackdropClick}
            on:keydown={handlekeydown}
            transition:fade={{
                duration: 250
            }}
        />

        <div
            style={$$restProps.style}
            role="dialog"
            class="Dialog-content"
            active={isOpen}
            use:focusTrap
            transition:scale={{
                start: 0.9,
                duration: 200,
                opacity: 0
            }}
        >
            {#if showCloseButton}
                <Button
                    iconOnly
                    circle
                    variant="clear"
                    size={closeButtonSize}
                    class="Dialog-close-btn"
                    on:click={() => (isOpen = false)}
                >
                    <slot name="close-icon">
                        <X />
                    </slot>
                </Button>
            {/if}

            <div class="Dialog-content-inner">
                <slot />
            </div>
        </div>
    </div>
{/if}

<style>.Dialog {
  z-index: 10000;
  position: fixed;
  overflow: auto;
  width: 100%;
  height: 100%;
  inset: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.Dialog .Dialog-backdrop {
  z-index: 10001;
  position: fixed;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  inset: 0px;
  border: none;
  background: rgba(0, 0, 0, 0.4);
}
.Dialog .Dialog-content {
  z-index: 10002;
  min-width: 30rem;
  max-width: 72vw;
  position: relative;
  color: var(--color);
  background: var(--background-level-0);
  border-radius: var(--dialog-border-radius);
  padding: var(--dialog-padding);
  margin: var(--space-8) auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  box-shadow: var(--input-box-shadow);
}
.Dialog .Dialog-content .Dialog-content-inner {
  width: 100%;
  max-height: 50vh;
  overflow: auto;
}
.Dialog :global(.Dialog-close-btn) {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
}
.Dialog.Dialog-size-0 {
  --dialog-padding: var(--space-0);
  --dialog-border-radius: var(--radius-4);
}
.Dialog.Dialog-size-1 {
  --dialog-padding: var(--space-3);
  --dialog-border-radius: var(--radius-4);
}
.Dialog.Dialog-size-2 {
  --dialog-padding: var(--space-4);
  --dialog-border-radius: var(--radius-4);
}
.Dialog.Dialog-size-3 {
  --dialog-padding: var(--space-5);
  --dialog-border-radius: var(--radius-5);
}
.Dialog.Dialog-size-4 {
  --dialog-padding: var(--space-6);
  --dialog-border-radius: var(--radius-5);
}</style>
