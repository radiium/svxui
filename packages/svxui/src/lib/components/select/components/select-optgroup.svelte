<script lang="ts">
    import type { SelectOptgroupProps } from '../types.ts';

    let { label, disabled, children, ...rest }: SelectOptgroupProps = $props();

    let cssClass = $derived([rest.class, `select-optgroup`]);
</script>

<optgroup {...rest} {label} {disabled} class={cssClass}>{@render children?.()}</optgroup>

<style>
    :global(.select[multiple]) {
        .select-optgroup {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1px;
            margin: var(--space-2) 0 0 var(--space-2);
        }
    }
</style>
