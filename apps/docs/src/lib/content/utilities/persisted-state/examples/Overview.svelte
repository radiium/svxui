<script lang="ts">
    import { Button, Checkbox, Flex, PersistedState, Text } from 'svxui';

    const persisted = new PersistedState('storageKey', 0);

    const toggle = () => {
        if (persisted.connected) {
            persisted.disconnect();
        } else {
            persisted.connect();
        }
    };

    const decrement = () => persisted.current--;
    const increment = () => persisted.current++;
</script>

<Flex justify="start" as="label" gap="2" align="center">
    <Checkbox checked={persisted.connected} onCheckedChange={toggle} />
    toogle connect
</Flex>

<Flex justify="start" align="center" gap="2">
    <Button variant="soft" onclick={decrement}>-</Button>
    {persisted.current}
    <Button variant="soft" onclick={increment}>+</Button>
</Flex>

<Text align="center">Check storage in dev tools</Text>
