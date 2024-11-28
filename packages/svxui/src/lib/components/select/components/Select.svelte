<script lang="ts">
    import { clsx } from '../../../utils/clsx.js';
    import { defaultSelectProps } from '../props.js';
    import type { SelectOption, SelectProps } from '../types.js';

    let {
        elementRef = $bindable(),
        options = defaultSelectProps.options,
        value = $bindable(),
        size = defaultSelectProps.size,
        color = defaultSelectProps.color,
        radius = defaultSelectProps.radius,
        fullWidth = defaultSelectProps.fullWidth,
        selectSize,
        resolveValue = defaultSelectProps.resolveValue,
        resolveLabel = defaultSelectProps.resolveLabel,
        ...rest
    }: SelectProps = $props();

    function onMultipleChange(isMultiple: boolean | undefined): void {
        if (isMultiple) {
            if (!Array.isArray(value)) {
                if (value === undefined && value === null) {
                    value = [];
                } else {
                    value = [value];
                }
            }
        } else {
            if (Array.isArray(value)) {
                value = value.length > 0 ? value[0] : undefined;
            }
        }
    }

    function resolveOptions({
        options,
        resolveLabel,
        resolveValue
    }: {
        options: SelectProps['options'];
        resolveLabel: SelectProps['resolveLabel'];
        resolveValue: SelectProps['resolveValue'];
    }): SelectOption[] {
        if (!options || !Array.isArray(options)) {
            return [];
        }

        const isArray = Array.isArray(options);
        const isArrayString = isArray && options.every((opt) => typeof opt === 'string');
        const isArrayOpject = isArray && options.every((opt) => typeof opt === 'object');

        if (isArrayString) {
            return options.map((opt) => ({
                label: opt,
                value: opt,
                disabled: false
            }));
        } else if (isArrayOpject) {
            return options.map((opt) => ({
                label: resolveLabel!(opt),
                value: resolveValue!(opt),
                disabled: false
            }));
        }

        return [];
    }

    $effect.pre(() => {
        onMultipleChange(rest.multiple);
    });

    let resolvedOptions = $derived(resolveOptions({ options, resolveValue, resolveLabel }));
    let cssClass = $derived(
        clsx(rest.class, `Select`, {
            [`Select-size-${size}`]: size,
            'Select-full-width': fullWidth
        })
    );
</script>

{#if rest.multiple}
    <!-- Select Multiple -->
    <select
        {...rest}
        class={cssClass}
        size={selectSize}
        multiple
        data-size={size}
        data-color={color}
        data-radius={radius}
        bind:this={elementRef}
        bind:value
    >
        {#each resolvedOptions as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>
{:else}
    <select
        {...rest}
        class={cssClass}
        data-size={size}
        data-color={color}
        data-radius={radius}
        bind:this={elementRef}
        bind:value
    >
        {#if !value && rest.placeholder}
            <option value="" selected disabled>-- {rest.placeholder} --</option>
        {/if}
        {#each resolvedOptions as option}
            <option value={option.value} selected={option.value === value}>
                {option.label}
            </option>
        {/each}
    </select>
{/if}

<style lang="scss">
    .Select {
        border: none;
        display: inline-flex;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        position: relative;

        color: var(--color);
        font-size: var(--select-font-size);
        line-height: var(--select-font-size);
        letter-spacing: var(--select-select-letter-spacing);
        height: var(--select-height);
        border-radius: var(--select-border-radius);
        padding-left: var(--select-padding-left);
        padding-right: var(--select-padding-right);
        background-color: var(--color-surface);
        box-shadow: inset 0px 0px 0px 1px var(--input-box-shadow);

        // Select multiple
        &[multiple] {
            height: auto !important;
            padding: 0 !important;

            option {
                height: var(--select-height);
                position: relative;
                display: inline-flex;
                align-items: center;
                padding-left: var(--select-padding-left);
                padding-right: var(--select-padding-right);

                &:checked {
                    color: var(--color);
                    background-color: var(--slate-a6);
                }
            }
        }

        // Custom arrow icon
        &:not([multiple]) {
            background-repeat: no-repeat;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLWNoZXZyb249InRydWUiIHN0eWxlPSJjb2xvcjogcmdiKDEzNCwgMTQyLCAxNTApOyI+PHBhdGggZD0iTTQuOTMxNzkgNS40MzE3OUM0Ljc1NjA1IDUuNjA3NTMgNC43NTYwNSA1Ljg5MjQ1IDQuOTMxNzkgNi4wNjgxOUM1LjEwNzUzIDYuMjQzOTIgNS4zOTI0NSA2LjI0MzkyIDUuNTY4MTkgNi4wNjgxOUw3LjQ5OTk5IDQuMTM2MzhMOS40MzE3OSA2LjA2ODE5QzkuNjA3NTMgNi4yNDM5MiA5Ljg5MjQ1IDYuMjQzOTIgMTAuMDY4MiA2LjA2ODE5QzEwLjI0MzkgNS44OTI0NSAxMC4yNDM5IDUuNjA3NTMgMTAuMDY4MiA1LjQzMTc5TDcuODE4MTkgMy4xODE3OUM3LjczMzc5IDMuMDk3NCA3LjYxOTMzIDMuMDQ5OTkgNy40OTk5OSAzLjA0OTk5QzcuMzgwNjQgMy4wNDk5OSA3LjI2NjE4IDMuMDk3NCA3LjE4MTc5IDMuMTgxNzlMNC45MzE3OSA1LjQzMTc5Wk0xMC4wNjgyIDkuNTY4MTlDMTAuMjQzOSA5LjM5MjQ1IDEwLjI0MzkgOS4xMDc1MyAxMC4wNjgyIDguOTMxNzlDOS44OTI0NSA4Ljc1NjA2IDkuNjA3NTMgOC43NTYwNiA5LjQzMTc5IDguOTMxNzlMNy40OTk5OSAxMC44NjM2TDUuNTY4MTkgOC45MzE3OUM1LjM5MjQ1IDguNzU2MDYgNS4xMDc1MyA4Ljc1NjA2IDQuOTMxNzkgOC45MzE3OUM0Ljc1NjA1IDkuMTA3NTMgNC43NTYwNSA5LjM5MjQ1IDQuOTMxNzkgOS41NjgxOUw3LjE4MTc5IDExLjgxODJDNy4zNTc1MyAxMS45OTM5IDcuNjQyNDUgMTEuOTkzOSA3LjgxODE5IDExLjgxODJMMTAuMDY4MiA5LjU2ODE5WiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjwvc3ZnPg==);
            background-repeat: no-repeat;
            background-position: top 5px right 10px;
            background-position:
                calc(100% - var(--space-2)) 50%,
                calc(100% - var(--space-3)) 50%;
            background-size: calc(var(--select-font-size) * 1.4);
        }

        // States
        &:focus,
        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: -1px;
        }

        &:disabled {
            @include disabled;
        }

        &.Select-full-width {
            width: 100%;
        }

        // Sizes
        &.Select-size-1 {
            --select-height: var(--space-5);
            --select-border-radius: max(var(--radius-2), var(--radius-full));
            --select-padding-left: var(--space-2);
            --select-padding-right: calc(var(--space-2) * 4);

            --select-font-size: var(--font-size-1);
            --select-letter-spacing: var(--letter-spacing-1);

            &[multiple] {
                --select-border-radius: var(--radius-1);
            }
        }
        &.Select-size-2 {
            --select-height: var(--space-6);
            --select-border-radius: max(var(--radius-2), var(--radius-full));
            --select-padding-left: var(--space-3);
            --select-padding-right: calc(var(--space-3) * 3);

            --select-font-size: var(--font-size-2);
            --select-letter-spacing: var(--letter-spacing-2);

            &[multiple] {
                --select-border-radius: var(--radius-2);
            }
        }
        &.Select-size-3 {
            --select-height: var(--space-7);
            --select-border-radius: max(var(--radius-3), var(--radius-full));
            --select-padding-left: var(--space-4);
            --select-padding-right: calc(var(--space-3) * 3);

            --select-font-size: var(--font-size-3);
            --select-letter-spacing: var(--letter-spacing-3);

            &[multiple] {
                --select-border-radius: var(--radius-3);
            }
        }
    }
</style>
