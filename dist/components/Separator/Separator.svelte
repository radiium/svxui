<script>import { clsx } from '../../utils/clsx.js';
import { defaultSeparatorProps } from './Separator.props.js';
export let elementRef = defaultSeparatorProps.elementRef;
export let size = defaultSeparatorProps.size;
export let orientation = defaultSeparatorProps.orientation;
$: cssClass = clsx($$restProps.class, 'Separator', {
    [`Separator-size-${size}`]: size,
    [`Separator-orientation-${orientation}`]: orientation
});
</script>

<div {...$$restProps} class={cssClass} style={$$restProps.style} bind:this={elementRef}></div>

<style>.Separator {
  display: block;
  background-color: var(--slate-a8);
  flex-shrink: 0;
}
.Separator.Separator-size-1 {
  --separator-size: var(--space-4);
}
.Separator.Separator-size-2 {
  --separator-size: var(--space-6);
}
.Separator.Separator-size-3 {
  --separator-size: var(--space-9);
}
.Separator.Separator-size-4 {
  --separator-size: 100%;
}
.Separator.Separator-orientation-horizontal {
  width: var(--separator-size);
  height: 1px;
}
.Separator.Separator-orientation-vertical {
  width: 1px;
  height: var(--separator-size);
}</style>
