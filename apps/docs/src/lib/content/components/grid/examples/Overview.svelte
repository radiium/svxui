<script lang="ts">
    import { Flex, Grid, Panel, Text } from 'svxui';
</script>

<Flex justify="start" direction="column" gap="5" style="width: 100%;">
    <Flex justify="start" direction="column" gap="2">
        <Text size="2" muted>cols="3" gap="3"</Text>
        <Grid cols="3" gap="3">
            {#each [1, 2, 3, 4, 5, 6] as n (n)}
                <Panel variant="soft" size="2">
                    <Flex align="center" justify="center">{n}</Flex>
                </Panel>
            {/each}
        </Grid>
    </Flex>

    <Flex justify="start" direction="column" gap="2">
        <Text size="2" muted>autoFill="140px" — responsive sans media query</Text>
        <Grid autoFill="140px" gap="3">
            {#each ['A', 'B', 'C', 'D', 'E'] as l (l)}
                <Panel variant="soft" size="2">
                    <Flex align="center" justify="center">{l}</Flex>
                </Panel>
            {/each}
        </Grid>
    </Flex>
</Flex>
