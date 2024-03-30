<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { setContext } from 'svelte';
    import type { InputGroupProps } from './InputGroup.types.js';
    import { InputGroupContextKey } from '$lib/constants.js';

    type $$Props = InputGroupProps;
    $: cssClass = clsx($$restProps.class, `InputGroup`);

    setContext(InputGroupContextKey, true);
</script>

<div {...$$restProps} role="group" class={cssClass} style={$$restProps.style}>
    <slot />
</div>

<style lang="scss">
    .InputGroup {
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
        background: var(--input-background);
        box-shadow: var(--input-box-shadow);

        :global(.is-in-group) {
            position: relative;
            box-shadow: none !important;
            border-radius: 0 0 0 0 !important;
            border-width: 0 1px 0 0 !important;
            border-style: solid !important;
            border-color: var(--slate-a8) !important;

            &:focus,
            &:focus-visible {
                z-index: 3000;
            }

            &:first-child {
                border-radius: var(--radius-3) 0 0 var(--radius-3) !important;
            }
            &:last-child {
                border-radius: 0 var(--radius-3) var(--radius-3) 0 !important;
                border-width: 0 0 0 0 !important;
            }
        }
    }
</style>
