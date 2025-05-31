<script module lang="ts">
    let allDialog: HTMLDivElement[] = [];

    const addDialog = (dialog?: HTMLDivElement) => {
        if (dialog && !allDialog.includes(dialog)) {
            allDialog.push(dialog);
        }
    };

    const removeDialog = (dialog?: HTMLDivElement) => {
        if (dialog && allDialog.includes(dialog)) {
            allDialog = allDialog.filter((m: HTMLDivElement) => m !== dialog);
        }
    };
</script>

<script lang="ts">
    import { focusTrapAction } from '$lib/actions/focustrap/index.js';
    import { lockScrollAction } from '$lib/actions/lockscroll/action.svelte.js';
    import { untrack } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { defaultDialogProps } from '../props.js';
    import type { DialogProps } from '../types.js';

    let {
        elementRef = $bindable(),
        isOpen = $bindable(),
        onClose = defaultDialogProps.onClose,
        size = defaultDialogProps.size,
        radius = defaultDialogProps.radius,
        noPadding = defaultDialogProps.noPadding,
        fullScreen = defaultDialogProps.fullScreen,
        closeOnBackdropClick = defaultDialogProps.closeOnBackdropClick,
        closeOnEscape = defaultDialogProps.closeOnEscape,
        lockScroll = defaultDialogProps.lockScroll,
        transitionDelay = defaultDialogProps.transitionDelay,
        transitionDuration = defaultDialogProps.transitionDuration,
        width = defaultDialogProps.width,
        minWidth = defaultDialogProps.minWidth,
        maxWidth = defaultDialogProps.maxWidth,
        height = defaultDialogProps.height,
        minHeight = defaultDialogProps.minHeight,
        maxHeight = defaultDialogProps.maxHeight,
        children,
        ...rest
    }: DialogProps = $props();

    function close(): void {
        isOpen = false;
        onClose?.();
    }
    function handlekeydown(event: KeyboardEvent): void {
        if (closeOnEscape) {
            if (event.key === 'Escape') {
                close();
            }
        }
    }

    function onBackdropClick(): void {
        if (closeOnBackdropClick) {
            close();
        }
    }

    $effect(() => {
        if (isOpen) {
            addDialog(untrack(() => elementRef));
        } else {
            removeDialog(untrack(() => elementRef));
        }
    });

    let cssClass = $derived([
        rest.class,
        `dialog`,
        {
            [`dialog-size-${size}`]: size,
            [`dialog-no-padding`]: noPadding,
            [`dialog-fullscreen`]: fullScreen
        }
    ]);

    let lockScrollEnabled = $derived(lockScroll === true && isOpen === true);
    let focusTrapEnabled = $derived(isOpen === true);
</script>

<svelte:window onkeydown={handlekeydown} />
<svelte:body use:lockScrollAction={{ enabled: lockScrollEnabled }} />

{#if isOpen}
    <div class={cssClass} data-size={size} data-radius={radius} bind:this={elementRef}>
        <div
            role="button"
            class="dialog-backdrop"
            tabindex="-1"
            onclick={onBackdropClick}
            onkeydown={handlekeydown}
            transition:fade={{
                duration: transitionDuration,
                delay: transitionDelay
            }}
        ></div>

        <div
            style:width={fullScreen ? undefined : width}
            style:min-width={fullScreen ? undefined : minWidth}
            style:max-width={fullScreen ? undefined : maxWidth}
            style:height={fullScreen ? undefined : height}
            style:min-height={fullScreen ? undefined : minHeight}
            style:max-height={fullScreen ? undefined : maxHeight}
            role="dialog"
            class="dialog-content"
            data-size={size}
            data-radius={radius}
            use:focusTrapAction={{ enabled: focusTrapEnabled }}
            transition:scale={{
                duration: transitionDuration,
                delay: transitionDelay,
                start: 0.9,
                opacity: 0
            }}
        >
            {@render children?.()}
        </div>
    </div>
{/if}

<style>
    .dialog {
        z-index: 100000;
        position: fixed;
        overflow: auto;
        width: 100%;
        height: 100%;
        inset: 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .dialog-backdrop {
            z-index: 10001;
            position: fixed;
            overflow: hidden;
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
            inset: 0px;
            border: none;
            background: var(--color-overlay);
        }

        .dialog-content {
            z-index: 10002;
            position: relative;
            color: var(--color);
            background: var(--color-background-0);
            border-radius: var(--dialog-border-radius);
            padding: var(--dialog-padding);
            box-shadow: inset var(--accent-box-shadow);
            overflow: auto;
        }

        /* Sizes */
        &.dialog-size-1 {
            --dialog-padding: var(--space-3);
            --dialog-border-radius: var(--radius-4);
        }
        &.dialog-size-2 {
            --dialog-padding: var(--space-4);
            --dialog-border-radius: var(--radius-4);
        }
        &.dialog-size-3 {
            --dialog-padding: var(--space-5);
            --dialog-border-radius: var(--radius-5);
        }
        &.dialog-size-4 {
            --dialog-padding: var(--space-6);
            --dialog-border-radius: var(--radius-5);
        }

        /* No Padding */
        &.dialog-no-padding {
            --dialog-padding: var(--space-0);
        }

        /* Full Screen */
        &.dialog-fullscreen {
            --dialog-border-radius: var(--radius-0) !important;
            width: 100vw;
            height: 100vh;

            .dialog-content {
                width: 100vw;
                height: 100vh;
                min-width: unset;
                max-width: unset;
                margin: unset;
                box-shadow: unset;
            }
        }
    }
</style>
