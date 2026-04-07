<script lang="ts">
    import { Flex, Switcher } from '$lib/components/layout/index.js';
    import { Panel, Text } from '$lib/index.js';
    import ControlSelect from '../../../controls/ControlSelect.svelte';
    import Playground from '../../../controls/Playground.svelte';

    // Switcher controls
    let switcherThreshold = $state('480px');
</script>

<h1>layout/switcher</h1>
<Text muted size="2">
    row → column automatiquement quand le conteneur est plus étroit que threshold.<br />
    Zéro media query, zéro JS — CSS mathématique pur.
</Text>

<Playground>
    {#snippet controls()}
        <ControlSelect
            label="threshold"
            bind:value={switcherThreshold}
            options={['320px', '480px', '640px']}
        />
    {/snippet}

    <div class="width-100p">
        <Switcher threshold={switcherThreshold} gap="3">
            {#each ['Panneau A', 'Panneau B', 'Panneau C'] as label (label)}
                <Panel variant="soft" size="3">
                    <Flex align="center" justify="center">{label}</Flex>
                </Panel>
            {/each}
        </Switcher>
    </div>
</Playground>
