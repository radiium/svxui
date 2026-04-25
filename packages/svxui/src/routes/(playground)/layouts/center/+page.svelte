<script lang="ts">
    import { Panel, Text } from '$lib/index.js';
    import Box from '$lib/components/box/components/box.svelte';
    import { Center } from '$lib/components/center/index.js';
    import type { CenterProps } from '$lib/components/center/types.js';
    import { Flex } from '$lib/components/flex/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    const props: CenterProps = $state({
        maxWidth: '300px',
        gutters: '0',
        intrinsic: false
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

<h1>layout/center</h1>
<Text muted size="2">Horizontal centering by max-width + margin auto.</Text>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="intrinsic" bind:checked={props.intrinsic} />
        <ControlSelect
            label="gutters"
            bind:value={props.gutters}
            options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
        />
    {/snippet}

    <Box width="100%">
        <Center {...props}>
            <Panel variant="soft" p="9">
                <Flex align="center" justify="center">Centered</Flex>
            </Panel>
        </Center>
    </Box>
</Playground>

<div><pre>{json}</pre></div>
