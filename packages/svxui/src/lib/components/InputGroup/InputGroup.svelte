<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { setInputGroupContext } from './InputGroup.context.js';
    import { defaultInputGroupProps } from './InputGroup.props.js';
    import type { InputGroupProps } from './InputGroup.types.js';

    type $$Props = InputGroupProps;
    export let elementRef: $$Props['elementRef'] = defaultInputGroupProps.elementRef;

    $: cssClass = clsx($$restProps.class, `InputGroup`);

    setInputGroupContext(true);
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
        align-items: stretch;
        flex-shrink: 0;
        text-decoration: none;
        white-space: nowrap;
        user-select: none;
        font-weight: bold;
        transition: background-color linear 80ms;
        border-radius: var(--radius-3);

        :global(.is-in-group) {
            position: relative;
            border: none;
            border-radius: 0 0 0 0 !important;
            box-shadow: inset var(--accent-box-shadow) !important;

            &:focus,
            &:focus-visible {
                z-index: 3000;
                box-shadow: inset 0 0 0 1px var(--slate-8) !important;
            }

            &:first-child {
                border-radius: var(--radius-3) 0 0 var(--radius-3) !important;
            }
            &:not(:last-child) {
                margin-right: -1px;
            }
            &:last-child {
                border-radius: 0 var(--radius-3) var(--radius-3) 0 !important;
            }
        }
    }
</style>
