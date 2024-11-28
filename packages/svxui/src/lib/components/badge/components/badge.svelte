<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
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

    let cssClass = $derived(
        clsx(rest.class, 'Badge', {
            [`Badge-size-${size}`]: size,
            [`Badge-color-${color}`]: color,
            [`Badge-${variant}`]: variant,
            'Badge-disabled': disabled
        })
    );
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

<style lang="scss">
    .Badge {
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
        font-weight: var(--font-weight-medium);

        box-shadow: var(--badge-box-shadow);
        color: var(--badge-color);
        background-color: var(--badge-background);
        padding: var(--badge-padding);
        border-radius: var(--badge-border-radius);
        gap: var(--badge-gap);
        font-size: var(--badge-font-size);
        line-height: var(--badge-line-height);
        letter-spacing: var(--badge-letter-spacing);

        &.Badge-disabled {
            @include disabled;
        }

        // Sizes
        &.Badge-size-1 {
            --badge-padding: calc(var(--space-1) * 0.5) calc(var(--space-1) * 1.5);
            --badge-border-radius: max(var(--radius-1), var(--radius-full));
            --badge-gap: calc(var(--space-1) * 1.5);
            --badge-font-size: var(--font-size-1);
            --badge-line-height: var(--line-height-1);
            --badge-letter-spacing: var(--letter-spacing-1);
        }
        &.Badge-size-2 {
            --badge-padding: var(--space-1) var(--space-2);
            --badge-border-radius: max(var(--radius-2), var(--radius-full));
            --badge-gap: calc(var(--space-1) * 1.5);
            --badge-font-size: var(--font-size-1);
            --badge-line-height: var(--line-height-1);
            --badge-letter-spacing: var(--letter-spacing-1);
        }
        &.Badge-size-3 {
            --badge-padding: var(--space-1) calc(var(--space-2) * 1.25);
            --badge-border-radius: max(var(--radius-3), var(--radius-full));
            --badge-gap: var(--space-2);
            --badge-font-size: var(--font-size-2);
            --badge-line-height: var(--line-height-2);
            --badge-letter-spacing: var(--letter-spacing-2);
        }

        // Variants

        &.Badge-solid {
            --badge-box-shadow: none;
            --badge-background: var(--accent-9);
            --badge-color: var(--accent-contrast);
        }
        &.Badge-soft {
            --badge-box-shadow: none;
            --badge-background: var(--accent-3);
            --badge-color: var(--accent-11);
        }
        &.Badge-surface {
            --badge-box-shadow: inset 0px 0px 0px 1px var(--accent-6);
            --badge-background: var(--accent-surface);
            --badge-color: var(--accent-11);
        }
        &.Badge-outline {
            --badge-box-shadow: inset 0px 0px 0px 1px var(--accent-8);
            --badge-background: transparent;
            --badge-color: var(--accent-11);
        }
    }
</style>
