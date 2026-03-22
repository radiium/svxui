<script lang="ts">
    import { Flexbox, Input, Text, type InputProps } from '$lib/index.js';

    type Props = InputProps & {
        label?: string;
    };

    let { value = $bindable(), label, ...rest }: Props = $props();
</script>

<Flexbox direction="column" gap="1">
    {#if label}
        <Text size="3">{label}</Text>
    {/if}
    <Input tabindex={0} {...rest} bind:value />
</Flexbox>
