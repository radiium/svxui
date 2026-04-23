<script lang="ts">
    import { Flex, Grid, Panel, Sidebar, Switcher, Text } from 'svxui';
</script>

<Flex justify="start" direction="column" gap="6" style="width: 100%;">
    <Flex justify="start" direction="column" gap="2">
        <Text size="2" muted>Grid — autoFill responsive</Text>
        <Grid autoFill="120px" gap="2">
            {#each ['A', 'B', 'C', 'D', 'E'] as item (item)}
                <Panel outline size="2">
                    <Flex align="center" justify="center">{item}</Flex>
                </Panel>
            {/each}
        </Grid>
    </Flex>

    <Flex justify="start" direction="column" gap="2">
        <Text size="2" muted>Switcher — row → column below threshold</Text>
        <Switcher threshold="480px" gap="2">
            {#each ['Panel A', 'Panel B', 'Panel C'] as label (label)}
                <Panel outline size="2">
                    <Flex align="center" justify="center">{label}</Flex>
                </Panel>
            {/each}
        </Switcher>
    </Flex>

    <Flex justify="start" direction="column" gap="2">
        <Text size="2" muted>Sidebar — fixed side + fluid content</Text>
        <Sidebar sideWidth="140px" contentMin="55%" gap="3">
            {#snippet sidebar()}
                <Panel outline size="3" fullHeight>
                    <Text size="2">Sidebar</Text>
                </Panel>
            {/snippet}
            <Panel variant="clear" outline size="3" fullHeight>
                <Text size="2">Content</Text>
            </Panel>
        </Sidebar>
    </Flex>
</Flex>
