<script>import { clsx } from '../../utils/clsx.js';
import { defaultCardProps } from './Card.props.js';
export let elementRef = defaultCardProps.elementRef;
export let size = defaultCardProps.size;
$: cssClass = clsx($$restProps.class, 'Card', {
    [`Card-size-${size}`]: size
});
</script>

<div {...$$restProps} class={cssClass} style={$$restProps.style} bind:this={elementRef}>
    <slot />
</div>

<style>.Card {
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  background-color: var(--background-level-2);
  box-shadow: var(--input-box-shadow);
  position: relative;
  overflow: hidden;
}
.Card.Card-size-0 {
  --card-padding: var(--space-0);
  --card-border-radius: var(--radius-3);
}
.Card.Card-size-1 {
  --card-padding: var(--space-3);
  --card-border-radius: var(--radius-4);
}
.Card.Card-size-2 {
  --card-padding: var(--space-4);
  --card-border-radius: var(--radius-4);
}
.Card.Card-size-3 {
  --card-padding: var(--space-5);
  --card-border-radius: var(--radius-5);
}
.Card.Card-size-4 {
  --card-padding: var(--space-6);
  --card-border-radius: var(--radius-5);
}
.Card.Card-size-5 {
  --card-padding: var(--space-8);
  --card-border-radius: var(--radius-6);
}</style>
