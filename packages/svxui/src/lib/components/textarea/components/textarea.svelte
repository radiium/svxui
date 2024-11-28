<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import { defaultTextareaProps } from '../props.js';
    import type { TextareaProps } from '../types.js';

    let {
        elementRef = $bindable(),
        value = $bindable(),
        color = defaultTextareaProps.color,
        size = defaultTextareaProps.size,
        radius = defaultTextareaProps.radius,
        fullWidth = defaultTextareaProps.fullWidth,
        ...rest
    }: TextareaProps = $props();

    let cssClass = $derived(
        clsx(rest.class, 'Textarea', {
            [`Textarea-size-${size}`]: size,
            'Textarea-full-width': fullWidth
        })
    );
</script>

<textarea
    rows={3}
    spellcheck={false}
    {...rest}
    data-size={size}
    data-color={color}
    data-radius={radius}
    class={cssClass}
    bind:this={elementRef}
    bind:value
></textarea>

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
        letter-spacing: normal;
        resize: vertical;

        font-size: var(--font-size-3);
        border-radius: var(--radius-3);
        color: var(--color);
        background: var(--color-surface);
        box-shadow: inset 0px 0px 0px 1px var(--input-box-shadow);

        min-width: var(--textarea-min-width);
        padding: var(--textarea-padding);
        border-radius: var(--textarea-border-radius);
        font-size: var(--textarea-font-size);
        letter-spacing: var(--textarea-letter-spacing);

        // States
        &::selection {
            background-color: var(--accent-5);
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

        &.Textarea-full-width {
            width: 100%;
        }

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
    }
</style>
