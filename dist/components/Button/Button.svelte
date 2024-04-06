<script>import { getContext } from 'svelte';
import { clsx } from '../../utils/clsx.js';
import { defaultButtonProps } from './Button.props.js';
import { InputGroupContextKey } from '../../constants.js';
export let elementRef = undefined;
export let size = defaultButtonProps.size;
export let variant = defaultButtonProps.variant;
export let color = defaultButtonProps.color;
export let align = defaultButtonProps.align;
export let active = defaultButtonProps.active;
export let iconOnly = defaultButtonProps.iconOnly;
export let circle = defaultButtonProps.fullWidth;
export let fullWidth = defaultButtonProps.fullWidth;
const isInGroup = getContext(InputGroupContextKey);
$: cssClass = clsx($$restProps.class, 'Button', {
    [`Button-${variant}`]: variant,
    [`Button-size-${size}`]: size,
    [`Button-${color}`]: color,
    [`Button-align-${align}`]: align,
    'Button-full-width': fullWidth,
    'Button-active': active,
    'Button-icon-only': iconOnly,
    'Button-circle': iconOnly && circle,
    'is-in-group': isInGroup
});
</script>

<button
    tabindex="0"
    {...$$restProps}
    data-color={color}
    data-size={size}
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

<style>button.Button {
  --button-min-width: calc(var(--space-5) * 2);
  --button-width: unset;
  --button-height: var(--space-5);
  --button-padding: 0 var(--space-2);
  --button-border: none;
  --button-border-radius: var(--radius-3);
  --button-background: transparent;
  --button-background-hover: var(--accent-a6);
  --button-background-active: var(--accent-a7);
  --button-color: var(--accent-a12);
  --button-font-size: var(--font-size-1);
  --button-line-height: var(--line-height-1);
  --button-letter-spacing: var(--letter-spacing-1);
  --button-gap: var(--space-1);
  --button-icon-height: 60%;
  min-width: var(--button-min-width);
  width: var(--button-width);
  height: var(--button-height);
  padding: var(--button-padding);
  border: var(--button-border);
  border-radius: var(--button-border-radius);
  background-color: var(--button-background);
  color: var(--button-color);
  font-size: var(--button-font-size);
  line-height: var(--button-line-height);
  letter-spacing: var(--button-letter-spacing);
  gap: var(--button-gap);
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  font-weight: bold;
  transition: background-color linear 80ms;
}
button.Button :global(svg) {
  width: auto;
  height: var(--button-icon-height);
  fill: var(--button-color);
}
button.Button.Button-size-1 {
  --button-height: var(--space-5);
  --button-min-width: calc(var(--space-5) * 2);
  --button-padding: 0 var(--space-2);
  --button-border-radius: var(--radius-3);
  --button-gap: var(--space-1);
  --button-font-size: var(--font-size-1);
  --button-line-height: var(--line-height-1);
  --button-letter-spacing: var(--letter-spacing-1);
}
button.Button.Button-size-1.Button-icon-only {
  --button-min-width: var(--space-5);
  --button-width: var(--space-5);
  --button-padding: calc(var(--space-1) / 2);
  --button-icon-height: 80%;
}
button.Button.Button-size-2 {
  --button-height: var(--space-6);
  --button-min-width: calc(var(--space-6) * 2);
  --button-padding: 0 var(--space-2);
  --button-border-radius: var(--radius-3);
  --button-gap: var(--space-1);
  --button-font-size: var(--font-size-2);
  --button-line-height: var(--line-height-2);
  --button-letter-spacing: var(--letter-spacing-2);
}
button.Button.Button-size-2.Button-icon-only {
  --button-min-width: var(--space-6);
  --button-width: var(--space-6);
  --button-padding: calc(var(--space-1) / 2);
}
button.Button.Button-size-3 {
  --button-height: var(--space-7);
  --button-min-width: calc(var(--space-7) * 2);
  --button-padding: 0 var(--space-3);
  --button-border-radius: var(--radius-3);
  --button-gap: var(--space-3);
  --button-font-size: var(--font-size-3);
  --button-line-height: var(--line-height-3);
  --button-letter-spacing: var(--letter-spacing-3);
}
button.Button.Button-size-3.Button-icon-only {
  --button-min-width: var(--space-7);
  --button-width: var(--space-7);
  --button-padding: var(--space-1);
}
button.Button.Button-size-4 {
  --button-height: var(--space-8);
  --button-min-width: calc(var(--space-8) * 2);
  --button-padding: 0 var(--space-4);
  --button-border-radius: var(--radius-3);
  --button-gap: var(--space-3);
  --button-font-size: var(--font-size-4);
  --button-line-height: var(--line-height-4);
  --button-letter-spacing: var(--letter-spacing-4);
}
button.Button.Button-size-4.Button-icon-only {
  --button-min-width: var(--space-8);
  --button-width: var(--space-8);
  --button-padding: var(--space-1);
}
button.Button.Button-clear {
  --button-border: none;
  --button-color: var(--accent-a12);
  --button-background: transparent;
  --button-background-hover: var(--accent-a6);
  --button-background-active: var(--accent-a7);
  --button-active-filter: none;
}
button.Button.Button-outline {
  --button-border: 1px solid var(--accent-9);
  --button-color: var(--accent-a12);
  --button-background: transparent;
  --button-background-hover: var(--accent-a6);
  --button-background-active: var(--accent-a7);
  --button-active-filter: none;
}
button.Button.Button-soft {
  --button-border: none;
  --button-color: var(--accent-a12);
  --button-background: var(--accent-a6);
  --button-background-hover: var(--accent-a7);
  --button-background-active: var(--accent-a8);
  --button-active-filter: none;
}
button.Button.Button-solid {
  --button-border: none;
  --button-color: var(--accent-contrast);
  --button-background: var(--accent-9);
  --button-background-hover: var(--accent-10);
  --button-background-active: var(--accent-10);
  --button-active-filter: brightness(0.92) saturate(1.1);
}
button.Button.Button-icon-only {
  justify-content: center;
  text-align: center;
}
button.Button.Button-icon-only.Button-circle {
  --button-border-radius: 50%;
}
button.Button:not(.Button-icon-only).Button-align-start {
  justify-content: flex-start;
  text-align: start;
}
button.Button:not(.Button-icon-only).Button-align-center {
  justify-content: center;
  text-align: center;
}
button.Button:not(.Button-icon-only).Button-align-end {
  justify-content: flex-end;
  text-align: end;
}
button.Button:not(.Button-icon-only).Button-full-width {
  width: 100%;
}
button.Button:hover {
  background: var(--button-background-hover);
}
button.Button:active, button.Button.Button-active {
  background: var(--button-background-active);
  filter: var(--button-active-filter);
}
button.Button:focus-visible {
  box-shadow: var(--input-box-shadow-focus);
  outline: none;
}
button.Button:disabled {
  cursor: default !important;
  opacity: 0.5 !important;
  outline: none !important;
  pointer-events: none;
}
button.Button:disabled:focus, button.Button:disabled:focus-within, button.Button:disabled:focus-visible {
  box-shadow: none !important;
  outline: none !important;
}</style>
