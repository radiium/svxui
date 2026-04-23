<script lang="ts">
    import { Checkbox, Flex, Panel, Separator, Text } from 'svxui';

    // const items = ['Design', 'Development', 'Marketing', 'Research', 'QA', 'DevOps'];

    const items = [
        { id: '1', label: 'Design', description: 'UI, brand identity and design systems' },
        { id: '2', label: 'Development', description: 'Frontend, backend and architecture' },
        { id: '3', label: 'Marketing', description: 'Growth, campaigns and analytics' },
        { id: '4', label: 'Research', description: 'User insights and usability testing' },
        { id: '5', label: 'QA', description: 'Testing, quality and bug tracking' },
        { id: '6', label: 'DevOps', description: 'Infrastructure, CI/CD and monitoring' }
    ];

    let group = $state([]);
</script>

<Panel size="0" variant="clear" outline>
    <Flex justify="start" direction="column" style="width: 300px;">
        {#each items as { id, label, description }, i (id)}
            <Flex justify="start" as="label" align="center" gap="3" width="100%" py="2" px="3">
                <Checkbox name="option" bind:group value={id} />
                <Flex direction="column" gap="1">
                    <Text>{label}</Text>
                    <Text size="2" muted>{description}</Text>
                </Flex>
            </Flex>

            {#if i < items.length - 1}
                <Separator size="4" />
            {/if}
        {/each}
    </Flex>
</Panel>
