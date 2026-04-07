<script lang="ts">
    import { Sidebar, type SidebarProps } from '$lib/components/layout/index.js';
    import { Panel, Text } from '$lib/index.js';
    import ControlSelect from '../../../controls/ControlSelect.svelte';
    import Playground from '../../../controls/Playground.svelte';

    const props: SidebarProps = $state({
        side: 'left',
        sideWidth: '200px',
        contentMin: '50%',
        gap: '2'
    });

    let json = $derived(
        JSON.stringify(
            {
                props
            },
            null,
            2
        )
    );
</script>

<h1>layout/sidebar</h1>
<Text muted size="2">Fixed column + fluid content. Reverts to stacking when too narrow.</Text>

<Playground>
    {#snippet controls()}
        <ControlSelect label="side" bind:value={props.side} options={['left', 'right']} />
        <ControlSelect label="sideWidth" bind:value={props.sideWidth} options={['150px', '200px', '260px']} />
        <ControlSelect label="contentMin" bind:value={props.contentMin} options={['25%', '50%', '75%']} />
        <ControlSelect
            label="gap"
            bind:value={props.gap}
            options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
        />
    {/snippet}

    <div class="width-100p">
        <Sidebar {...props}>
            {#snippet sidebar()}
                <Panel variant="soft" size="3" class="min-height-80 height-100p">
                    <strong>Sidebar</strong><br />
                    <Text muted size="2">{props.sideWidth}</Text>
                </Panel>
            {/snippet}
            <Panel variant="clear" outline size="3" class="min-height-80">
                <p>Smooth content. Switches to stacking if too narrow (contentMin={props.contentMin}).</p>
            </Panel>
        </Sidebar>
    </div>
</Playground>

<div><pre>{json}</pre></div>

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
