<script lang="ts">
    import Select from '$lib/components/select/components/Select.svelte';
    import { Flexbox, InputNumber, Text } from '$lib/index.js';

    type Props = {
        options: string[];
        value: string;
        label: string;
    };
    let { value = $bindable(), options, label }: Props = $props();
</script>

<Flexbox direction="column" align="start" gap="2" as="label">
    <Text>{label}</Text>
    <Select {options} bind:value />
</Flexbox>
