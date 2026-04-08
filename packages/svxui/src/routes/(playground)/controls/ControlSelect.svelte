<script lang="ts" generics="Value extends string | number, Option extends string">
    import { Flex, Select, SelectOption, Text, type SelectProps } from '$lib/index.js';

    type Props = SelectProps<Value, false> & {
        label?: string;
        options: Option[];
    };

    let { label, value = $bindable(), options = [], ...rest }: Props = $props();
</script>

<Flex justify="start" direction="column" gap="1" as="label">
    {#if label}
        <Text size="3">{label}</Text>
    {/if}
    <Select tabindex={0} {...rest} bind:value placeholder="Select {label}">
        {#each options as opt (opt)}
            <SelectOption value={opt}>{opt}</SelectOption>
        {/each}
    </Select>
</Flex>
