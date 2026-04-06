<script lang="ts">
    import {
        Box,
        Center,
        Cluster,
        Flex,
        Grid,
        Sidebar,
        Stack,
        Switcher
    } from '$lib/components/layout/index.js';
    import { Flexbox, Panel } from '$lib/index.js';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    // Switcher controls
    let switcherThreshold = $state('480px');

    // Sidebar controls
    let sidebarSide = $state<'left' | 'right'>('left');
    let sidebarWidth = $state('200px');
</script>

<h1>Primitives & Patterns</h1>

<Flexbox direction="column" gap="5">
    <!-- ── Box ─────────────────────────────────────────────────────────────── -->
    <section>
        <h2>Box</h2>
        <p class="hint">Box model via inline styles (p, m, w, h, display…)</p>
        <Panel variant="clear" outline size="3">
            <Flexbox gap="3" wrap="wrap" align="center">
                <Box p="4" class="box-demo">p="4"</Box>
                <Box px="5" py="2" class="box-demo">px="5" py="2"</Box>
                <Box p="3" m="2" width="80px" height="40px" class="box-demo">w×h</Box>
                <Box display="inline-block" p="3" class="box-demo">display flex</Box>
            </Flexbox>
        </Panel>
    </section>

    <!-- ── Flex ────────────────────────────────────────────────────────────── -->
    <section>
        <h2>Flex</h2>
        <p class="hint">Conteneur flex avec direction, gap, justify, align</p>
        <Panel variant="clear" outline size="3">
            <Flexbox direction="column" gap="3">
                <div>
                    <code>direction="row" justify="between"</code>
                    <Flex
                        direction="row"
                        justify="between"
                        gap="2"
                        style="margin-top: var(--space-2); outline: 1px dashed var(--gray-6); padding: 8px; border-radius: 4px"
                    >
                        {#each ['Item 1', 'Item 2', 'Item 3'] as item (item)}
                            <Panel variant="soft" size="2">{item}</Panel>
                        {/each}
                    </Flex>
                </div>
                <div>
                    <code>direction="column" align="center"</code>
                    <Flex
                        direction="column"
                        align="center"
                        gap="2"
                        style="margin-top: var(--space-2); outline: 1px dashed var(--gray-6); padding: 8px; border-radius: 4px"
                    >
                        {#each ['Alpha', 'Beta'] as item (item)}
                            <Panel variant="soft" size="2">{item}</Panel>
                        {/each}
                    </Flex>
                </div>
            </Flexbox>
        </Panel>
    </section>

    <!-- ── Grid ────────────────────────────────────────────────────────────── -->
    <section>
        <h2>Grid</h2>
        <p class="hint">cols="3" → repeat(3,1fr) · autoFill pour grille intrinsèque</p>
        <Panel variant="clear" outline size="3">
            <Flexbox direction="column" gap="3">
                <div>
                    <code>cols="3" gap="3"</code>
                    <Grid cols="3" gap="3" style="margin-top: var(--space-2)">
                        {#each [1, 2, 3, 4, 5, 6] as n (n)}
                            <Panel variant="soft" size="2" style="text-align:center">{n}</Panel>
                        {/each}
                    </Grid>
                </div>
                <div>
                    <code>autoFill="140px" gap="3" — responsive sans media query</code>
                    <Grid autoFill="140px" gap="3" style="margin-top: var(--space-2)">
                        {#each ['A', 'B', 'C', 'D', 'E'] as l (l)}
                            <Panel variant="soft" size="2" style="text-align:center">{l}</Panel>
                        {/each}
                    </Grid>
                </div>
            </Flexbox>
        </Panel>
    </section>

    <!-- ── Stack ───────────────────────────────────────────────────────────── -->
    <section>
        <h2>Stack</h2>
        <p class="hint">flex column + gap. Idéal pour les listes verticales.</p>
        <Panel variant="clear" outline size="3">
            <Stack gap="3" style="max-width: 300px">
                {#each ['Premier élément', 'Deuxième élément', 'Troisième élément'] as item (item)}
                    <Panel variant="soft" size="2">{item}</Panel>
                {/each}
            </Stack>
        </Panel>
    </section>

    <!-- ── Cluster ─────────────────────────────────────────────────────────── -->
    <section>
        <h2>Cluster</h2>
        <p class="hint">flex wrap — tags, badges, boutons qui s'enroulent naturellement.</p>
        <Panel variant="clear" outline size="3">
            <Cluster gap="2">
                {#each ['Svelte', 'TypeScript', 'CSS', 'Intrinsic', 'Layout', 'No media query', 'Responsive', 'Design tokens', 'Box model'] as tag (tag)}
                    <Panel variant="soft" size="2" style="padding: 2px 8px; border-radius: 999px">{tag}</Panel
                    >
                {/each}
            </Cluster>
        </Panel>
    </section>

    <!-- ── Center ──────────────────────────────────────────────────────────── -->
    <section>
        <h2>Center</h2>
        <p class="hint">Centrage horizontal par max-width + margin auto.</p>
        <Panel variant="clear" outline size="3">
            <Center maxWidth="400px">
                <Panel variant="soft" size="3" style="text-align: center">Centré à max 400px</Panel>
            </Center>
        </Panel>
    </section>

    <!-- ── Switcher ────────────────────────────────────────────────────────── -->
    <section>
        <h2>Switcher</h2>
        <p class="hint">
            row → column automatiquement quand le conteneur est plus étroit que threshold.<br />
            Zéro media query, zéro JS — CSS mathématique pur.
        </p>
        <Playground>
            {#snippet controls()}
                <ControlSelect
                    label="threshold"
                    bind:value={switcherThreshold}
                    options={['320px', '480px', '640px']}
                />
            {/snippet}

            <div style="width: 100%">
                <Switcher threshold={switcherThreshold} gap="3">
                    {#each ['Panneau A', 'Panneau B', 'Panneau C'] as label (label)}
                        <Panel
                            variant="soft"
                            size="3"
                            style="text-align: center; min-height: 60px; display:flex; align-items:center; justify-content:center"
                        >
                            {label}
                        </Panel>
                    {/each}
                </Switcher>
            </div>
        </Playground>
    </section>

    <!-- ── Sidebar ─────────────────────────────────────────────────────────── -->
    <section>
        <h2>Sidebar</h2>
        <p class="hint">
            Colonne fixe + contenu fluide. Repasse en stack quand trop étroit.<br />
            Utilise les named snippets Svelte 5.
        </p>
        <Playground>
            {#snippet controls()}
                <ControlSelect label="side" bind:value={sidebarSide} options={['left', 'right']} />
                <ControlSelect
                    label="sideWidth"
                    bind:value={sidebarWidth}
                    options={['150px', '200px', '260px']}
                />
            {/snippet}

            <div style="width: 100%">
                <Sidebar side={sidebarSide} sideWidth={sidebarWidth} contentMin="50%" gap="3">
                    {#snippet sidebar()}
                        <Panel variant="soft" size="3" style="height: 100%; min-height: 80px">
                            <strong>Sidebar</strong><br />
                            <span style="font-size: 0.8em; color: var(--gray-9)">{sidebarWidth}</span>
                        </Panel>
                    {/snippet}
                    {#snippet content()}
                        <Panel variant="clear" outline size="3" style="min-height: 80px">
                            <p>Contenu fluide. Passe en stack si trop étroit (contentMin=50%).</p>
                        </Panel>
                    {/snippet}
                </Sidebar>
            </div>
        </Playground>
    </section>
</Flexbox>

<style>
    h2 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: var(--space-1);
        color: var(--gray-12);
    }

    .hint {
        font-size: 0.85em;
        color: var(--gray-9);
        margin-bottom: var(--space-2);
    }

    section {
        display: flex;
        flex-direction: column;
    }

    code {
        font-size: 0.8em;
        color: var(--gray-11);
    }

    :global(.box-demo) {
        background: var(--green-3);
        border-radius: 4px;
    }
</style>
