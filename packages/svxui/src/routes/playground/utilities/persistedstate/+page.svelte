<script>
    import { Flexbox, Input, PersistedState } from '$lib/index.js';
    import ControlButton from '../../controls/ControlButton.svelte';
    import Playground from '../../controls/Playground.svelte';

    const persisted = new PersistedState('test-key', 'hello world');
    let connected = $state(persisted.connected);
</script>

<h1>PersistedState</h1>

<Playground>
    <Flexbox direction="column" align="start">
        <ControlButton
            onclick={() => {
                if (persisted.connected) {
                    persisted.disconnect();
                } else {
                    persisted.connect();
                }
                connected = persisted.connected;
            }}
        >
            toogle connect ({connected})
        </ControlButton>
    </Flexbox>

    <Input bind:value={persisted.current} />
</Playground>
