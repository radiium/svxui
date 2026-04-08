<script lang="ts">
    import Text from '$lib/components/text/components/text.svelte';
    import { Flex } from '$lib/index.js';

    type Props = {
        label?: string;
        value?: unknown;
    };

    let { label, value }: Props = $props();
</script>

<Flex justify="start" align="center" gap="5" as="label">
    <Text style="min-width: 125px" align="end">{label}:</Text>
    <Text muted>{value}</Text>
</Flex>
