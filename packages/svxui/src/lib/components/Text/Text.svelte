<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultTextProps } from './Text.props.js';
    import type { TextProps } from './Text.types.js';

    type $$Props = TextProps;
    export let elementRef: $$Props['elementRef'] = defaultTextProps.elementRef;
    export let as: $$Props['as'] = defaultTextProps.as;
    export let color: $$Props['color'] = defaultTextProps.color;
    export let size: $$Props['size'] = defaultTextProps.size;
    export let weight: $$Props['weight'] = defaultTextProps.weight;
    export let transform: $$Props['transform'] = defaultTextProps.transform;
    export let align: $$Props['align'] = defaultTextProps.align;
    export let wrap: $$Props['wrap'] = defaultTextProps.wrap;
    export let truncate: $$Props['truncate'] = defaultTextProps.truncate;
    export let disabled: $$Props['disabled'] = defaultTextProps.disabled;

    $: cssClass = clsx($$restProps.class, 'Text', {
        [`Text-size-${size}`]: size,
        [`Text-color-${color}`]: color,
        [`Text-weight-${weight}`]: weight,
        [`Text-align-${align}`]: align,
        [`Text-transform-${transform}`]: transform,
        [`Text-wrap-${wrap}`]: wrap,
        'Text-truncate': truncate,
        'Text-disabled': disabled
    });
</script>

<svelte:element
    this={as}
    {...$$restProps}
    data-color={color}
    data-size={size}
    aria-disabled={disabled}
    class={cssClass}
    style={$$restProps.style}
    bind:this={elementRef}
>
    <slot />
</svelte:element>

<style lang="scss">
    .Text {
        font-size: var(--text-font-size);
        line-height: var(--text-line-height);
        letter-spacing: var(--text-letter-spacing);
        font-weight: var(--text-font-weight);
        text-transform: var(--text-text-transform);
        text-align: var(--text-text-align);

        // Colors
        & {
            color: var(--color);
        }
        &[data-color] {
            color: var(--accent-a11);
        }

        // Sizes
        &.Text-size-1 {
            --text-font-size: var(--font-size-1);
            --text-line-height: var(--line-height-1);
            --text-letter-spacing: var(--letter-spacing-1);
        }
        &.Text-size-2 {
            --text-font-size: var(--font-size-2);
            --text-line-height: var(--line-height-2);
            --text-letter-spacing: var(--letter-spacing-2);
        }
        &.Text-size-3 {
            --text-font-size: var(--font-size-3);
            --text-line-height: var(--line-height-3);
            --text-letter-spacing: var(--letter-spacing-3);
        }
        &.Text-size-4 {
            --text-font-size: var(--font-size-4);
            --text-line-height: var(--line-height-4);
            --text-letter-spacing: var(--letter-spacing-4);
        }
        &.Text-size-5 {
            --text-font-size: var(--font-size-5);
            --text-line-height: var(--line-height-5);
            --text-letter-spacing: var(--letter-spacing-5);
        }
        &.Text-size-6 {
            --text-font-size: var(--font-size-6);
            --text-line-height: var(--line-height-6);
            --text-letter-spacing: var(--letter-spacing-6);
        }
        &.Text-size-7 {
            --text-font-size: var(--font-size-7);
            --text-line-height: var(--line-height-7);
            --text-letter-spacing: var(--letter-spacing-7);
        }
        &.Text-size-8 {
            --text-font-size: var(--font-size-8);
            --text-line-height: var(--line-height-8);
            --text-letter-spacing: var(--letter-spacing-8);
        }
        &.Text-size-9 {
            --text-font-size: var(--font-size-9);
            --text-line-height: var(--line-height-9);
            --text-letter-spacing: var(--letter-spacing-9);
        }

        // Weight
        &.Text-weight-light {
            --text-font-weight: var(--font-weight-light);
        }
        &.Text-weight-regular {
            --text-font-weight: var(--font-weight-regular);
        }
        &.Text-weight-medium {
            --text-font-weight: var(--font-weight-medium);
        }
        &.Text-weight-bold {
            --text-font-weight: var(--font-weight-bold);
        }

        // Transform
        &.Text-transform-lowercase {
            --text-text-transform: lowercase;
        }
        &.Text-transform-uppercase {
            --text-text-transform: uppercase;
        }
        &.Text-transform-capitalize {
            --text-text-transform: capitalize;
        }

        // Alignement
        &.Text-align-start {
            --text-text-align: start;
        }
        &.Text-align-center {
            --text-text-align: center;
        }
        &.Text-align-end {
            --text-text-align: end;
        }

        // Wrap
        &.Text-wrap-wrap {
            white-space: normal;
        }
        &.Text-wrap-nowrap {
            white-space: nowrap;
        }
        &.Text-wrap-pretty {
            white-space: normal;
            text-wrap: pretty;
        }
        &.Text-wrap-balance {
            white-space: normal;
            text-wrap: balance;
        }

        &.Text-truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &.Text-disabled {
            opacity: 0.5 !important;
            pointer-events: none;
        }

        // Link Underline
        &.Text-Link {
            --link-text-decoration-line: none;
            text-decoration-line: var(--link-text-decoration-line);
            text-decoration-thickness: min(2px, max(1px, 0.05em));
            text-underline-offset: calc(0.025em + 2px);
            text-decoration-color: var(--accent-a11);
        }
        &:not(.Text-disabled) {
            &.Text-Link-underline-auto:hover,
            &.Text-Link-underline-hover:hover,
            &.Text-Link-underline-always {
                & {
                    --link-text-decoration-line: underline;
                }
            }
        }
    }
</style>
