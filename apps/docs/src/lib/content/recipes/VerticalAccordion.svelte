<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Accordion, Flex, Panel, Separator, Text } from 'svxui';
    import PlusIcon from './PlusIcon.svelte';

    const items = [
        { id: '1', label: 'Design', description: 'UI, brand identity and design systems' },
        { id: '2', label: 'Development', description: 'Frontend, backend and architecture' },
        { id: '3', label: 'Marketing', description: 'Growth, campaigns and analytics' },
        { id: '4', label: 'Research', description: 'User insights and usability testing' },
        { id: '5', label: 'QA', description: 'Testing, quality and bug tracking' },
        { id: '6', label: 'DevOps', description: 'Infrastructure, CI/CD and monitoring' }
    ];
</script>

<div style:width="300px">
    <Panel variant="clear" outline p="0">
        <Accordion orientation="vertical">
            {#snippet children(accordion)}
                <Flex justify="start" direction="column" {...accordion.rootAttrs}>
                    {#each items as { id, label, description }, i (id)}
                        <!-- Item -->
                        {@const item = accordion.getItem(id)}

                        <Flex justify="start" direction="column" {...item.itemAttrs}>
                            <!-- Heading -->

                            <!-- Trigger -->
                            <Panel variant="soft" p="0" as="button" {...item.triggerAttrs}>
                                <!-- Heading -->
                                <Flex justify="between" align="center" p="4" {...item.headingAttrs}>
                                    <Text weight="bold" disabled={item.disabled}>
                                        {label}
                                    </Text>

                                    <PlusIcon transform="rotate({item.expanded ? '45' : '0'})" />
                                </Flex>
                            </Panel>

                            <!-- Content -->
                            {#if item.expanded}
                                <div transition:slide={{ duration: 150 }} {...item.contentAttrs}>
                                    <Panel p="4" variant="solid" radius="none">
                                        <Text>{description}</Text>
                                    </Panel>
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
</div>
