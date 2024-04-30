<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultCardProps } from './Card.props.js';
    import type { CardProps } from './Card.types.js';

    type $$Props = CardProps;
    export let elementRef: $$Props['elementRef'] = defaultCardProps.elementRef;
    export let size: $$Props['size'] = defaultCardProps.size;
    export let variant: $$Props['variant'] = defaultCardProps.variant;
    export let outline: $$Props['outline'] = defaultCardProps.outline;
    export let asButton: $$Props['asButton'] = defaultCardProps.asButton;

    $: cssClass = clsx($$restProps.class, 'Card', {
        [`Card-size-${size}`]: size,
        [`Card-${variant}`]: variant,
        'Card-with-outline': outline,
        'Card-as-button': asButton
    });
</script>

{#if asButton}
    <button
        {...$$restProps}
        class={cssClass}
        style={$$restProps.style}
        bind:this={elementRef}
        on:click
        on:submit
        on:focus
        on:blur
    >
        <slot />
    </button>
{:else}
    <div {...$$restProps} class={cssClass} style={$$restProps.style} bind:this={elementRef}>
        <slot />
    </div>
{/if}

<style lang="scss">
    .Card {
        padding: var(--card-padding);
        border-radius: var(--card-border-radius);
        background-color: var(--card-background);
        position: relative;

        &::after {
            content: '';
            position: absolute;
            inset: 0 0 0 0;
            border-radius: var(--card-border-radius);
            box-shadow: var(--card-box-shadow);
            pointer-events: none;
        }

        &.Card-as-button {
            display: block;
            appearance: none;
            -webkit-appearance: none;
            outline: none;
            border: none;
            font-size: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            font-weight: inherit;
            text-align: inherit;
            font-family: var(--default-font-family);
            color: var(--color);
            cursor: pointer;

            &:hover {
                background-color: var(--card-background-hover);

                &::after {
                    box-shadow: var(--card-box-shadow-hover);
                }
            }

            &:focus-visible {
                background-color: var(--card-background-focus);

                &::after {
                    box-shadow: var(--card-box-shadow-focus);
                }
            }

            &:active {
                background-color: var(--card-background-focus);
            }
        }

        // Sizes
        &.Card-size-0 {
            --card-padding: var(--space-0);
            --card-border-radius: var(--radius-3);
        }
        &.Card-size-1 {
            --card-padding: var(--space-3);
            --card-border-radius: var(--radius-4);
        }
        &.Card-size-2 {
            --card-padding: var(--space-4);
            --card-border-radius: var(--radius-4);
        }
        &.Card-size-3 {
            --card-padding: var(--space-5);
            --card-border-radius: var(--radius-5);
        }
        &.Card-size-4 {
            --card-padding: var(--space-6);
            --card-border-radius: var(--radius-5);
        }
        &.Card-size-5 {
            --card-padding: var(--space-8);
            --card-border-radius: var(--radius-6);
        }

        // Variants
        &.Card-clear {
            --card-background: transparent;
            --card-background-hover: transparent; //var(--slate-1);
            --card-background-focus: var(--slate-2); //var(--slate-2);
        }
        &.Card-soft {
            --card-background: var(--slate-1);
            --card-background-hover: var(--slate-1); // var(--slate-2);
            --card-background-focus: var(--slate-2); // var(--slate-2);
        }

        // Outline
        --card-box-shadow: transparent;
        --card-box-shadow-hover: transparent;
        --card-box-shadow-focus: transparent;
        &.Card-with-outline {
            /* --card-box-shadow: inset var(--input-box-shadow);
            --card-box-shadow-hover: inset var(--input-box-shadow-hover);
            --card-box-shadow-focus: inset var(--input-box-shadow-focus); */

            --card-box-shadow: inset 0 0 0 1px var(--slate-a5);
            --card-box-shadow-hover: inset 0 0 0 1px var(--slate-a7);
            --card-box-shadow-focus: inset 0 0 0 1px var(--slate-a6);
        }
    }
</style>
