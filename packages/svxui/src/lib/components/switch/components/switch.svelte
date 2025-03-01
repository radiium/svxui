<script lang="ts">
    import { defaultSwitchProps } from '../props.js';
    import type { SwitchProps } from '../types.js';

    let {
        elementRef = $bindable(),
        checked = $bindable(),
        group = $bindable(),
        value = defaultSwitchProps.value,
        color = defaultSwitchProps.color,
        size = defaultSwitchProps.size,
        radius = defaultSwitchProps.radius,
        ...rest
    }: SwitchProps = $props();

    let cssClass = $derived([
        rest.class,
        'switch',
        {
            [`switch-size-${size}`]: size,
            [`switch-color-${color}`]: color
        }
    ]);
</script>

{#if group}
    <input
        {...rest}
        class={cssClass}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        data-color={color}
        data-size={size}
        data-radius={radius}
        data-state={checked ? 'checked' : 'unchecked'}
        {value}
        bind:group
        bind:this={elementRef}
    />
{:else}
    <input
        {...rest}
        class={cssClass}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        data-color={color}
        data-size={size}
        data-radius={radius}
        data-state={checked ? 'checked' : 'unchecked'}
        {value}
        bind:checked
        bind:this={elementRef}
    />
{/if}

<style>
    .switch {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        flex-shrink: 0;
        outline: none;
        border: none;
        position: relative;
        transition:
            background-color ease 0.2s,
            box-shadow ease 0.2s;

        box-shadow: inset 0px 0px 0px 1px var(--color-box-shadow);
        width: var(--switch-width);
        height: var(--switch-height);
        border-radius: var(--switch-border-radius);
        background: var(--switch-background);
        padding: var(--switch-padding);

        --switch-background: var(--neutral-3);
        --switch-background-checked: var(--accent-track);
        --switch-check-color: white;

        &:after {
            content: '';
            display: block;
            height: var(--switch-thumb-size);
            width: var(--switch-thumb-size);
            background-color: var(--switch-check-color);
            border-radius: calc(var(--switch-border-radius) - 1px);
            box-shadow: 0 0 0 1px var(--black-a2);
            transition:
                background-color ease 0.2s,
                box-shadow ease 0.2s,
                transform ease 0.2s;
        }

        /* States */
        &:checked {
            background-color: var(--switch-background-checked);

            &:after {
                transform: translateX(var(--switch-thumb-translate));
                display: block;
            }
        }

        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: 1px;
        }

        &[disabled] {
            cursor: default !important;
            opacity: 0.5 !important;
            outline: none !important;
            pointer-events: none;

            &:focus,
            &:focus-visible {
                box-shadow: none !important;
                outline: none !important;
            }
        }

        /* Sizes */
        &.switch-size-1 {
            --switch-padding: 2px;
            --switch-height: var(--space-4);
            --switch-width: calc(var(--switch-height) * 1.75);
            --switch-thumb-size: calc(var(--switch-height) - var(--switch-padding) * 2);
            --switch-thumb-translate: calc(var(--switch-width) - var(--switch-height));
            --switch-border-radius: max(var(--radius-1), var(--radius-thumb));
        }
        &.switch-size-2 {
            --switch-padding: 3px;
            --switch-height: calc(var(--space-5) * 5 / 6);
            --switch-width: calc(var(--switch-height) * 1.75);
            --switch-thumb-size: calc(var(--switch-height) - var(--switch-padding) * 2);
            --switch-thumb-translate: calc(var(--switch-width) - var(--switch-height));

            --switch-border-radius: max(var(--radius-2), var(--radius-thumb));
        }
        &.switch-size-3 {
            --switch-padding: 3px;
            --switch-height: var(--space-5);
            --switch-width: calc(var(--switch-height) * 1.75);
            --switch-thumb-size: calc(var(--switch-height) - var(--switch-padding) * 2);
            --switch-thumb-translate: calc(var(--switch-width) - var(--switch-height));
            --switch-border-radius: max(var(--radius-3), var(--radius-thumb));
        }
    }
</style>
