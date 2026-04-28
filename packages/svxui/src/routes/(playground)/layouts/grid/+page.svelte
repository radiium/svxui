<script lang="ts">
    import { Flex, Grid, Panel, Text } from '$lib/index.js';
    import Playground from '../../controls/Playground.svelte';
</script>

<h1>layout/grid</h1>
<Text muted size="2">
    cols="3" → repeat(3,1fr) · autoFill/autoFit for intrinsic grids · areas for named layouts
</Text>

<Playground>
    <Flex justify="start" direction="column" gap="7" class="w-full">
        <Flex justify="start" direction="column" gap="2" class="dashed w-full p-2">
            <code>cols="3" gap="3"</code>
            <Grid cols="3" gap="3">
                {#each [1, 2, 3, 4, 5, 6] as n (n)}
                    <Panel variant="soft" p="2">
                        <Flex align="center" justify="center">{n}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" class="dashed w-full p-2">
            <code>cols="4" rowGap="1" colGap="4" — asymmetric gaps</code>
            <Grid cols="4" rowGap="1" colGap="4">
                {#each [1, 2, 3, 4, 5, 6, 7, 8] as n (n)}
                    <Panel variant="soft" p="2">
                        <Flex align="center" justify="center">{n}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" class="dashed w-full p-2">
            <code>autoFill="140px" gap="3" — responsive without media query</code>
            <Grid autoFill="140px" gap="3">
                {#each ['A', 'B', 'C', 'D', 'E'] as l (l)}
                    <Panel variant="soft" p="2">
                        <Flex align="center" justify="center">{l}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" class="dashed w-full p-2">
            <code>autoFit="140px" gap="3" — The empty columns are collapsing.</code>
            <Grid autoFit="140px" gap="3">
                {#each ['X', 'Y'] as l (l)}
                    <Panel variant="soft" p="2">
                        <Flex align="center" justify="center">{l}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" class="dashed w-full p-2">
            <code>areas — named layout header / sidebar / main / footer</code>
            <Grid
                cols="200px 1fr"
                rows="auto 1fr auto"
                areas="'header header' 'sidebar main' 'footer footer'"
                gap="2"
            >
                <Panel p="2" variant="soft" fullWidth fullHeight style="grid-area: header;">Header</Panel>
                <Panel p="2" variant="soft" fullWidth fullHeight style="grid-area: sidebar;">Sidebar</Panel>
                <Panel
                    p="2"
                    variant="clear"
                    outline
                    fullWidth
                    fullHeight
                    style="grid-area: main; min-height: 60px;">Main</Panel
                >
                <Panel p="2" variant="soft" fullWidth fullHeight style="grid-area: footer;">Footer</Panel>
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" class="dashed w-full p-2">
            <code>autoRows="120px" — uniform height across all implicit lines</code>
            <Grid cols="3" gap="3" autoRows="120px">
                {#each ['Short', 'Much longer content that overflows', 'Medium', 'Short', 'Fairly long too', 'Ok'] as item, i (i)}
                    <Panel variant="soft" p="2">{item}</Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" class="dashed w-full p-2">
            <code>flow="dense" — fills the gaps with items of varying sizes</code>
            <Grid cols="3" gap="2" flow="dense" autoRows="60px" class="grid-dense-demo">
                <Panel variant="soft" p="2" fullHeight class="col-span-2">Large (span 2)</Panel>
                <Panel variant="soft" p="2" fullHeight>1</Panel>
                <Panel variant="soft" p="2" fullHeight>2</Panel>
                <Panel variant="soft" p="2" fullHeight class="col-span-2">Large (span 2)</Panel>
                <Panel variant="soft" p="2" fullHeight>3</Panel>
                <Panel variant="soft" p="2" fullHeight>4</Panel>
                <Panel variant="soft" p="2" fullHeight>5</Panel>
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" class="dashed w-full p-2">
            <code>align="center" — content vertically centered in each cell</code>
            <Grid cols="3" gap="3" autoRows="100px" align="center">
                {#each ['Vertically centered', 'Me too', '✓'] as item (item)}
                    <Panel variant="soft" p="2">
                        <Flex justify="center">{item}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex justify="start" direction="column" gap="2" class="dashed w-full p-2">
            <code>Nested grids — props isolation</code>
            <Grid cols="2" gap="3">
                {#each [1, 2] as n (n)}
                    <Panel variant="soft" p="2">
                        <Grid cols="3" gap="1">
                            {#each [1, 2, 3] as m (m)}
                                <Panel variant="surface" p="1">
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
