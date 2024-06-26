<script>import { getContext } from 'svelte';
import { clsx } from '../../utils/clsx.js';
import { defaultSelectProps } from './Select.props.js';
import { InputGroupContextKey } from '../../constants.js';
export let elementRef = defaultSelectProps.elementRef;
export let options = defaultSelectProps.options;
export let value = defaultSelectProps.value;
export let size = defaultSelectProps.size;
export let fullWidth = defaultSelectProps.fullWidth;
const isInGroup = getContext(InputGroupContextKey);
$: cssClass = clsx($$restProps.class, `Select`, {
    [`Select-size-${size}`]: size,
    'Select-full-width': fullWidth,
    'is-in-group': isInGroup
});
</script>

{#if $$restProps.multiple}
    <!-- Select Multiple -->
    <select
        size={4}
        {...$$restProps}
        multiple
        data-size={size}
        class={cssClass}
        style={$$restProps.style}
        bind:this={elementRef}
        bind:value
        on:input
        on:change
        on:focus
        on:blur
        on:keydown
        on:keypress
        on:keyup
    >
        {#each options as option}
            <option value={option.value}>
                {option.label}
            </option>
        {/each}
    </select>
{:else}
    <!-- Select Single -->
    <select
        {...$$restProps}
        data-size={size}
        class={cssClass}
        style={$$restProps.style}
        bind:this={elementRef}
        bind:value
        on:input
        on:change
        on:focus
        on:blur
        on:keydown
        on:keypress
        on:keyup
    >
        <!-- {#if !value}
            <option value="" disabled selected>-- Select an option --</option>
        {/if} -->
        {#each options as option}
            <option value={option.value} selected={option.value === value}>
                {option.label}
            </option>
        {/each}
    </select>
{/if}

<!-- 
	a tester 
	https://codepen.io/STKNG/pen/GbVogZ
 -->

<style>.Select {
  border: none;
  display: inline-flex;
  font-size: var(--font-size-3);
  letter-spacing: normal;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  position: relative;
  border-radius: var(--radius-3);
  color: var(--input-color);
  background-color: var(--input-background);
  box-shadow: inset var(--input-box-shadow);
}
.Select:not([multiple]) {
  background-image: linear-gradient(45deg, transparent 50%, var(--accent-a9) 50%), linear-gradient(135deg, var(--accent-a9) 50%, transparent 50%);
  background-position: calc(100% - var(--space-3) - 5px) 50%, calc(100% - var(--space-3)) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}
.Select[multiple] {
  height: auto !important;
}
.Select[multiple] option {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0 var(--space-3) 0 var(--space-5);
}
.Select[multiple] option:checked {
  color: var(--input-color);
  background-color: var(--slate-a6);
}
.Select[multiple] option:checked::before {
  content: "";
  position: absolute;
  left: 8px;
  border-width: 0 0 1px 1px;
  border-color: var(--color);
  border-style: solid;
  width: 7px;
  height: 5px;
  transform: rotate(-45deg);
}
.Select.Select-size-1 {
  ---padding-right: calc(var(--space-2) * 4);
  height: var(--space-5);
  padding: 0 var(---padding-right) 0 var(--space-2);
  border-radius: var(--radius-3);
  font-size: var(--font-size-1);
  letter-spacing: var(--letter-spacing-1);
}
.Select.Select-size-1[multiple] {
  padding: 0 var(--space-2) 0 0;
}
.Select.Select-size-1[multiple] option {
  height: var(--space-5);
}
.Select.Select-size-2 {
  ---padding-right: calc(var(--space-2) * 4);
  height: var(--space-6);
  padding: 0 var(---padding-right) 0 var(--space-2);
  border-radius: var(--radius-3);
  font-size: var(--font-size-2);
  letter-spacing: var(--letter-spacing-2);
}
.Select.Select-size-2[multiple] {
  padding: 0 var(--space-2) 0 0;
}
.Select.Select-size-2[multiple] option {
  height: var(--space-6);
}
.Select.Select-size-3 {
  ---padding-right: calc(var(--space-2) * 4);
  height: var(--space-7);
  padding: 0 var(---padding-right) 0 var(--space-3);
  border-radius: var(--radius-3);
  font-size: var(--font-size-3);
  letter-spacing: var(--letter-spacing-3);
}
.Select.Select-size-3[multiple] {
  padding: 0 var(--space-3) 0 0;
}
.Select.Select-size-3[multiple] option {
  height: var(--space-7);
}
.Select.Select-full-width {
  width: 100%;
}
.Select:focus, .Select:focus-visible {
  box-shadow: inset var(--input-box-shadow-focus);
  outline: none;
}
.Select:disabled {
  cursor: default !important;
  opacity: 0.5 !important;
  outline: none !important;
  pointer-events: none;
}
.Select:disabled:focus, .Select:disabled:focus-within, .Select:disabled:focus-visible {
  box-shadow: none !important;
  outline: none !important;
}</style>
