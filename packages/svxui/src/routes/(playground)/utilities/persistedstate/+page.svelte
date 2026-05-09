<script>
    import { Flex, Input, PersistedState } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import Playground from '../../controls/Playground.svelte';

    const persisted = new PersistedState('test-key', 'hello world');
    let connected = $state(persisted.connected);
</script>

<h1>PersistedState</h1>

<Playground>
    <Flex justify="start" direction="column" align="start">
        <ControlCheckbox
            label="toogle connect"
            checked={persisted.connected}
            onCheckedChange={(checked) => {
                if (checked) {
                    persisted.connect();
                } else {
                    persisted.disconnect();
                }
                connected = persisted.connected;
            }}
        />
    </Flex>

    <Input bind:value={persisted.current} />
</Playground>
