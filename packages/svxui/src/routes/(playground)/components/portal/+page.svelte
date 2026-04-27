<script>
    import Badge from '$lib/components/badge/components/badge.svelte';
    import { cc, Flex, Panel, Portal } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    let enabled = $state(false);
    let target = $state('#taget1');
    let eventTarget = $state();
</script>

<h1>Portal</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="enabled" bind:checked={enabled} />
        <ControlSelect label="target" bind:value={target} options={['#taget1', '#taget2']} />
    {/snippet}

    <Panel variant="soft" p="9" bind:ref={eventTarget}>
        <Flex justify="start" direction="column" gap="3" class={cc({ w: '100' })}>
            <Panel>
                <Flex justify="start" direction="column" align="center" gap="3">
                    Source
                    <Panel variant="clear" outline>Before</Panel>

                    <Portal {enabled} {target}>
                        <Badge variant="solid" size="3">content</Badge>
                    </Portal>
                    <Panel variant="clear" outline>after</Panel>
                </Flex>
            </Panel>

            <Flex justify="start" gap="3" class={cc({ w: '100' })}>
                <Panel id="taget1">#taget1</Panel>
                <Panel id="taget2">#taget2</Panel>
            </Flex>
        </Flex>
    </Panel>
</Playground>

<style>
</style>
