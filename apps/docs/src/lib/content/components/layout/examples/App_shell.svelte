<script lang="ts">
    import { Badge, Box, Cluster, Grid, Panel, Separator, Sidebar, Stack, Text } from 'svxui';

    const navItems = ['Dashboard', 'Projects', 'Team', 'Settings'];
    const cards = ['Report Q1', 'Active tasks', 'Team members'];
</script>

<Sidebar sideWidth="160px" contentMin="60%" gap="4" style="width: 100%; min-height: 280px;">
    {#snippet sidebar()}
        <Panel variant="soft" outline size="3" style="height: 100%;">
            <Stack gap="3">
                <Text size="5">App</Text>
                <Stack gap="1">
                    {#each navItems as item (item)}
                        <Text muted size="3">{item}</Text>
                    {/each}
                </Stack>
            </Stack>
        </Panel>
    {/snippet}

    <Stack gap="4">
        <Cluster justify="between" align="center">
            <Text size="6">Dashboard</Text>
            <Badge variant="soft" size="2">v2.0</Badge>
        </Cluster>

        <Separator size="4" />

        <Grid autoFill="140px" gap="3">
            {#each cards as card (card)}
                <Panel variant="clear" outline size="3">
                    <Text size="3">{card}</Text>
                </Panel>
            {/each}
        </Grid>
    </Stack>
</Sidebar>
