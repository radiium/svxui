<script lang="ts">
    import Switch from '$lib/components/switch/components/switch.svelte';
    import { Flexbox, Text } from '$lib/index.js';

    type Props = {
        value: boolean;
        label: string;
    };
    let { value = $bindable(), label }: Props = $props();
</script>

<Flexbox align="center" gap="2" as="label">
    <Switch color="green" bind:checked={value} />
    <Text>{label}</Text>
</Flexbox>
