<script lang="ts">
    import type { InputGroupProps } from '../types.js';

    let { elementRef = $bindable(), children, ...rest }: InputGroupProps = $props();

    let cssClass = $derived([rest.class, `input-group`]);
</script>

<div {...rest} role="group" class={cssClass} bind:this={elementRef}>
    {@render children?.()}
</div>

<style>
    :global(.input-group) {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        flex-direction: row;
        align-items: stretch;
        flex-shrink: 0;
        transition: background-color linear 80ms;
        border-radius: max(var(--radius-3), var(--radius-full));
    }

    :global(.input-group > :first-child) {
        border-bottom-right-radius: 0 !important;
        border-top-right-radius: 0 !important;
    }
    :global(.input-group > :not(:first-child, :last-child)) {
        border-radius: 0 !important;
    }
    :global(.input-group > :last-child) {
        border-bottom-left-radius: 0 !important;
        border-top-left-radius: 0 !important;
    }
    :global(.input-group > :not(:first-child)) {
        margin-left: -1px;
    }

    :global(.input-group > .button),
    :global(.input-group > .select),
    :global(.input-group > .input),
    :global(.input-group > .input-range),
    :global(.input-group > .input-group-item) {
        position: relative;
        border: none;
        box-shadow: inset var(--accent-box-shadow) !important;

        &:focus:not(button),
        &:focus-visible,
        &:focus-within {
            outline-offset: 0 !important;
            outline: 2px solid var(--accent-8) !important;
            z-index: 1;
        }
    }

    :global(.input-group-item > .radio),
    :global(.input-group-item > .checkbox),
    :global(.input-group-item > .switch) {
        &:focus:not(button),
        &:focus-visible {
            outline: none;
        }
    }
</style>
