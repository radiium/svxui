<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import { defaultInputProps } from '../props.js';
    import type { InputProps } from '../types.js';

    let {
        elementRef = $bindable(),
        value = $bindable(),
        type = defaultInputProps.type,
        color = defaultInputProps.color,
        size = defaultInputProps.size,
        radius = defaultInputProps.radius,
        align = defaultInputProps.align,
        fullWidth = defaultInputProps.fullWidth,
        readonly = defaultInputProps.readonly,
        inputSize = defaultInputProps.inputSize,
        ...rest
    }: InputProps = $props();

    let cssClass = $derived(
        clsx(rest.class, 'Input', {
            [`Input-size-${size}`]: size,
            [`Input-type-${type}`]: type,
            [`Input-align-${align}`]: align,
            'Input-full-width': fullWidth
        })
    );

    const setInputType = (node: HTMLInputElement, value: InputProps['type']) => {
        if (value) {
            node.type = value;
        }

        return {
            update: (newValue: InputProps['type']) => {
                if (newValue) {
                    node.type = newValue;
                }
            }
        };
    };
</script>

<input
    spellcheck="false"
    autocomplete="off"
    {...rest}
    class={cssClass}
    size={inputSize}
    {readonly}
    data-color={color}
    data-size={size}
    data-radius={radius}
    bind:this={elementRef}
    bind:value
    use:setInputType={type}
/>

<style lang="scss">
    .Input {
        z-index: 1;
        position: relative;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        box-sizing: border-box;
        min-width: 0;
        border-width: 0;
        text-overflow: ellipsis;
        display: block;
        font-style: normal;

        color: var(--color);
        font-size: var(--input-font-size);
        font-weight: var(--font-weight-regular);
        font-family: var(--default-font-family);
        letter-spacing: var(--input-letter-spacing);
        text-align: var(--input-text-align);
        line-height: var(--input-font-size);
        height: var(--input-height);
        padding: var(--input-padding);
        background: var(--color-surface);
        box-shadow: inset 0px 0px 0px 1px var(--input-box-shadow);
        border-radius: var(--input-border-radius);

        // States
        &:active,
        &:focus,
        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: -1px;
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

        &::selection {
            background-color: var(--accent-5);
        }

        // Sizes
        &.Input-size-1 {
            --input-height: var(--space-5);
            --input-padding: 0 var(--space-3);
            --input-border-radius: max(var(--radius-2), var(--radius-full));
            --input-font-size: var(--font-size-1);
            --input-letter-spacing: var(--letter-spacing-1);
        }
        &.Input-size-2 {
            --input-height: var(--space-6);
            --input-padding: 0 var(--space-3);
            --input-border-radius: max(var(--radius-3), var(--radius-full));
            --input-font-size: var(--font-size-2);
            --input-letter-spacing: var(--letter-spacing-2);
        }
        &.Input-size-3 {
            --input-height: var(--space-7);
            --input-padding: 0 var(--space-4);
            --input-border-radius: max(var(--radius-3), var(--radius-full));
            --input-font-size: var(--font-size-3);
            --input-letter-spacing: var(--letter-spacing-3);
        }

        // Align
        &.Input-align-start {
            --input-text-align: start;
        }
        &.Input-align-center {
            --input-text-align: center;
        }
        &.Input-align-end {
            --input-text-align: end;
        }

        // FullWidth
        &.Input-full-width {
            width: 100%;
        }

        // Input type search
        &::-webkit-search-cancel-button {
            --search-cancel-button-size: calc(var(--input-font-size) * 0.7);
            cursor: pointer;
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            height: var(--search-cancel-button-size);
            width: var(--search-cancel-button-size);
            background-size: var(--search-cancel-button-size) var(--search-cancel-button-size);
            background-repeat: no-repeat;
            background-position: center;
            background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=);
            margin-left: 4px;
        }

        // Input type date/datetime-local/month/time/week
        &::-webkit-datetime-edit-ampm-field,
        &::-webkit-datetime-edit-day-field,
        &::-webkit-datetime-edit-hour-field,
        &::-webkit-datetime-edit-millisecond-field,
        &::-webkit-datetime-edit-minute-field,
        &::-webkit-datetime-edit-month-field,
        &::-webkit-datetime-edit-second-field,
        &::-webkit-datetime-edit-week-field,
        &::-webkit-datetime-edit-year-field,
        &::-webkit-calendar-picker-indicator {
            &:where(:focus) {
                background-color: var(--accent-5);
                color: inherit;
                outline: none;
            }
        }
        &::-webkit-calendar-picker-indicator,
        &::-webkit-calendar-picker-indicator {
            cursor: pointer;

            &:where(:focus) {
                outline: 2px solid var(--accent-8);
                outline-offset: -1px;
                border-radius: var(--radius-2);
            }
        }
    }

    :global([data-theme='dark'] .Input::-webkit-search-cancel-button) {
        filter: invert(1);
    }

    :global([data-theme='light'] .Input::-webkit-search-cancel-button) {
        filter: unset;
    }
</style>
