<script>import { clsx } from '../../utils/clsx.js';
import { setContext } from 'svelte';
import { InputGroupContextKey } from '../../constants.js';
import { defaultInputGroupProps } from './InputGroup.props.js';
export let elementRef = defaultInputGroupProps.elementRef;
$: cssClass = clsx($$restProps.class, `InputGroup`);
setContext(InputGroupContextKey, true);
</script>

<div {...$$restProps} role="group" class={cssClass} style={$$restProps.style} bind:this={elementRef}>
    <slot />
</div>

<style>.InputGroup {
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
  border-radius: var(--radius-3);
  /* background: var(--input-background); */
}
.InputGroup :global(.is-in-group) {
  position: relative;
  border: none;
  border-radius: 0 0 0 0 !important;
  /* border-width: 1px !important;
  border-style: solid !important;
  border-color: var(--slate-a5) !important; */
  box-shadow: inset var(--input-box-shadow) !important;
}
.InputGroup :global(.is-in-group):focus, .InputGroup :global(.is-in-group):focus-visible {
  z-index: 3000;
  box-shadow: inset var(--input-box-shadow-focus) !important;
}
.InputGroup :global(.is-in-group):focus-visible {
  z-index: 3000;
  box-shadow: inset var(--input-box-shadow-focus);
}
.InputGroup :global(.is-in-group):first-child {
  border-radius: var(--radius-3) 0 0 var(--radius-3) !important;
}
.InputGroup :global(.is-in-group):not(:last-child) {
  margin-right: -1px;
}
.InputGroup :global(.is-in-group):last-child {
  border-radius: 0 var(--radius-3) var(--radius-3) 0 !important;
}</style>
