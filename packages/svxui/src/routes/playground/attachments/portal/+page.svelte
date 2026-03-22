<script>
    import Badge from '$lib/components/badge/components/badge.svelte';
    import { Flexbox, Panel, portal } from '$lib/index.js';
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

    <Panel variant="soft" size="9" bind:ref={eventTarget}>
        <Flexbox fullWidth direction="column" gap="3">
            <Panel>
                <Flexbox direction="column" align="center" gap="3">
                    Source

                    <Panel variant="clear" outline>Before</Panel>
                    <Badge
                        variant="solid"
                        size="3"
                        {@attach portal({
                            enabled,
                            target
                        })}
                    >
                        content
                    </Badge>
                    <Panel variant="clear" outline>after</Panel>
                </Flexbox>
            </Panel>

            <Flexbox fullWidth gap="3">
                <Panel id="taget1">#taget1</Panel>
                <Panel id="taget2">#taget2</Panel>
            </Flexbox>
        </Flexbox>
    </Panel>
</Playground>

<style>
</style>
