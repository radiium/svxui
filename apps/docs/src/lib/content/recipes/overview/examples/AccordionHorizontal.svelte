<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Accordion, Box, Flex, Panel, Separator, Text } from 'svxui';

    const items = [
        { id: '1', label: 'Design', description: 'UI, brand identity and design systems' },
        { id: '2', label: 'Development', description: 'Frontend, backend and architecture' },
        { id: '3', label: 'Marketing', description: 'Growth, campaigns and analytics' },
        { id: '4', label: 'Research', description: 'User insights and usability testing' },
        { id: '5', label: 'QA', description: 'Testing, quality and bug tracking' },
        { id: '6', label: 'DevOps', description: 'Infrastructure, CI/CD and monitoring' }
    ];
</script>

<div class="max-w-full overflow-scroll">
    <Accordion orientation="vertical">
        {#snippet children(accordion)}
            <Panel variant="clear" outline p="0" class="w-fit">
                <Flex {...accordion.rootAttrs}>
                    {#each items as { id, label, description }, i (id)}
                        <!-- Item -->
                        {@const item = accordion.getItem(id)}

                        <Flex justify="start" overflow="hidden" height="150px" {...item.itemAttrs}>
                            <!-- Trigger -->
                            <Panel variant="soft" radius="none" as="button" {...item.triggerAttrs}>
                                <!-- Heading -->
                                <Box width="30px">
                                    <Text
                                        as="div"
                                        size="5"
                                        weight="medium"
                                        disabled={item.disabled}
                                        {...item.headingAttrs}
                                        style="text-orientation: sideways; writing-mode: sideways-lr;"
                                    >
                                        {label}
                                    </Text>
                                </Box>
                            </Panel>

                            <!-- Content -->
                            {#if item.expanded}
                                <div transition:slide={{ duration: 150, axis: 'x' }} {...item.contentAttrs}>
                                    <Box p="4" width="200px" height="100%">
                                        <Text size="5">{description}</Text>
                                    </Box>
                                </div>
                            {/if}
                        </Flex>

                        {#if i < items.length - 1}
                            <Separator size="4" orientation="vertical" />
                        {/if}
                    {/each}
                </Flex>
            </Panel>
        {/snippet}
    </Accordion>
</div>
