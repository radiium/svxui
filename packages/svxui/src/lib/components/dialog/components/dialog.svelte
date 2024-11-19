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

    const lastDialog = () => {
        return allDialog && allDialog.length > 0 ? allDialog[allDialog.length - 1] : undefined;
    };
</script>

<script lang="ts">
    import { lockscrollAction } from '$lib/actions/lockscroll.action.js';
    import { untrack } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { focusTrapAction } from '../../../actions/focus-trap.action.js';
    import { clsx } from '../../../utils/clsx.js';
    import { defaultDialogProps } from '../props.js';
    import type { DialogProps } from '../types.js';

    let {
        elementRef = $bindable(),
        isOpen = $bindable(),
        size = defaultDialogProps.size,
        radius = defaultDialogProps.radius,
        noPadding = defaultDialogProps.noPadding,
        fullScreen = defaultDialogProps.fullScreen,
        closeOnBackdropClick = defaultDialogProps.closeOnBackdropClick,
        closeOnEscape = defaultDialogProps.closeOnEscape,
        lockScroll = defaultDialogProps.lockScroll,
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

    function handlekeydown(event: KeyboardEvent): void {
        if (closeOnEscape) {
            if (event.key === 'Escape') {
                close();
            }
        }
    }

    function close(): void {
        isOpen = false;
    }

    function onBackdropClick(): void {
        if (closeOnBackdropClick) {
            close();
        }
    }

    $effect(() => {
        if (isOpen) {
            addDialog(untrack(() => elementRef));
            // getComputedStyle(elementRef)
        } else {
            removeDialog(untrack(() => elementRef));
        }
    });

    let cssClass = $derived(
        clsx(rest.class, `Dialog`, {
            [`Dialog-size-${size}`]: size,
            [`Dialog-no-padding`]: noPadding,
            [`Dialog-fullscreen`]: fullScreen
        })
    );
</script>

<svelte:window onkeydown={handlekeydown} />
<svelte:body use:lockscrollAction={lockScroll === true && isOpen === true} />

{#if isOpen}
    <div class={cssClass} data-radius={radius} bind:this={elementRef}>
        <div
            role="button"
            class="Dialog-backdrop"
            tabindex="-1"
            onclick={onBackdropClick}
            onkeydown={handlekeydown}
            transition:fade={{
                duration: transitionDuration
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
            class="Dialog-content"
            data-size={size}
            data-radius={radius}
            use:focusTrapAction={isOpen}
            transition:scale={{
                duration: transitionDuration,
                start: 0.9,
                opacity: 0
            }}
        >
            {@render children?.()}
        </div>
    </div>
{/if}

<style lang="scss">
    .Dialog {
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
            background: var(--color-overlay);
        }

        .Dialog-content {
            z-index: 10002;
            position: relative;
            color: var(--color);
            background: var(--color-background-0);
            border-radius: var(--dialog-border-radius);
            padding: var(--dialog-padding);
            /* margin: var(--space-8) auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; */
            gap: var(--space-3);
            box-shadow: inset var(--accent-box-shadow);
            overflow: auto;
        }

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

        // No Padding
        &.Dialog-no-padding {
            --dialog-padding: var(--space-0);
        }

        // Full Screen
        &.Dialog-fullscreen {
            --dialog-border-radius: var(--radius-0) !important;
            width: 100vw;
            height: 100vh;

            .Dialog-content {
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
