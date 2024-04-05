<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultTextareaProps } from './Textarea.props.js';
    import type { TextareaProps } from './Textarea.types.js';

    type $$Props = TextareaProps;
    export let elementRef: $$Props['elementRef'] = defaultTextareaProps.elementRef;
    export let value: $$Props['value'] = defaultTextareaProps.value;
    export let size: $$Props['size'] = defaultTextareaProps.size;
    export let fullWidth: $$Props['fullWidth'] = defaultTextareaProps.fullWidth;

    $: cssClass = clsx($$restProps.class, 'Textarea', {
        [`Textarea-size-${size}`]: size,
        'Textarea-full-width': fullWidth
    });
</script>

<textarea
    rows={3}
    spellcheck={false}
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
        border-width: 0;
        outline: none;
        cursor: text;
        font-family: inherit;
        text-overflow: ellipsis;
        font-size: var(--font-size-3);
        letter-spacing: normal;
        resize: vertical;
        border-radius: var(--radius-3);
        color: var(--input-color);
        background: var(--input-background);
        box-shadow: var(--input-box-shadow);

        // Sizes
        &.Textarea-size-1 {
            min-width: calc(var(--space-9) * 3);
            padding: var(--space-1);
            border-radius: var(--radius-3);
            font-size: var(--font-size-1);
            letter-spacing: var(--letter-spacing-1);
        }
        &.Textarea-size-2 {
            min-width: calc(var(--space-9) * 3);
            padding: var(--space-2);
            border-radius: var(--radius-3);
            font-size: var(--font-size-2);
            letter-spacing: var(--letter-spacing-2);
        }
        &.Textarea-size-3 {
            min-width: calc(var(--space-9) * 3);
            padding: var(--space-3);
            border-radius: var(--radius-3);
            font-size: var(--font-size-3);
            letter-spacing: var(--letter-spacing-3);
        }

        // fullWidth
        &.Textarea-full-width {
            width: 100%;
        }

        // States
        &:active,
        &:focus,
        &:focus-visible {
            box-shadow: var(--input-box-shadow-focus);
            outline: none;
        }

        &:disabled {
            @include disabled;
        }
    }
</style>
