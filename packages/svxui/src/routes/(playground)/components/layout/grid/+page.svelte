<script lang="ts">
    import { Flex, Grid } from '$lib/components/layout/index.js';
    import { Panel, Text } from '$lib/index.js';
    import Playground from '../../../controls/Playground.svelte';
</script>

<h1>layout/grid</h1>
<Text muted size="2">
    cols="3" → repeat(3,1fr) · autoFill/autoFit pour grilles intrinsèques · areas pour layouts nommés
</Text>

<Playground>
    <Flex direction="column" gap="7">
        <Flex direction="column" gap="2">
            <code>cols="3" gap="3"</code>
            <Grid cols="3" gap="3">
                {#each [1, 2, 3, 4, 5, 6] as n (n)}
                    <Panel variant="soft" size="2">
                        <Flex align="center" justify="center">{n}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex direction="column" gap="2">
            <code>cols="4" rowGap="1" colGap="4" — gaps asymétriques</code>
            <Grid cols="4" rowGap="1" colGap="4">
                {#each [1, 2, 3, 4, 5, 6, 7, 8] as n (n)}
                    <Panel variant="soft" size="2">
                        <Flex align="center" justify="center">{n}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex direction="column" gap="2">
            <code>autoFill="140px" gap="3" — responsive sans media query</code>
            <Grid autoFill="140px" gap="3">
                {#each ['A', 'B', 'C', 'D', 'E'] as l (l)}
                    <Panel variant="soft" size="2">
                        <Flex align="center" justify="center">{l}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex direction="column" gap="2">
            <code>autoFit="140px" gap="3" — les colonnes vides s'effondrent</code>
            <Grid autoFit="140px" gap="3">
                {#each ['X', 'Y'] as l (l)}
                    <Panel variant="soft" size="2">
                        <Flex align="center" justify="center">{l}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex direction="column" gap="2">
            <code>areas — layout nommé header / sidebar / main / footer</code>
            <Grid
                cols="200px 1fr"
                rows="auto 1fr auto"
                areas="'header header' 'sidebar main' 'footer footer'"
                gap="2"
                class="grid-areas-demo"
            >
                <Panel size="2" variant="soft" class="area-header">Header</Panel>
                <Panel size="2" variant="soft" class="area-sidebar">Sidebar</Panel>
                <Panel size="2" variant="clear" class="area-main" outline>Main</Panel>
                <Panel size="2" variant="soft" class="area-footer">Footer</Panel>
            </Grid>
        </Flex>

        <Flex direction="column" gap="2">
            <code>autoRows="120px" — hauteur uniforme sur toutes les lignes implicites</code>
            <Grid cols="3" gap="3" autoRows="120px">
                {#each ['Court', 'Un contenu beaucoup plus long qui dépasse', 'Medium', 'Court', 'Assez long aussi', 'Ok'] as item, i (i)}
                    <Panel variant="soft" size="2">{item}</Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex direction="column" gap="2">
            <code>flow="dense" — comble les trous avec des items de tailles variables</code>
            <Grid cols="3" gap="2" flow="dense" autoRows="60px" class="grid-dense-demo">
                <Panel variant="soft" size="2" class="span-2">Large (span 2)</Panel>
                <Panel variant="soft" size="2">1</Panel>
                <Panel variant="soft" size="2">2</Panel>
                <Panel variant="soft" size="2" class="span-2">Large (span 2)</Panel>
                <Panel variant="soft" size="2">3</Panel>
                <Panel variant="soft" size="2">4</Panel>
                <Panel variant="soft" size="2">5</Panel>
            </Grid>
        </Flex>

        <Flex direction="column" gap="2">
            <code>align="center" — contenu centré verticalement dans chaque cellule</code>
            <Grid cols="3" gap="3" autoRows="100px" align="center">
                {#each ['Top aligné au centre', 'Moi aussi', '✓'] as item (item)}
                    <Panel variant="soft" size="2">
                        <Flex justify="center">{item}</Flex>
                    </Panel>
                {/each}
            </Grid>
        </Flex>

        <Flex direction="column" gap="2">
            <code>Grid imbriqués — isolation des props</code>
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
    :global(.area-header) {
        grid-area: header;
    }
    :global(.area-sidebar) {
        grid-area: sidebar;
    }
    :global(.area-main) {
        grid-area: main;
        min-height: 60px;
    }
    :global(.area-footer) {
        grid-area: footer;
    }
    :global(.span-2) {
        grid-column: span 2;
    }
</style>
