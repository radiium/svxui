<script lang="ts">
    import { Panel, Text } from '$lib/index.js';
    import Box from '$lib/layouts/box/components/box.svelte';
    import { Flex } from '$lib/layouts/flex/index.js';
    import { Grid } from '$lib/layouts/grid/index.js';
    import Playground from '../../controls/Playground.svelte';
</script>

<h1>layout/grid</h1>
<Text muted size="2">
    cols="3" → repeat(3,1fr) · autoFill/autoFit for intrinsic grids · areas for named layouts
</Text>

<Playground>
    <Flex justify="start" direction="column" gap="7" width="100%">
        <Flex justify="start" direction="column" gap="2" width="100%" p="2" class="dashed">
            <code>cols="3" gap="3"</code>
            <Grid cols="3" gap="3">
                {#each [1, 2, 3, 4, 5, 6] as n (n)}
                    <Panel variant="soft" size="2">
                        <Flex align="center" justify="center">{n}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" width="100%" p="2" class="dashed">
            <code>cols="4" rowGap="1" colGap="4" — asymmetric gaps</code>
            <Grid cols="4" rowGap="1" colGap="4">
                {#each [1, 2, 3, 4, 5, 6, 7, 8] as n (n)}
                    <Panel variant="soft" size="2">
                        <Flex align="center" justify="center">{n}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" width="100%" p="2" class="dashed">
            <code>autoFill="140px" gap="3" — responsive without media query</code>
            <Grid autoFill="140px" gap="3">
                {#each ['A', 'B', 'C', 'D', 'E'] as l (l)}
                    <Panel variant="soft" size="2">
                        <Flex align="center" justify="center">{l}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" width="100%" p="2" class="dashed">
            <code>autoFit="140px" gap="3" — The empty columns are collapsing.</code>
            <Grid autoFit="140px" gap="3">
                {#each ['X', 'Y'] as l (l)}
                    <Panel variant="soft" size="2">
                        <Flex align="center" justify="center">{l}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" width="100%" p="2" class="dashed">
            <code>areas — named layout header / sidebar / main / footer</code>
            <Grid
                cols="200px 1fr"
                rows="auto 1fr auto"
                areas="'header header' 'sidebar main' 'footer footer'"
                gap="2"
            >
                <Box gridArea="header">
                    <Panel size="2" variant="soft" fullWidth fullHeight>Header</Panel>
                </Box>
                <Box gridArea="sidebar">
                    <Panel size="2" variant="soft" fullWidth fullHeight>Sidebar</Panel>
                </Box>
                <Box gridArea="main" minHeight="60px">
                    <Panel size="2" variant="clear" outline fullWidth fullHeight>Main</Panel>
                </Box>
                <Box gridArea="footer">
                    <Panel size="2" variant="soft" fullWidth fullHeight>Footer</Panel>
                </Box>
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" width="100%" p="2" class="dashed">
            <code>autoRows="120px" — uniform height across all implicit lines</code>
            <Grid cols="3" gap="3" autoRows="120px">
                {#each ['Short', 'Much longer content that overflows', 'Medium', 'Short', 'Fairly long too', 'Ok'] as item, i (i)}
                    <Panel variant="soft" size="2">{item}</Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" width="100%" p="2" class="dashed">
            <code>flow="dense" — fills the gaps with items of varying sizes</code>
            <Grid cols="3" gap="2" flow="dense" autoRows="60px" class="grid-dense-demo">
                <Box gridColumn="span 2">
                    <Panel variant="soft" size="2" fullHeight>Large (span 2)</Panel>
                </Box>
                <Box>
                    <Panel variant="soft" size="2" fullHeight>1</Panel>
                </Box>
                <Box>
                    <Panel variant="soft" size="2" fullHeight>2</Panel>
                </Box>
                <Box gridColumn="span 2">
                    <Panel variant="soft" size="2" fullHeight>Large (span 2)</Panel>
                </Box>
                <Box>
                    <Panel variant="soft" size="2" fullHeight>3</Panel>
                </Box>
                <Box>
                    <Panel variant="soft" size="2" fullHeight>4</Panel>
                </Box>
                <Box>
                    <Panel variant="soft" size="2" fullHeight>5</Panel>
                </Box>
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" width="100%" p="2" class="dashed">
            <code>align="center" — content vertically centered in each cell</code>
            <Grid cols="3" gap="3" autoRows="100px" align="center">
                {#each ['Vertically centered', 'Me too', '✓'] as item (item)}
                    <Panel variant="soft" size="2">
                        <Flex justify="center">{item}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" width="100%" p="2" class="dashed">
            <code>Nested grids — props isolation</code>
            <Grid cols="2" gap="3">
                {#each [1, 2] as n (n)}
                    <Panel variant="soft" size="2">
                        <Grid cols="3" gap="1">
                            {#each [1, 2, 3] as m (m)}
                                <Panel variant="surface" size="1">
                                    <Flex align="center" justify="center">{n}.{m}</Flex>
                                </Panel>
                            {/each}
                        </Grid>
                    </Panel>
                {/each}
            </Grid>
        </Flex>
    </Flex>
</Playground>

<style>
    code {
        font-size: 0.8em;
        color: var(--gray-11);
    }
    :global(.dashed) {
        outline: 1px dashed var(--gray-6);
        border-radius: 4px;
    }
</style>
