<script lang="ts">
    import { defaultTextProps } from '../props.js';
    import type { TextProps } from '../types.js';

    let {
        elementRef = $bindable(),
        as = defaultTextProps.as,
        color = defaultTextProps.color,
        size = defaultTextProps.size,
        weight = defaultTextProps.weight,
        transform = defaultTextProps.transform,
        align = defaultTextProps.align,
        wrap = defaultTextProps.wrap,
        truncate = defaultTextProps.truncate,
        muted = defaultTextProps.muted,
        disabled = defaultTextProps.disabled,
        children,
        ...rest
    }: TextProps = $props();

    let cssClass = $derived([
        rest.class,
        'text',
        {
            [`text-size-${size}`]: size,
            [`text-color-${color}`]: color,
            [`text-weight-${weight}`]: weight,
            [`text-align-${align}`]: align,
            [`text-transform-${transform}`]: transform,
            [`text-wrap-${wrap}`]: wrap,
            'text-truncate': truncate,
            'text-muted': muted,
            'text-disabled': disabled,
            'text-heading': ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as as string)
        }
    ]);
</script>

<svelte:element
    this={as}
    {...rest}
    data-color={color}
    data-size={size}
    class={cssClass}
    aria-disabled={disabled ?? undefined}
    bind:this={elementRef}
>
    {@render children?.()}
</svelte:element>

<style>
    .text {
        font-size: var(--text-font-size);
        line-height: var(--text-line-height);
        letter-spacing: var(--text-letter-spacing);
        font-weight: var(--text-font-weight);
        text-transform: var(--text-text-transform);
        text-align: var(--text-text-align);
        color: var(--color);
        --underline-color: var(--color);

        /* Colors */
        &[data-color] {
            color: var(--accent-11);
            --underline-color: var(--accent-11);
        }

        /* Sizes */
        &.text-size-1 {
            --text-font-size: var(--font-size-1);
            --text-line-height: var(--line-height-1);
            --text-letter-spacing: var(--letter-spacing-1);
        }
        &.text-size-2 {
            --text-font-size: var(--font-size-2);
            --text-line-height: var(--line-height-2);
            --text-letter-spacing: var(--letter-spacing-2);
        }
        &.text-size-3 {
            --text-font-size: var(--font-size-3);
            --text-line-height: var(--line-height-3);
            --text-letter-spacing: var(--letter-spacing-3);
        }
        &.text-size-4 {
            --text-font-size: var(--font-size-4);
            --text-line-height: var(--line-height-4);
            --text-letter-spacing: var(--letter-spacing-4);
        }
        &.text-size-5 {
            --text-font-size: var(--font-size-5);
            --text-line-height: var(--line-height-5);
            --text-letter-spacing: var(--letter-spacing-5);
        }
        &.text-size-6 {
            --text-font-size: var(--font-size-6);
            --text-line-height: var(--line-height-6);
            --text-letter-spacing: var(--letter-spacing-6);
        }
        &.text-size-7 {
            --text-font-size: var(--font-size-7);
            --text-line-height: var(--line-height-7);
            --text-letter-spacing: var(--letter-spacing-7);
        }
        &.text-size-8 {
            --text-font-size: var(--font-size-8);
            --text-line-height: var(--line-height-8);
            --text-letter-spacing: var(--letter-spacing-8);
        }
        &.text-size-9 {
            --text-font-size: var(--font-size-9);
            --text-line-height: var(--line-height-9);
            --text-letter-spacing: var(--letter-spacing-9);
        }

        /* Weight */
        &.text-weight-light {
            --text-font-weight: var(--font-weight-light);
        }
        &.text-weight-regular {
            --text-font-weight: var(--font-weight-regular);
        }
        &.text-weight-medium {
            --text-font-weight: var(--font-weight-medium);
        }
        &.text-weight-bold {
            --text-font-weight: var(--font-weight-bold);
        }

        /* Transform */
        &.text-transform-lowercase {
            --text-text-transform: lowercase;
        }
        &.text-transform-uppercase {
            --text-text-transform: uppercase;
        }
        &.text-transform-capitalize {
            --text-text-transform: capitalize;
        }

        /* Alignement */
        &.text-align-start {
            --text-text-align: start;
        }
        &.text-align-center {
            --text-text-align: center;
        }
        &.text-align-end {
            --text-text-align: end;
        }

        /* Wrap */
        &.text-wrap-wrap {
            white-space: normal;
        }
        &.text-wrap-nowrap {
            white-space: nowrap;
        }
        &.text-wrap-pretty {
            white-space: normal;
            text-wrap: pretty;
        }
        &.text-wrap-balance {
            white-space: normal;
            text-wrap: balance;
        }

        /* Truncate */
        &.text-truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* Muted */
        &.text-muted {
            opacity: 0.6 !important;
        }

        /* Disabled */
        &.text-disabled {
            opacity: 0.5 !important;
            pointer-events: none;
        }

        /* Link Underline */
        &.text-link {
            --link-text-decoration-line: none;
            text-decoration-line: var(--link-text-decoration-line);
            text-decoration-thickness: min(2px, max(1px, 0.05em));
            text-underline-offset: calc(0.025em + 2px);
            text-decoration-color: var(--underline-color);

            &:not(.text-disabled) {
                cursor: pointer;
            }
        }

        &:not(.text-disabled) {
            &.text-link-underline-auto:hover,
            &.text-link-underline-hover:hover,
            &.text-link-underline-always {
                & {
                    --link-text-decoration-line: underline;
                }
            }
        }
    }
</style>
