<script lang="ts">
    import { Flex, Panel, Switcher, Text } from '$lib/index.js';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    // Switcher controls
    let threshold = $state('480px');

    let json = $derived(
        JSON.stringify(
            {
                props: { threshold }
            },
            null,
            2
        )
    );
</script>

<h1>layout/switcher</h1>
<Text muted size="2">
    row → column automatically when the container is narrower than the threshold.<br />
    Zero media query, zero JS — pure mathematical CSS.
</Text>

<Playground>
    {#snippet controls()}
        <ControlSelect label="threshold" bind:value={threshold} options={['320px', '480px', '640px']} />
    {/snippet}

    <div class="width-100p">
        <Switcher {threshold} gap="3">
            {#each ['Panel A', 'Panel B', 'Panel C'] as label (label)}
                <Panel variant="soft" p="3">
                    <Flex align="center" justify="center">{label}</Flex>
                </Panel>
            {/each}
        </Switcher>
    </div>
</Playground>

<div><pre>{json}</pre></div>
