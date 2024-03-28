<script context="module" lang="ts">
    let allDialog: HTMLDivElement[] = [];

    const addDialog = (dialog: HTMLDivElement) => {
        if (dialog) {
            allDialog.push(dialog);
        }
    };

    const removeDialog = (dialog: HTMLDivElement) => {
        if (dialog) {
            allDialog = allDialog.filter((m: HTMLDivElement) => m !== dialog);
        }
    };

    const lastDialog = () => {
        return allDialog && allDialog.length > 0 ? allDialog[allDialog.length - 1] : undefined;
    };
</script>

<script lang="ts">
    import X from '../../icons/X.svelte';
    import { fade, scale } from 'svelte/transition';
    import { isBrowser } from '../../utils/is-browser.js';
    import { focusTrap } from '../../actions/focus-trap.js';
    import { clsx } from '../../utils/clsx.js';
    import Button from '../Button/Button.svelte';
    import { defaultDialogProps } from './Dialog.props.js';
    import type { DialogProps } from './Dialog.types.js';
    import type { Sizes1To3, Sizes1To4 } from '$lib/constants.js';

    type $$Props = DialogProps;
    export let isOpen: $$Props['isOpen'] = defaultDialogProps.isOpen;
    export let size: $$Props['size'] = defaultDialogProps.size;
    export let closeOnBackdropClick: $$Props['closeOnBackdropClick'] =
        defaultDialogProps.closeOnBackdropClick;
    export let closeOnEscape: $$Props['closeOnEscape'] = defaultDialogProps.closeOnEscape;
    export let showCloseButton: $$Props['showCloseButton'] = defaultDialogProps.showCloseButton;
    export let blockScroll: $$Props['blockScroll'] = defaultDialogProps.blockScroll;

    let dialogRef: HTMLDivElement;

    $: {
        if (isOpen) {
            addDialog(dialogRef);
            if (blockScroll) {
                disableScroll();
            }
        } else {
            removeDialog(dialogRef);
            if (blockScroll) {
                enableScroll();
            }
        }
    }

    const handlekeydown = (event: KeyboardEvent) => {
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

    let scrollTop: number | undefined;
    let scrollLeft: number | undefined;

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
            window.onscroll = function () {};
        }
    }

    let closeButtonSize: (typeof Sizes1To4)[number];
    $: closeButtonSize = Number(size) >= 2 ? '2' : size!;

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

<style lang="scss">
    .Dialog {
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

        .Dialog-backdrop {
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

        .Dialog-content {
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
            @include input-box-shadow;
            .Dialog-content-inner {
                width: 100%;
                max-height: 50vh;
                overflow: auto;
            }
        }

        :global(.Dialog-close-btn) {
            position: absolute;
            top: var(--space-2);
            right: var(--space-2);
        }

        // Sizes
        &.Dialog-size-1 {
            --dialog-padding: var(--space-3);
            --dialog-border-radius: var(--radius-4);
        }
        &.Dialog-size-2 {
            --dialog-padding: var(--space-4);
            --dialog-border-radius: var(--radius-4);
        }
        &.Dialog-size-3 {
            --dialog-padding: var(--space-5);
            --dialog-border-radius: var(--radius-5);
        }
        &.Dialog-size-4 {
            --dialog-padding: var(--space-6);
            --dialog-border-radius: var(--radius-5);
        }
    }
</style>
