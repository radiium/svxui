<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Accordion, Box, Button, Flex, Panel, Separator, Text } from 'svxui';

    const items = ['1', '2', '3', '4'];
</script>

<Box width="300px">
    <Panel variant="clear" outline size="0">
        <Accordion orientation="vertical">
            {#snippet children(accordion)}
                <Flex justify="start" direction="column" {...accordion.rootAttrs}>
                    {#each items as value, i (value)}
                        <!-- Item -->
                        {@const item = accordion.getItem(value, { id: value })}

                        <Flex justify="start" direction="column" {...item.itemAttrs}>
                            <!-- Heading -->
                            <Box p="4">
                                <Flex justify="between" align="center" {...item.headingAttrs}>
                                    <Text disabled={item.disabled}>Title {value}</Text>
                                    <!-- Trigger -->
                                    <Button size="1" variant="soft" {...item.triggerAttrs}>
                                        {item.expanded ? 'close' : 'open'}
                                    </Button>
                                </Flex>
                            </Box>

                            <!-- Content -->
                            {#if item.expanded}
                                <div transition:slide={{ duration: 150 }} {...item.contentAttrs}>
                                    <Box p="4">
                                        Content {value}
                                    </Box>
                                </div>
                            {/if}
                        </Flex>

                        {#if i < items.length - 1}
                            <Separator size="4" />
                        {/if}
                    {/each}
                </Flex>
            {/snippet}
        </Accordion>
    </Panel>
</Box>
