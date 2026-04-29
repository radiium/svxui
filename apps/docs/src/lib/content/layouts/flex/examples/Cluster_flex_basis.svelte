<script lang="ts">
    import { Box, Flex, Panel } from 'svxui';
</script>

<Flex justify="center" wrap="wrap" gap="3" width="100%">
    {#each { length: 5 }, i (i)}
        <Box flexGrow="1" flexShrink="1" flexBasis="200px">
            <Panel outline p="5">{i + 1}</Panel>
        </Box>
    {/each}
</Flex>
