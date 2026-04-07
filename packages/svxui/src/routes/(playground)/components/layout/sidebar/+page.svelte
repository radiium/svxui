<script lang="ts">
    import { Sidebar } from '$lib/components/layout/index.js';
    import { Panel, Text } from '$lib/index.js';
    import ControlSelect from '../../../controls/ControlSelect.svelte';
    import Playground from '../../../controls/Playground.svelte';

    // Sidebar controls
    let sidebarSide = $state<'left' | 'right'>('left');
    let sidebarWidth = $state('200px');
</script>

<h1>layout/sidebar</h1>
<Text muted size="2">
    Colonne fixe + contenu fluide. Repasse en stack quand trop étroit.<br />
    Utilise les named snippets Svelte 5.
</Text>

<Playground>
    {#snippet controls()}
        <ControlSelect label="side" bind:value={sidebarSide} options={['left', 'right']} />
        <ControlSelect label="sideWidth" bind:value={sidebarWidth} options={['150px', '200px', '260px']} />
    {/snippet}

    <div class="width-100p">
        <Sidebar side={sidebarSide} sideWidth={sidebarWidth} contentMin="50%" gap="3">
            {#snippet sidebar()}
                <Panel variant="soft" size="3" class="min-height-80 height-100p">
                    <strong>Sidebar</strong><br />
                    <Text muted size="2">{sidebarWidth}</Text>
                </Panel>
            {/snippet}
            {#snippet content()}
                <Panel variant="clear" outline size="3" class="min-height-80">
                    <p>Contenu fluide. Passe en stack si trop étroit (contentMin=50%).</p>
                </Panel>
            {/snippet}
        </Sidebar>
    </div>
</Playground>

<style>
    :global(.width-100p) {
        width: 100%;
    }
    :global(.height-100p) {
        height: 100%;
    }
    :global(.min-height-80) {
        min-height: 60px;
    }
</style>
