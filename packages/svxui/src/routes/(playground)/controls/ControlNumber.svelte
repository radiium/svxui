<script lang="ts">
    import { Flexbox, InputNumber, Text, type InputNumberProps } from '$lib/index.js';

    type Props = InputNumberProps & {
        label?: string;
    };

    let { value = $bindable(), label, ...rest }: Props = $props();
</script>

<Flexbox direction="column" gap="1">
    {#if label}
        <Text size="3">{label}</Text>
    {/if}
    <InputNumber {...rest} bind:value />
</Flexbox>
