<script lang="ts">
    import { Box } from '$lib/components/box/index.js';
    import { Flex } from '$lib/components/flex/index.js';
    import { Text } from '$lib/index.js';
    import Playground from '../../../controls/Playground.svelte';
</script>

<h1>layout/box</h1>
<Text muted size="2">Box model via inline styles (p, m, w, h, display…)</Text>

<Playground>
    <Flex justify="start" gap="3" wrap="wrap" align="center">
        <Box class="box-demo" p="4">p="4"</Box>
        <Box class="box-demo" px="5" py="2">px="5" py="2"</Box>
        <Box class="box-demo" p="3" m="2" width="80px" height="40px">w×h</Box>
        <Box class="box-demo" p="3" display="inline-block">display flex</Box>
    </Flex>
</Playground>

<style>
    :global(.box-demo) {
        background: var(--green-3);
        border-radius: 4px;
    }
</style>
