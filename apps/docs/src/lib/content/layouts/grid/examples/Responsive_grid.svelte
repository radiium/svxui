<script lang="ts">
    import { Flex, Grid, Panel, Text } from 'svxui';

    const items = [
        { label: 'Design', count: 12 },
        { label: 'Development', count: 8 },
        { label: 'Marketing', count: 5 },
        { label: 'Research', count: 3 },
        { label: 'QA', count: 7 },
        { label: 'DevOps', count: 4 }
    ];
</script>

<Grid autoFill="160px" gap="3" width="100%">
    {#each items as item (item.label)}
        <Panel outline p="3">
            <Flex direction="column" align="center" gap="1">
                <Text size="2" muted>{item.label}</Text>
                <Text size="7">{item.count}</Text>
            </Flex>
        </Panel>
    {/each}
</Grid>
