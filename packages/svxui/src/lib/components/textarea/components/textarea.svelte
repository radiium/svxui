<script lang="ts">
    import { defaultTextareaProps } from '../props.js';
    import type { TextareaProps } from '../types.js';

    let {
        elementRef = $bindable(),
        value = $bindable(),
        color = defaultTextareaProps.color,
        size = defaultTextareaProps.size,
        radius = defaultTextareaProps.radius,
        fullWidth = defaultTextareaProps.fullWidth,
        resizable = defaultTextareaProps.resizable,
        ...rest
    }: TextareaProps = $props();

    let cssClass = $derived([
        rest.class,
        'textarea',
        {
            [`textarea-size-${size}`]: size,
            [`textarea-color-${color}`]: color,
            'textarea-full-width': fullWidth,
            'textarea-resizable': resizable
        }
    ]);
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

<style>
    .textarea {
        flex-shrink: 0;
        box-sizing: border-box;
        position: relative;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border-width: 0;
        outline: none;
        cursor: text;
        font-family: inherit;
        text-overflow: ellipsis;
        letter-spacing: normal;
        resize: none;

        font-size: var(--font-size-3);
        border-radius: var(--radius-3);
        color: var(--color);
        background: var(--color-surface);
        box-shadow: inset 0px 0px 0px 1px var(--color-box-shadow);

        min-width: var(--textarea-min-width);
        padding: var(--textarea-padding);
        border-radius: var(--textarea-border-radius);
        font-size: var(--textarea-font-size);
        letter-spacing: var(--textarea-letter-spacing);

        /* States */
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
            cursor: default !important;
            opacity: 0.5 !important;
            outline: none !important;
            pointer-events: none;

            &:focus,
            &:focus-within,
            &:focus-visible {
                box-shadow: none !important;
                outline: none !important;
            }
        }

        &.textarea-full-width {
            width: 100%;
        }

        &.textarea-resizable {
            resize: vertical;
        }

        /* Sizes */
        &.textarea-size-1 {
            --textarea-min-width: calc(var(--space-9) * 3);
            --textarea-padding: var(--space-1);
            --textarea-border-radius: var(--radius-3);
            --textarea-font-size: var(--font-size-1);
            --textarea-letter-spacing: var(--letter-spacing-1);
        }
        &.textarea-size-2 {
            --textarea-min-width: calc(var(--space-9) * 3);
            --textarea-padding: var(--space-2);
            --textarea-border-radius: var(--radius-3);
            --textarea-font-size: var(--font-size-2);
            --textarea-letter-spacing: var(--letter-spacing-2);
        }
        &.textarea-size-3 {
            --textarea-min-width: calc(var(--space-9) * 3);
            --textarea-padding: var(--space-3);
            --textarea-border-radius: var(--radius-3);
            --textarea-font-size: var(--font-size-3);
            --textarea-letter-spacing: var(--letter-spacing-3);
        }
    }
</style>
