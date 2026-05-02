<script lang="ts">
    import { Box, Flex, Panel, Radio, Text } from 'svxui';

    const items = [
        { id: '1', label: 'Design', description: 'UI, brand identity and design systems' },
        { id: '2', label: 'Development', description: 'Frontend, backend and architecture' },
        { id: '3', label: 'Marketing', description: 'Growth, campaigns and analytics' },
        { id: '4', label: 'Research', description: 'User insights and usability testing' },
        { id: '5', label: 'QA', description: 'Testing, quality and bug tracking' },
        { id: '6', label: 'DevOps', description: 'Infrastructure, CI/CD and monitoring' }
    ];

    let group = $state();
</script>

<Flex justify="start" direction="column" gap="3" width="300px">
    {#each items as { id, label, description } (id)}
        <Panel p="0" variant="clear" outline>
            <Flex justify="start" as="label" align="start" gap="3" width="100%" py="2" px="3">
                <Box pt="1">
                    <Radio name="option" bind:group value={id} />
                </Box>
                <Flex direction="column" gap="1">
                    <Text>{label}</Text>
                    <Text size="2" muted>{description}</Text>
                </Flex>
            </Flex>
        </Panel>
    {/each}
</Flex>
