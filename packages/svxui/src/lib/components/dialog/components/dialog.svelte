<script lang="ts">
    import { scrolllock } from '$lib/attachments/scrolllock/index.js';
    import { DialogBuilder } from '$lib/builders/dialog/index.js';
    import { onDestroy } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import { fade, scale } from 'svelte/transition';
    import type { DialogProps } from '../types.js';

    let {
        ref = $bindable(),
        open = $bindable(),
        onClose,
        layout = 'fixed',
        closeOnBackdropClick = true,
        closeOnEscape = true,
        lockScroll = true,
        focusTrap = true,
        blurBackdrop = false,
        keepMounted = false,
        transitionDelay = 0,
        transitionDuration = 250,
        children,
        ...rest
    }: DialogProps = $props();

    const dialog = new DialogBuilder({
        get open() {
            return open;
        },
        set open(newOpen) {
            open = newOpen;
        },
        get onClose() {
            return onClose;
        },
        get closeOnBackdropClick() {
            return closeOnBackdropClick;
        },
        get closeOnEscape() {
            return closeOnEscape;
        },
        get focusTrap() {
            return focusTrap;
        }
    });
    onDestroy(() => dialog.destroy());

    let lockScrollEnabled = $derived(dialog.active && dialog.open && lockScroll);
    let previouslyFocusedElement: HTMLElement | null = null;

    $effect(() => {
        if (dialog.open) {
            previouslyFocusedElement = document.activeElement as HTMLElement;
            if (focusTrap) {
                requestAnimationFrame(() => {
                    ref?.focus({ preventScroll: true });
                });
            }
        } else {
            requestAnimationFrame(() => {
                previouslyFocusedElement?.focus();
                previouslyFocusedElement = null;
            });
        }
    });

    let backdropCssClass = $derived([
        'dialog-backdrop',
        {
            'dialog-fixed': layout === 'fixed',
            'dialog-scroll': layout === 'scroll',
            'dialog-fullscreen': layout === 'fullscreen',
            'dialog-blurbackdrop': blurBackdrop && layout !== 'fullscreen',
            'dialog-keepmounted': keepMounted
        }
    ]);

    let dialogCssClass = $derived([
        rest.class,
        'dialog-content',
        {
            'dialog-fixed': layout === 'fixed',
            'dialog-scroll': layout === 'scroll',
            'dialog-fullscreen': layout === 'fullscreen',
            'dialog-blurbackdrop': blurBackdrop && layout !== 'fullscreen',
            'dialog-keepmounted': keepMounted
        }
    ]);
</script>

<svelte:body {@attach scrolllock({ enabled: lockScrollEnabled })} />

{#if keepMounted}
    <div
        {...dialog.backdropAttrs}
        class={backdropCssClass}
        style:--z-index={dialog.index + 1}
        style:--transitionDelay={transitionDelay + 'ms'}
        style:--transitionDuration={transitionDuration + 'ms'}
    >
        <div {...dialog.contentAttrs} {...rest} bind:this={ref} class={dialogCssClass}>
            {@render children?.()}
        </div>
    </div>
{:else}
    <!--  -->
    {#if dialog.open}
        <div
            {...dialog.backdropAttrs}
            class={backdropCssClass}
            style:--z-index={dialog.index + 1}
            transition:fade={{
                delay: transitionDelay,
                duration: transitionDuration,
                easing: cubicOut
            }}
        >
            <div
                {...dialog.contentAttrs}
                {...rest}
                bind:this={ref}
                class={dialogCssClass}
                transition:scale={{
                    delay: transitionDelay,
                    duration: transitionDuration,
                    start: 0.92,
                    opacity: 0,
                    easing: cubicOut
                }}
            >
                {@render children?.()}
            </div>
        </div>
    {/if}
{/if}

<style>
    .dialog-backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: var(--z-index, 1);

        &.dialog-fixed {
            overflow: hidden;
            align-items: center;
        }

        &.dialog-scroll {
            overflow-y: auto;
            align-items: center;
            justify-content: flex-start;

            .dialog-content {
                max-height: none;
                margin: var(--space-9) auto;
            }
        }

        &.dialog-fullscreen {
            .dialog-content {
                width: 100vw;
                height: 100vh;
                max-width: 100vw;
                max-height: 100vh;
            }
        }

        &.dialog-blurbackdrop {
            backdrop-filter: blur(4px);
        }

        &.dialog-keepmounted {
            opacity: 0;
            transition: opacity var(--transitionDuration) cubic-bezier(0.33, 1, 0.68, 1)
                var(--transitionDelay);

            &[data-state='open'] {
                opacity: 1;

                .dialog-content {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .dialog-content {
                opacity: 0;
                transform: scale(0.92);

                transition:
                    transform var(--transitionDuration, 250ms) cubic-bezier(0.33, 1, 0.68, 1)
                        var(--transitionDelay, 0),
                    opacity var(--transitionDuration, 250ms) cubic-bezier(0.33, 1, 0.68, 1)
                        var(--transitionDelay, 0);
            }
        }

        .dialog-content {
            margin: auto;
            max-width: calc(100% - 2em - 6px);
            max-height: calc(100% - 2em - 6px);
        }
    }
</style>
