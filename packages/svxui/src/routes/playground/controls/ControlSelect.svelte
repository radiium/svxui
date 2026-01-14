<script lang="ts" generics="T extends SelectOptionType">
    import { Flexbox, Select, Text, type SelectOptionType, type SelectProps } from '$lib/index.js';

    type Props = SelectProps<T> & {
        label?: string;
    };

    let { label, value = $bindable(), ...rest }: Props = $props();
</script>

<Flexbox direction="column" gap="1" as="label">
    {#if label}
        <Text size="3">{label}</Text>
    {/if}
    <Select {...rest} bind:value />
</Flexbox>
