<script lang="ts">
    import { defaultBadgeProps } from '../props.js';
    import type { BadgeProps } from '../types.js';

    let {
        elementRef = $bindable(),
        size = defaultBadgeProps.size,
        variant = defaultBadgeProps.variant,
        color = defaultBadgeProps.color,
        radius = defaultBadgeProps.radius,
        disabled = defaultBadgeProps.disabled,
        children,
        ...rest
    }: BadgeProps = $props();

    let cssClass = $derived([
        rest.class,
        'badge',
        {
            [`badge-size-${size}`]: size,
            [`badge-color-${color}`]: color,
            [`badge-variant-${variant}`]: variant,
            'badge-disabled': disabled
        }
    ]);
</script>

<span
    {...rest}
    bind:this={elementRef}
    data-color={color}
    data-size={size}
    data-radius={radius}
    aria-disabled={disabled}
    class={cssClass}
>
    {@render children?.()}
</span>

<style>
    .badge {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        flex-shrink: 0;
        line-height: 1;
        user-select: none;
        height: fit-content;
        cursor: default;

        font-family: var(--default-font-family);
        font-size: var(--badge-font-size);
        font-weight: var(--font-weight-medium);
        line-height: var(--badge-line-height);
        letter-spacing: var(--badge-letter-spacing);
        color: var(--badge-color);
        background-color: var(--badge-background);
        box-shadow: var(--badge-box-shadow);
        border-radius: var(--badge-border-radius);
        padding: var(--badge-padding);
        gap: var(--badge-gap);

        &.badge-disabled {
            cursor: default !important;
            opacity: 0.5 !important;
            outline: none !important;
            pointer-events: none;

            &:focus,
            &:focus-within,
            &:focus-visible {
                box-shadow: none !important;
                outline: none !important;
            }
        }

        /* Sizes */
        &.badge-size-1 {
            --badge-padding: calc(var(--space-1) * 0.5) calc(var(--space-1) * 1.5);
            --badge-border-radius: max(var(--radius-1), var(--radius-full));
            --badge-gap: calc(var(--space-1) * 1.5);
            --badge-font-size: var(--font-size-1);
            --badge-line-height: var(--line-height-1);
            --badge-letter-spacing: var(--letter-spacing-1);
        }
        &.badge-size-2 {
            --badge-padding: var(--space-1) var(--space-2);
            --badge-border-radius: max(var(--radius-2), var(--radius-full));
            --badge-gap: calc(var(--space-1) * 1.5);
            --badge-font-size: var(--font-size-1);
            --badge-line-height: var(--line-height-1);
            --badge-letter-spacing: var(--letter-spacing-1);
        }
        &.badge-size-3 {
            --badge-padding: var(--space-1) calc(var(--space-2) * 1.25);
            --badge-border-radius: max(var(--radius-3), var(--radius-full));
            --badge-gap: var(--space-2);
            --badge-font-size: var(--font-size-2);
            --badge-line-height: var(--line-height-2);
            --badge-letter-spacing: var(--letter-spacing-2);
        }

        /* Variants */
        &.badge-variant-solid {
            --badge-box-shadow: none;
            --badge-background: var(--accent-9);
            --badge-color: var(--accent-contrast);
        }
        &.badge-variant-soft {
            --badge-box-shadow: none;
            --badge-background: var(--accent-3);
            --badge-color: var(--accent-11);
        }
        &.badge-variant-outline {
            --badge-box-shadow: inset 0px 0px 0px 1px var(--accent-8);
            --badge-background: transparent;
            --badge-color: var(--accent-11);
        }
    }
</style>
