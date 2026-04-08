<script lang="ts">
    import { Flex, InputNumber, Text, type InputNumberProps } from '$lib/index.js';

    type Props = InputNumberProps & {
        label?: string;
    };

    let { value = $bindable(), label, ...rest }: Props = $props();
</script>

<Flex justify="start" direction="column" gap="1">
    {#if label}
        <Text size="3">{label}</Text>
    {/if}
    <InputNumber {...rest} bind:value />
</Flex>
