<script lang="ts">
    import { Box, Flex } from 'svxui';
</script>

<Flex justify="start" gap="4" wrap="wrap" align="center">
    <Box class="demo" p="4">p="4"</Box>
    <Box class="demo" px="5" py="2">px="5" py="2"</Box>
    <Box class="demo" p="3" m="2" width="80px" height="40px">w × h</Box>
    <Box class="demo" p="3" display="inline-block">display</Box>
    <Box class="demo" p="4" overflow="hidden" maxWidth="100px">overflow hidden long text</Box>
</Flex>

<style>
    :global(.demo) {
        background: var(--green-3);
        border: 1px solid var(--green-6);
        border-radius: 6px;
        font-size: 0.8rem;
        color: var(--green-11);
        white-space: nowrap;
    }
</style>
