<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultTextareaProps } from './Textarea.props.js';
    import type { TextareaProps } from './Textarea.types.js';

    type $$Props = TextareaProps;
    export let elementRef: $$Props['elementRef'] = defaultTextareaProps.elementRef;
    export let value: $$Props['value'] = defaultTextareaProps.value;
    export let color: $$Props['color'] = defaultTextareaProps.color;
    export let size: $$Props['size'] = defaultTextareaProps.size;
    export let radius: $$Props['radius'] = defaultTextareaProps.radius;
    export let fullWidth: $$Props['fullWidth'] = defaultTextareaProps.fullWidth;

    $: cssClass = clsx($$restProps.class, 'Textarea', {
        [`Textarea-size-${size}`]: size,
        'Textarea-full-width': fullWidth
    });
</script>

<textarea
    rows={3}
    spellcheck={false}
    data-size={size}
    data-color={color}
    data-radius={radius}
    {...$$restProps}
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
/>

<style lang="scss">
    .Textarea {
        flex-shrink: 0;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border-width: 0;
        outline: none;
        cursor: text;
        font-family: inherit;
        text-overflow: ellipsis;
        font-size: var(--font-size-3);
        letter-spacing: normal;
        resize: vertical;
        border-radius: var(--radius-3);
        color: var(--color);
        background: var(--color-surface);
        box-shadow: inset 0px 0px 0px 1px var(--input-box-shadow);
        min-width: var(--textarea-min-width);
        padding: var(--textarea-padding);
        border-radius: var(--textarea-border-radius);
        font-size: var(--textarea-font-size);
        letter-spacing: var(--textarea-letter-spacing);

        // Sizes
        &.Textarea-size-1 {
            --textarea-min-width: calc(var(--space-9) * 3);
            --textarea-padding: var(--space-1);
            --textarea-border-radius: var(--radius-3);
            --textarea-font-size: var(--font-size-1);
            --textarea-letter-spacing: var(--letter-spacing-1);
        }
        &.Textarea-size-2 {
            --textarea-min-width: calc(var(--space-9) * 3);
            --textarea-padding: var(--space-2);
            --textarea-border-radius: var(--radius-3);
            --textarea-font-size: var(--font-size-2);
            --textarea-letter-spacing: var(--letter-spacing-2);
        }
        &.Textarea-size-3 {
            --textarea-min-width: calc(var(--space-9) * 3);
            --textarea-padding: var(--space-3);
            --textarea-border-radius: var(--radius-3);
            --textarea-font-size: var(--font-size-3);
            --textarea-letter-spacing: var(--letter-spacing-3);
        }

        // fullWidth
        &.Textarea-full-width {
            width: 100%;
        }

        // States

        &::selection {
            background-color: var(--accent-a5);
        }

        &:active,
        &:focus,
        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: -1px;
        }

        &:disabled {
            @include disabled;
        }
    }
</style>
