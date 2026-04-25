<script lang="ts">
    import { Panel, Text } from '$lib/index.js';
    import Box from '$lib/layouts/box/components/box.svelte';
    import Flex from '$lib/layouts/flex/components/flex.svelte';
    import Playground from '../../controls/Playground.svelte';
</script>

<h1>layout/box</h1>
<Text muted size="2">Box model via inline styles (p, m, w, h, display…)</Text>

<Playground>
    <Flex justify="start" gap="3" wrap="wrap" align="center">
        <Box class="box-demo" p="4">
            <Panel color="grass" fullHeight fullWidth>p="4"</Panel>
        </Box>
        <Box class="box-demo" px="5" py="2">
            <Panel color="grass" fullHeight fullWidth>px="5" py="2"</Panel>
        </Box>
        <Box class="box-demo" p="3" m="2" width="80px" height="40px">
            <Panel color="grass" fullHeight fullWidth>w×h</Panel>
        </Box>
        <Box class="box-demo" p="3" display="inline-block">
            <Panel color="grass" fullHeight fullWidth>display</Panel>
        </Box>
    </Flex>
</Playground>

<style>
    :global(.box-demo) {
        background: var(--green-3);
        border-radius: 4px;
    }
</style>
