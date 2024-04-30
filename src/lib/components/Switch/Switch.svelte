<script lang="ts">
    import { clsx } from '../../utils/clsx.js';
    import { defaultSwitchProps } from './Switch.props.js';
    import type { SwitchProps } from './Switch.types.js';

    type $$Props = SwitchProps;
    export let elementRef: $$Props['elementRef'] = defaultSwitchProps.elementRef;
    export let checked: $$Props['checked'] = defaultSwitchProps.checked;
    export let size: $$Props['size'] = defaultSwitchProps.size;
    export let color: $$Props['color'] = defaultSwitchProps.color;

    $: cssClass = clsx($$restProps.class, 'Switch', {
        [`Switch-size-${size}`]: size,
        [`Switch-color-${color}`]: color
    });
</script>

<input
    {...$$restProps}
    data-color={color}
    data-size={size}
    class={cssClass}
    style={$$restProps.style}
    type="checkbox"
    bind:checked
    bind:this={elementRef}
    on:input
    on:change
    on:focus
    on:blur
    on:keydown
    on:keypress
    on:keyup
/>

<style lang="scss">
    .Switch {
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        border: none;
        position: relative;
        width: var(--switch-width);
        height: var(--switch-height);
        border-radius: var(--radius-2);
        background: var(--switch-background);
        padding: var(--switch-padding);
        box-shadow: inset var(--input-box-shadow);
        transition:
            background-color ease 0.2s,
            box-shadow ease 0.2s;

        &:after {
            content: '';
            display: block;
            height: var(--switch-thumb-size);
            width: var(--switch-thumb-size);
            background-color: var(--switch-check-color);
            border-radius: var(--radius-1);
            transition:
                background-color ease 0.2s,
                box-shadow ease 0.2s,
                transform ease 0.2s;
        }

        // States
        &:checked {
            background-color: var(--switch-background-checked);
            box-shadow: none;

            &:after {
                transform: translateX(var(--switch-thumb-translate));
                display: block;
            }
        }

        &[disabled] {
            @include disabled;
        }

        &:focus-visible {
            box-shadow: inset var(--input-box-shadow-focus);
            outline: none;
        }

        // Colors
        --switch-background: var(--input-background);
        --switch-background-checked: var(--accent-9);
        --switch-check-color: white;

        // Sizes
        &.Switch-size-1 {
            --switch-padding: 3px;
            --switch-height: var(--space-4);
            --switch-width: calc(var(--switch-height) * 1.75);
            --switch-thumb-size: calc(var(--switch-height) - var(--switch-padding) * 2);
            --switch-thumb-translate: calc(var(--switch-width) - var(--switch-height));
        }
        &.Switch-size-2 {
            --switch-padding: 3px;
            --switch-height: calc(var(--space-5) * 5 / 6);
            --switch-width: calc(var(--switch-height) * 1.75);
            --switch-thumb-size: calc(var(--switch-height) - var(--switch-padding) * 2);
            --switch-thumb-translate: calc(var(--switch-width) - var(--switch-height));
        }
        &.Switch-size-3 {
            --switch-padding: 4px;
            --switch-height: var(--space-5);
            --switch-width: calc(var(--switch-height) * 1.75);
            --switch-thumb-size: calc(var(--switch-height) - var(--switch-padding) * 2);
            --switch-thumb-translate: calc(var(--switch-width) - var(--switch-height));
        }
    }
</style>
