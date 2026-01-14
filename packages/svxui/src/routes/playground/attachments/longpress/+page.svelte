<script>
    import { Button, longpress, Text } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlNumber from '../../controls/ControlNumber.svelte';
    import Playground from '../../controls/Playground.svelte';

    let enabled = $state(false);
    let delay = $state(800);
    let currentState = $state('idle');
</script>

<h1>Longpress</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="enabled" bind:checked={enabled} />
        <ControlNumber label="delay" bind:value={delay} />
        <Text>State: {currentState}</Text>
    {/snippet}

    <Button
        variant={currentState === 'started' ? 'solid' : 'outline'}
        {@attach longpress({
            enabled,
            delay,
            onLongpressStart: () => {
                console.log('onLongpressStart');
                currentState = 'started';
            },
            onLongpressEnd: () => {
                console.log('onLongpressEnd');
                currentState = 'ended';
            }
        })}
    >
        longpress me
    </Button>
</Playground>
