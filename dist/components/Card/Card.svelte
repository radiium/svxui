<script>import { clsx } from '../../utils/clsx.js';
import { defaultCardProps } from './Card.props.js';
export let elementRef = defaultCardProps.elementRef;
export let size = defaultCardProps.size;
export let variant = defaultCardProps.variant;
export let outline = defaultCardProps.outline;
export let asButton = defaultCardProps.asButton;
$: cssClass = clsx($$restProps.class, 'Card', {
    [`Card-size-${size}`]: size,
    [`Card-${variant}`]: variant,
    'Card-with-outline': outline,
    'Card-as-button': asButton
});
</script>

{#if asButton}
    <button
        {...$$restProps}
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
{:else}
    <div {...$$restProps} class={cssClass} style={$$restProps.style} bind:this={elementRef}>
        <slot />
    </div>
{/if}

<style>.Card {
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  background-color: var(--card-background);
  position: relative;
  --card-box-shadow: transparent;
  --card-box-shadow-hover: transparent;
  --card-box-shadow-focus: transparent;
}
.Card::after {
  content: "";
  position: absolute;
  inset: 0 0 0 0;
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-box-shadow);
  pointer-events: none;
}
.Card.Card-as-button {
  display: block;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  border: none;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
  text-align: inherit;
  font-family: var(--default-font-family);
  color: var(--color);
  cursor: pointer;
}
.Card.Card-as-button:hover {
  background-color: var(--card-background-hover);
}
.Card.Card-as-button:hover::after {
  box-shadow: var(--card-box-shadow-hover);
}
.Card.Card-as-button:focus-visible, .Card.Card-as-button:active {
  background-color: var(--card-background-focus);
}
.Card.Card-as-button:focus-visible::after, .Card.Card-as-button:active::after {
  box-shadow: var(--card-box-shadow-focus);
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
}
.Card.Card-clear {
  --card-background: transparent;
  --card-background-hover: var(--slate-a2);
  --card-background-focus: var(--slate-a3);
}
.Card.Card-clear.Card-with-outline {
  --card-background: transparent;
  --card-background-hover: transparent;
  --card-background-focus: transparent;
}
.Card.Card-soft {
  --card-background: var(--slate-a2);
  --card-background-hover: var(--slate-a3);
  --card-background-focus: var(--slate-a4);
}
.Card.Card-soft.Card-with-outline {
  --card-background: var(--slate-a2);
  --card-background-hover: var(--slate-a2);
  --card-background-focus: var(--slate-a2);
}
.Card.Card-with-outline {
  /* --card-box-shadow: inset var(--input-box-shadow);
  --card-box-shadow-hover: inset var(--input-box-shadow-hover);
  --card-box-shadow-focus: inset var(--input-box-shadow-focus); */
  --card-box-shadow: inset 0 0 0 1px var(--slate-a5);
  --card-box-shadow-hover: inset 0 0 0 1px var(--slate-a6);
  --card-box-shadow-focus: inset 0 0 0 1px var(--slate-a7);
}</style>
