<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { setContext } from 'svelte';
    import type { InputGroupProps } from './InputGroup.types.js';
    import { InputGroupContextKey } from '$lib/constants.js';
    import { defaultInputGroupProps } from './InputGroup.props.js';

    type $$Props = InputGroupProps;
    export let elementRef: $$Props['elementRef'] = defaultInputGroupProps.elementRef;

    $: cssClass = clsx($$restProps.class, `InputGroup`);

    setContext(InputGroupContextKey, true);
</script>

<div {...$$restProps} role="group" class={cssClass} style={$$restProps.style} bind:this={elementRef}>
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
        /* background: var(--input-background); */
        //box-shadow: var(--input-box-shadow);

        :global(.is-in-group) {
            position: relative;
            border: none;
            // box-shadow: none !important;
            // box-shadow: inset var(--input-box-shadow);
            border-radius: 0 0 0 0 !important;
            /* border-width: 1px !important;
            border-style: solid !important;
            border-color: var(--slate-a5) !important; */
            box-shadow: inset var(--input-box-shadow) !important;

            &:focus,
            &:focus-visible {
                z-index: 3000;
                box-shadow: inset var(--input-box-shadow-focus) !important;
            }

            &:focus-visible {
                z-index: 3000;
                box-shadow: inset var(--input-box-shadow-focus);
            }

            &:first-child {
                border-radius: var(--radius-3) 0 0 var(--radius-3) !important;
            }
            &:not(:last-child) {
                margin-right: -1px;
            }
            &:last-child {
                border-radius: 0 var(--radius-3) var(--radius-3) 0 !important;
                // border-width: 0 0 0 0 !important;
            }
        }
    }
</style>
