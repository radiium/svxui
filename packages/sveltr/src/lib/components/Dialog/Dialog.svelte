<script context="module" lang="ts">
    let allDialog: HTMLDivElement[] = [];

    const addDialog = (dialog?: HTMLDivElement) => {
        if (dialog) {
            allDialog.push(dialog);
        }
    };

    const removeDialog = (dialog?: HTMLDivElement) => {
        if (dialog) {
            allDialog = allDialog.filter((m: HTMLDivElement) => m !== dialog);
        }
    };

    const lastDialog = () => {
        return allDialog && allDialog.length > 0 ? allDialog[allDialog.length - 1] : undefined;
    };
</script>

<script lang="ts">
    import { lockscrollAction } from '$lib/actions/lockscroll.action.js';
    import { fade, scale } from 'svelte/transition';
    import { focusTrapAction } from '../../actions/focus-trap.action.js';
    import { clsx } from '../../utils/clsx.js';
    import { defaultDialogProps } from './Dialog.props.js';
    import type { DialogProps } from './Dialog.types.js';

    type $$Props = DialogProps;
    export let elementRef: $$Props['elementRef'] = defaultDialogProps.elementRef;
    export let isOpen: $$Props['isOpen'] = defaultDialogProps.isOpen;
    export let size: $$Props['size'] = defaultDialogProps.size;
    export let radius: $$Props['radius'] = defaultDialogProps.radius;
    export let noPadding: $$Props['noPadding'] = defaultDialogProps.noPadding;
    export let fullScreen: $$Props['fullScreen'] = defaultDialogProps.fullScreen;
    export let closeOnBackdropClick: $$Props['closeOnBackdropClick'] =
        defaultDialogProps.closeOnBackdropClick;
    export let closeOnEscape: $$Props['closeOnEscape'] = defaultDialogProps.closeOnEscape;
    export let lockScroll: $$Props['lockScroll'] = defaultDialogProps.lockScroll;
    // Width & Height
    export let width: $$Props['width'] = defaultDialogProps.width;
    export let minWidth: $$Props['minWidth'] = defaultDialogProps.minWidth;
    export let maxWidth: $$Props['maxWidth'] = defaultDialogProps.maxWidth;
    export let height: $$Props['height'] = defaultDialogProps.height;
    export let minHeight: $$Props['minHeight'] = defaultDialogProps.minHeight;
    export let maxHeight: $$Props['maxHeight'] = defaultDialogProps.maxHeight;

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

    $: isOpen ? addDialog(elementRef) : removeDialog(elementRef);
    $: cssClass = clsx($$restProps.class, `Dialog`, {
        [`Dialog-size-${size}`]: size,
        [`Dialog-no-padding`]: noPadding,
        [`Dialog-fullscreen`]: fullScreen
    });
</script>

<svelte:window on:keydown={handlekeydown} />
<svelte:body use:lockscrollAction={lockScroll === true && isOpen === true} />

{#if isOpen}
    <div id={elementRef?.id} class={cssClass} bind:this={elementRef}>
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
                start: 0.9,
                duration: 200,
                opacity: 0
            }}
        >
            <slot />
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
