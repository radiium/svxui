<script lang="ts">
    import { cc, Center, type CenterProps, Flex, Panel, Text } from '$lib/index.js';
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

    <Center {...props} class={cc({ w: '100' })}>
        <Panel variant="soft" p="9">
            <Flex align="center" justify="center">Centered</Flex>
        </Panel>
    </Center>
</Playground>

<div><pre>{json}</pre></div>
