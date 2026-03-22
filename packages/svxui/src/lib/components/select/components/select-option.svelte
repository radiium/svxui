<script lang="ts">
    import type { SelectOptionProps } from '../types.ts';

    let { value, disabled, children, ...rest }: SelectOptionProps = $props();

    let cssClass = $derived([rest.class, `select-option`]);
</script>

<option {...rest} {value} {disabled} class={cssClass}>{@render children?.()}</option>

<style>
    :global(.select[multiple]) {
        .select-option {
            height: var(--select-height);
            width: 100%;
            position: relative;
            display: inline-flex;
            align-items: center;
            padding-left: var(--select-padding-left);
            padding-right: var(--select-padding-right);
            border-radius: var(--select-border-radius);
            font-size: var(--select-font-size);
            line-height: var(--select-font-size);
            letter-spacing: var(--select-select-letter-spacing);

            &:checked {
                color: var(--color);
                background-color: var(--accent-a6);
            }
        }
    }

    :global(.select[multiple]:focus) {
        .select-option {
            &:checked {
                background: var(--accent-a6) linear-gradient(0deg, var(--accent-a6) 0%, var(--accent-a6) 100%);
            }
        }
    }

    :global(.select[multiple] .select-optgroup) {
        .select-option {
            margin-left: calc(var(--space-2) * -1);
            width: calc(100% + var(--space-2));

            &:first-child {
                margin-top: var(--space-2);
            }
        }
    }
</style>
