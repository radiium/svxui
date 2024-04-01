<script>import { clsx } from '../../utils/clsx.js';
import { defaultRadioProps } from './Radio.props.js';
export let elementRef = defaultRadioProps.elementRef;
export let group = defaultRadioProps.group;
export let value = defaultRadioProps.value;
export let size = defaultRadioProps.size;
export let color = defaultRadioProps.color;
$: cssClass = clsx($$restProps.class, 'Radio', {
    [`Radio-size-${size}`]: size,
    [`Radio-color-${color}`]: color
});
</script>

<input
    {...$$restProps}
    data-color={color}
    data-size={size}
    class={cssClass}
    style={$$restProps.style}
    type="radio"
    {value}
    bind:group
    bind:this={elementRef}
    on:input
    on:change
    on:focus
    on:blur
    on:keydown
    on:keypress
    on:keyup
/>

<style>.Radio {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  position: relative;
  border-radius: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--radio-size);
  height: var(--radio-size);
  background: var(--input-background);
  box-shadow: var(--input-box-shadow);
  transition: background-color ease 0.2s, box-shadow ease 0.2s;
  --radio-background: var(--input-background);
  --radio-background-checked: var(--accent-9);
  --check-color: white;
}
.Radio:after {
  width: var(--radio-size);
  height: var(--radio-size);
  content: "";
  transform: scale(0.4);
  position: absolute;
  border-radius: 100%;
  background-color: transparent;
  transition: background-color ease 0.2s;
}
.Radio[data-checked] {
  background-color: var(--checkbox-background-checked);
  box-shadow: none;
}
.Radio[data-checked]:after {
  display: block;
}
.Radio[disabled] {
  cursor: default !important;
  opacity: 0.5 !important;
  outline: none !important;
  pointer-events: none;
}
.Radio[disabled]:focus, .Radio[disabled]:focus-within, .Radio[disabled]:focus-visible {
  box-shadow: none !important;
  outline: none !important;
}
.Radio:checked {
  background-color: var(--radio-background-checked);
  box-shadow: none;
}
.Radio:checked:after {
  background-color: var(--check-color);
}
.Radio:focus-visible {
  outline: var(--input-outline);
  outline-offset: inherit;
}
.Radio.Radio-size-1 {
  --radio-size: calc(var(--space-4) * 0.875);
  --check-width: calc(var(--radio-size) / 3.5);
  --check-height: calc(var(--radio-size) / 2.5);
}
.Radio.Radio-size-2 {
  --radio-size: var(--space-4);
  --check-width: calc(var(--radio-size) / 3.5);
  --check-height: calc(var(--radio-size) / 2.5);
}
.Radio.Radio-size-3 {
  --radio-size: calc(var(--space-4) * 1.25);
  --check-width: calc(var(--radio-size) / 3.5);
  --check-height: calc(var(--radio-size) / 2.5);
}</style>
