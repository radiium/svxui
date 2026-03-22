<script lang="ts">
    import { Select, SelectOption, type SelectProps } from '$lib/index.js';

    let {
        ref = $bindable(),
        options = [],
        ...props
    }: { options: { label: string; value: string; disabled?: boolean }[] } & SelectProps<
        any,
        boolean
    > = $props();
</script>

<Select bind:ref {...props}>
    {#each options as opt, i (i)}
        <SelectOption value={opt.value} disabled={opt.disabled}>{opt.label}</SelectOption>
    {/each}
</Select>
