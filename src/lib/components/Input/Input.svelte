<script lang="ts">
    import { getContext } from 'svelte';
    import { clsx } from '../../utils/clsx.js';
    import { defaultInputProps } from './Input.props.js';
    import type { InputProps } from './Input.types.js';
    import { InputGroupContextKey } from '$lib/constants.js';

    type $$Props = InputProps;
    export let elementRef: $$Props['elementRef'] = defaultInputProps.elementRef;
    export let value: $$Props['value'] = defaultInputProps.value;
    export let type: $$Props['type'] = defaultInputProps.type;
    export let size: $$Props['size'] = defaultInputProps.size;
    export let align: $$Props['align'] = defaultInputProps.align;
    export let error: $$Props['error'] = defaultInputProps.error;
    export let fullWidth: $$Props['fullWidth'] = defaultInputProps.fullWidth;

    const isInGroup = getContext<boolean | undefined>(InputGroupContextKey);

    $: cssClass = clsx($$restProps.class, 'Input', {
        [`Input-size-${size}`]: size,
        [`Input-type-${type}`]: type,
        [`Input-align-${align}`]: align,
        'Input-full-width': fullWidth,
        'Input-error': error,
        'is-in-group': isInGroup
    });

    const setType = (node: HTMLInputElement, value: $$Props['type']) => {
        if (value) {
            node.type = value;
        }

        return {
            update: (newValue: $$Props['type']) => {
                if (newValue) {
                    node.type = newValue;
                }
            }
        };
    };
</script>

<input
    {...$$restProps}
    spellcheck="false"
    autocomplete="off"
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
    use:setType={type}
/>

<style lang="scss">
    .Input {
        z-index: 1;
        position: relative;
        appearance: none;
        min-width: 0;
        box-sizing: border-box;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        border-width: 0;
        outline: none;
        font-family: inherit;
        text-overflow: ellipsis;
        color: var(--input-color);
        border-radius: var(--radius-3);
        background: var(--input-background);
        box-shadow: var(--input-box-shadow);

        // Input type search
        &::-webkit-search-cancel-button {
            filter: invert(1); // FIXME not work in light theme
            cursor: pointer;
            -webkit-appearance: none;
            appearance: none;
            height: 15px;
            width: 15px;
            background-size: 15px 15px;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=);
        }

        // Input type date/datetime-local/month/time/week
        &::-webkit-calendar-picker-indicator {
            cursor: pointer;
            border-radius: var(--radius-2);

            &:focus {
                outline: var(--input-outline);
            }
        }

        // Sizes
        &.Input-size-1 {
            height: var(--space-5);
            // min-width: calc(var(--space-9) * 3);
            padding: 0 var(--space-2);
            border-radius: var(--radius-3);
            font-size: var(--font-size-1);
            letter-spacing: var(--letter-spacing-1);
        }
        &.Input-size-2 {
            height: var(--space-6);
            // min-width: calc(var(--space-9) * 3);
            padding: 0 var(--space-2);
            border-radius: var(--radius-3);
            font-size: var(--font-size-2);
            letter-spacing: var(--letter-spacing-2);
        }
        &.Input-size-3 {
            height: var(--space-7);
            // min-width: calc(var(--space-9) * 3);
            padding: 0 var(--space-3);
            border-radius: var(--radius-3);
            font-size: var(--font-size-3);
            letter-spacing: var(--letter-spacing-3);
        }
        // Align
        &.Input-align-start {
            text-align: start;
        }
        &.Input-align-center {
            text-align: center;
        }
        &.Input-align-end {
            text-align: end;
        }
        // FullWidth
        &.Input-full-width {
            width: 100%;
        }

        // States
        &:active,
        &:focus,
        &:focus-visible {
            outline: var(--input-outline);
        }
        &:disabled {
            @include disabled;
        }
        &:readonly,
        &:read-only {
            cursor: default;
            outline: none !important;
            box-shadow: none !important;
        }

        &.Input-error {
            box-shadow: var(--tomato-9) 0px 0px 0px 1px !important;
            background-color: var(--tomato-a2);
        }
    }
</style>
