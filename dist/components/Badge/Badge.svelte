<script>import { clsx } from '../../utils/clsx.js';
import { defaultBadgeProps } from './Badge.props.js';
export let elementRef = undefined;
export let size = defaultBadgeProps.size;
export let variant = defaultBadgeProps.variant;
export let color = defaultBadgeProps.color;
export let disabled = defaultBadgeProps.disabled;
$: cssClass = clsx($$restProps.class, 'Badge', {
    [`Badge-size-${size}`]: size,
    [`Badge-color-${color}`]: color,
    [`Badge-${variant}`]: variant,
    'Badge-disabled': disabled
});
</script>

<span
    {...$$restProps}
    bind:this={elementRef}
    data-color={color}
    data-size={size}
    class={cssClass}
    style={$$restProps.style}
>
    <slot />
</span>

<style>.Badge {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-family: var(--default-font-family);
  font-weight: var(--font-weight-medium);
  flex-shrink: 0;
  line-height: 1;
  user-select: none;
  height: fit-content;
  cursor: default;
  border: var(--badge-border);
  color: var(--badge-color);
  background-color: var(--badge-background);
  padding: var(--badge-padding);
  border-radius: var(--badge-border-radius);
  gap: var(--badge-gap);
  font-size: var(--badge-font-size);
  line-height: var(--badge-line-height);
  letter-spacing: var(--badge-letter-spacing);
}
.Badge.Badge-size-1 {
  --badge-padding: calc(var(--space-1) * 0.5) calc(var(--space-1) * 1.5);
  --badge-border-radius: var(--radius-1);
  --badge-gap: calc(var(--space-1) * 1.5);
  --badge-font-size: var(--font-size-1);
  --badge-line-height: var(--line-height-1);
  --badge-letter-spacing: var(--letter-spacing-1);
}
.Badge.Badge-size-2 {
  --badge-padding: var(--space-1) var(--space-2);
  --badge-border-radius: var(--radius-2);
  --badge-gap: calc(var(--space-1) * 1.5);
  --badge-font-size: var(--font-size-1);
  --badge-line-height: var(--line-height-1);
  --badge-letter-spacing: var(--letter-spacing-1);
}
.Badge.Badge-size-3 {
  --badge-padding: var(--space-1) calc(var(--space-2) * 1.25);
  --badge-border-radius: var(--radius-3);
  --badge-gap: var(--space-2);
  --badge-font-size: var(--font-size-2);
  --badge-line-height: var(--line-height-2);
  --badge-letter-spacing: var(--letter-spacing-2);
}
.Badge.Badge-outline {
  --badge-border: 1px solid var(--accent-9);
  --badge-color: var(--accent-a12);
  --badge-background: transparent;
}
.Badge.Badge-soft {
  --badge-border: 1px solid var(--accent-6);
  --badge-color: var(--accent-a12);
  --badge-background: var(--accent-a6);
}
.Badge.Badge-solid {
  --badge-border: 1px solid var(--accent-9);
  --badge-color: var(--accent-contrast);
  --badge-background: var(--accent-9);
}
.Badge.Badge-disabled {
  cursor: default !important;
  opacity: 0.5 !important;
  outline: none !important;
  pointer-events: none;
}
.Badge.Badge-disabled:focus, .Badge.Badge-disabled:focus-within, .Badge.Badge-disabled:focus-visible {
  box-shadow: none !important;
  outline: none !important;
}</style>
