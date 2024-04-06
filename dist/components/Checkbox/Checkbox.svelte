<script>import { clsx } from '../../utils/clsx.js';
import { defaultCheckboxProps } from './Checkbox.props.js';
export let elementRef = defaultCheckboxProps.elementRef;
export let group = defaultCheckboxProps.group;
export let value = defaultCheckboxProps.value;
export let checked = defaultCheckboxProps.checked;
export let indeterminate = defaultCheckboxProps.indeterminate;
export let size = defaultCheckboxProps.size;
export let color = defaultCheckboxProps.color;
$: cssClass = clsx($$restProps.class, 'Checkbox', {
    [`Checkbox-size-${size}`]: size,
    [`Checkbox-color-${color}`]: color
});
const isValid = (val) => value !== null && value !== undefined;
$: if (isValid(group)) {
    groupCheck();
}
function groupCheck() {
    if (value !== null && value !== undefined) {
        checked = group?.includes(value);
    }
}
// Update group when checkbox changes
function onChange() {
    if (isValid(group) && isValid(value)) {
        let inGroup = group.includes(value);
        if (!inGroup) {
            // Add to group
            group = [...group, value];
        }
        else {
            // Remove from group
            group = group.filter((v) => v != value);
        }
    }
}
</script>

<input
    {...$$restProps}
    class={cssClass}
    style={$$restProps.style}
    data-color={color}
    data-size={size}
    data-checked={checked || undefined}
    data-indeterminate={indeterminate || undefined}
    type="checkbox"
    autocomplete="off"
    {value}
    bind:checked
    bind:indeterminate
    bind:this={elementRef}
    on:input
    on:change
    on:change={onChange}
    on:focus
    on:blur
/>

<style>.Checkbox {
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: calc(var(--radius-3) / 1.5);
  background-color: var(--checkbox-background);
  box-shadow: var(--input-box-shadow);
  --checkbox-background: var(--input-background);
  --checkbox-background-checked: var(--accent-9);
  --check-color: white;
}
.Checkbox:after {
  display: none;
  position: absolute;
  content: "";
  width: var(--check-width);
  height: var(--check-height);
  top: 50%;
  left: 50%;
  border: solid var(--check-color);
  transform: translate(-50%, -60%) rotate(45deg);
  border-width: 0 2px 2px 0;
}
.Checkbox:checked, .Checkbox[data-checked=true] {
  background-color: var(--checkbox-background-checked);
  box-shadow: none;
}
.Checkbox:checked:after, .Checkbox[data-checked=true]:after {
  display: block;
}
.Checkbox:checked[data-indeterminate=true]:after, .Checkbox[data-checked=true][data-indeterminate=true]:after {
  transform: translate(-50%, -80%) rotate(0);
  border-width: 0 0 2px 0;
  width: calc(var(--space-4) / 2.5);
}
.Checkbox[disabled] {
  cursor: default !important;
  opacity: 0.5 !important;
  outline: none !important;
  pointer-events: none;
}
.Checkbox[disabled]:focus, .Checkbox[disabled]:focus-within, .Checkbox[disabled]:focus-visible {
  box-shadow: none !important;
  outline: none !important;
}
.Checkbox:focus-visible {
  box-shadow: var(--input-box-shadow-focus);
  outline: none;
}
.Checkbox.Checkbox-size-1 {
  --checkbox-size: calc(var(--space-4) * 0.875);
  --check-width: calc(var(--checkbox-size) / 3.5);
  --check-height: calc(var(--checkbox-size) / 2.5);
}
.Checkbox.Checkbox-size-2 {
  --checkbox-size: var(--space-4);
  --check-width: calc(var(--checkbox-size) / 3.5);
  --check-height: calc(var(--checkbox-size) / 2.5);
}
.Checkbox.Checkbox-size-3 {
  --checkbox-size: calc(var(--space-4) * 1.25);
  --check-width: calc(var(--checkbox-size) / 3.5);
  --check-height: calc(var(--checkbox-size) / 2.5);
}</style>
