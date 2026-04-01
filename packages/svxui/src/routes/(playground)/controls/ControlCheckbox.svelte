<script lang="ts">
    import { Checkbox, Flexbox, Text, type CheckboxProps } from '$lib/index.js';

    type Props = CheckboxProps & {
        label?: string;
    };

    let { checked = $bindable(), label, ...rest }: Props = $props();
</script>

<Flexbox align="center" gap="2" as="label">
    <Checkbox tabindex={0} {...rest} bind:checked />
    {#if label}
        <Text size="3">{label}</Text>
    {/if}
</Flexbox>
