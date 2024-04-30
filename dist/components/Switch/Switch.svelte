<script>import { clsx } from '../../utils/clsx.js';
import { defaultSwitchProps } from './Switch.props.js';
export let elementRef = defaultSwitchProps.elementRef;
export let checked = defaultSwitchProps.checked;
export let size = defaultSwitchProps.size;
export let color = defaultSwitchProps.color;
$: cssClass = clsx($$restProps.class, 'Switch', {
    [`Switch-size-${size}`]: size,
    [`Switch-color-${color}`]: color
});
</script>

<input
    {...$$restProps}
    data-color={color}
    data-size={size}
    class={cssClass}
    style={$$restProps.style}
    type="checkbox"
    bind:checked
    bind:this={elementRef}
    on:input
    on:change
    on:focus
    on:blur
    on:keydown
    on:keypress
    on:keyup
/>

<style>.Switch {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  position: relative;
  width: var(--switch-width);
  height: var(--switch-height);
  border-radius: var(--radius-2);
  background: var(--switch-background);
  padding: var(--switch-padding);
  box-shadow: inset var(--input-box-shadow);
  transition: background-color ease 0.2s, box-shadow ease 0.2s;
  --switch-background: var(--input-background);
  --switch-background-checked: var(--accent-9);
  --switch-check-color: white;
}
.Switch:after {
  content: "";
  display: block;
  height: var(--switch-thumb-size);
  width: var(--switch-thumb-size);
  background-color: var(--switch-check-color);
  border-radius: var(--radius-1);
  transition: background-color ease 0.2s, box-shadow ease 0.2s, transform ease 0.2s;
}
.Switch:checked {
  background-color: var(--switch-background-checked);
  box-shadow: none;
}
.Switch:checked:after {
  transform: translateX(var(--switch-thumb-translate));
  display: block;
}
.Switch[disabled] {
  cursor: default !important;
  opacity: 0.5 !important;
  outline: none !important;
  pointer-events: none;
}
.Switch[disabled]:focus, .Switch[disabled]:focus-within, .Switch[disabled]:focus-visible {
  box-shadow: none !important;
  outline: none !important;
}
.Switch:focus-visible {
  box-shadow: inset var(--input-box-shadow-focus);
  outline: none;
}
.Switch.Switch-size-1 {
  --switch-padding: 3px;
  --switch-height: var(--space-4);
  --switch-width: calc(var(--switch-height) * 1.75);
  --switch-thumb-size: calc(var(--switch-height) - var(--switch-padding) * 2);
  --switch-thumb-translate: calc(var(--switch-width) - var(--switch-height));
}
.Switch.Switch-size-2 {
  --switch-padding: 3px;
  --switch-height: calc(var(--space-5) * 5 / 6);
  --switch-width: calc(var(--switch-height) * 1.75);
  --switch-thumb-size: calc(var(--switch-height) - var(--switch-padding) * 2);
  --switch-thumb-translate: calc(var(--switch-width) - var(--switch-height));
}
.Switch.Switch-size-3 {
  --switch-padding: 4px;
  --switch-height: var(--space-5);
  --switch-width: calc(var(--switch-height) * 1.75);
  --switch-thumb-size: calc(var(--switch-height) - var(--switch-padding) * 2);
  --switch-thumb-translate: calc(var(--switch-width) - var(--switch-height));
}</style>
