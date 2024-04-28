<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultCardProps } from './Card.props.js';
    import type { CardProps } from './Card.types.js';

    type $$Props = CardProps;
    export let elementRef: $$Props['elementRef'] = defaultCardProps.elementRef;
    export let size: $$Props['size'] = defaultCardProps.size;
    export let variant: $$Props['variant'] = defaultCardProps.variant;
    export let asButton: $$Props['asButton'] = defaultCardProps.asButton;

    $: cssClass = clsx($$restProps.class, 'Card', {
        [`Card-size-${size}`]: size,
        [`Card-${variant}`]: variant,
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
        /* var(--background-level-2); */
        position: relative;
        overflow: hidden;

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

            &:hover::after {
                box-shadow: var(--card-box-shadow-hover);
                background-color: var(--card-background-hover);
            }

            &:focus-visible::after,
            &:active::after {
                box-shadow: var(--card-box-shadow-focus);
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
        &.Card-outline {
            --card-background: transparent;
            --card-background-hover: transparent;
            --card-background-focus: transparent;
            --card-box-shadow: var(--input-box-shadow);
            --card-box-shadow-hover: var(--input-box-shadow-hover);
            --card-box-shadow-focus: var(--input-box-shadow-focus);
        }
        &.Card-soft {
            --card-background: var(--slate-a3);
            --card-background-hover: var(--slate-a4);
            --card-background-focus: var(--slate-a5);
            --card-box-shadow: transparent;
            --card-box-shadow-hover: transparent;
            --card-box-shadow-focus: transparent;
        }
        &.Card-solid {
            --card-background: var(--slate-4);
            --card-background-hover: var(--slate-5);
            --card-background-focus: var(--slate-6);
            --card-box-shadow: transparent;
            --card-box-shadow-hover: transparent;
            --card-box-shadow-focus: transparent;
        }
    }
</style>
