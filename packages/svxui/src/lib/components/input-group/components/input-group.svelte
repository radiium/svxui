<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import type { InputGroupProps } from '../types.js';

    let { elementRef = $bindable(), children, ...rest }: InputGroupProps = $props();

    let cssClass = $derived(clsx(rest.class, `InputGroup`));
</script>

<div {...rest} role="group" class={cssClass} bind:this={elementRef}>
    {@render children?.()}
</div>

<style lang="scss" global>
    .InputGroup {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        flex-direction: row;
        align-items: stretch;
        flex-shrink: 0;
        transition: background-color linear 80ms;
        border-radius: max(var(--radius-3), var(--radius-full));

        > :first-child {
            border-bottom-right-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }
        > :not(:first-child, :last-child) {
            margin-right: -1px !important;
            border-radius: 0 !important;
        }
        > :last-child {
            border-bottom-left-radius: 0 !important;
            border-top-left-radius: 0 !important;
        }

        .Button,
        .Select,
        .Input,
        .InputRange,
        .InputGroup-item {
            position: relative;
            border: none;
            box-shadow: inset var(--accent-box-shadow) !important;

            &:focus:not(button),
            &:focus-visible,
            &:focus-within {
                z-index: 3000;
                // box-shadow: inset var(--accent-box-shadow-focus) !important;
                outline-offset: 0 !important;
                outline: 1px solid var(--accent-8) !important;
            }
        }

        .InputGroup-item {
            .Radio,
            .Checkbox,
            .Switch {
                &:focus:not(button),
                &:focus-visible {
                    outline: none;
                }
            }
        }
    }
</style>
