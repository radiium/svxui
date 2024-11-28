<script lang="ts">
    import { Flexbox, InputNumber, Text } from '$lib/index.js';

    type Props = {
        value: number;
        label: string;
    };
    let { value = $bindable(), label }: Props = $props();
</script>

<Flexbox direction="column" align="start" gap="2" as="label">
    <Text>{label}</Text>
    <InputNumber bind:value />
</Flexbox>
