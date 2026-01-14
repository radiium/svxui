<script>
    import { Flexbox, Panel, portal } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import Playground from '../../controls/Playground.svelte';

    let enabled = $state(false);
    let eventTarget = $state();
</script>

<h1>Portal</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="enabled" bind:checked={enabled} />
    {/snippet}

    <Panel variant="soft" size="9" bind:ref={eventTarget}>
        <Flexbox align="center" justify="center" gap="3">
            <Panel variant="clear" outline size="9">
                origin
                <Panel
                    class="mt-3"
                    color="blue"
                    {@attach portal({
                        enabled,
                        target: '[data-portal-target]'
                    })}
                >
                    content
                </Panel>
            </Panel>

            <Panel variant="clear" outline size="9" data-portal-target>target</Panel>
        </Flexbox>
    </Panel>
</Playground>
