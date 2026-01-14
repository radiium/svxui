<script>
    import Text from '$lib/components/text/components/text.svelte';
    import { clickoutside, Flexbox, Panel } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlNumber from '../../controls/ControlNumber.svelte';
    import Playground from '../../controls/Playground.svelte';

    let enabled = $state(false);
    let delay = $state(800);
    let currentState = $state('idle');
    let eventTarget = $state();
</script>

<h1>Clickoutside</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="enabled" bind:checked={enabled} />
        <ControlNumber label="delay" bind:value={delay} />
        <Text>State: {currentState}</Text>
    {/snippet}

    <Panel variant="soft" size="9" bind:ref={eventTarget}>
        <Flexbox align="center" justify="center" gap="3">
            outside
            <Panel
                variant="clear"
                outline
                size="9"
                {@attach clickoutside({
                    enabled,
                    eventTarget,
                    onClickOutside() {
                        currentState = 'click outside';
                    }
                })}
                onclick={() => {
                    if (enabled) {
                        currentState = 'click inside';
                    }
                }}
            >
                inside
            </Panel>
        </Flexbox>
    </Panel>
</Playground>
