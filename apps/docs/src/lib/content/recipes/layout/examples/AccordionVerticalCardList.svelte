<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Accordion, Button, Flex, Panel, Text } from 'svxui';

    const items = [
        { id: '1', label: 'Design', description: 'UI, brand identity and design systems' },
        { id: '2', label: 'Development', description: 'Frontend, backend and architecture' },
        { id: '3', label: 'Marketing', description: 'Growth, campaigns and analytics' },
        { id: '4', label: 'Research', description: 'User insights and usability testing' },
        { id: '5', label: 'QA', description: 'Testing, quality and bug tracking' },
        { id: '6', label: 'DevOps', description: 'Infrastructure, CI/CD and monitoring' }
    ];
</script>

<Accordion orientation="vertical">
    {#snippet children(accordion)}
        <Flex justify="start" direction="column" gap="3" width="300px" {...accordion.rootAttrs}>
            {#each items as { id, label, description } (id)}
                <Panel variant="clear" outline p="0" radius="none" style="width: 300px;">
                    <!-- Item -->
                    {@const item = accordion.getItem(id)}

                    <Flex justify="start" direction="column" {...item.itemAttrs}>
                        <!-- Heading -->
                        <Flex justify="between" align="center" p="4" {...item.headingAttrs}>
                            <Text weight="bold" disabled={item.disabled}>
                                {label}
                            </Text>
                            <!-- Trigger -->
                            <Button size="1" variant="soft" {...item.triggerAttrs}>
                                {item.expanded ? 'close' : 'open'}
                            </Button>
                        </Flex>

                        <!-- Content -->
                        {#if item.expanded}
                            <div
                                {...item.contentAttrs}
                                style:padding="var(--space-4)"
                                transition:slide={{ duration: 150 }}
                            >
                                <Text>{description}</Text>
                            </div>
                        {/if}
                    </Flex>
                </Panel>
            {/each}
        </Flex>
    {/snippet}
</Accordion>
