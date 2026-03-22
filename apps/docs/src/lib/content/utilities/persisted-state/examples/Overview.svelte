<script lang="ts">
    import { Button, Checkbox, Flexbox, PersistedState, Text } from 'svxui';

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

<Flexbox as="label" gap="2" align="center">
    <Checkbox checked={persisted.connected} onCheckedChange={toggle} />
    toogle connect
</Flexbox>

<Flexbox align="center" gap="2">
    <Button variant="soft" onclick={decrement}>-</Button>
    {persisted.current}
    <Button variant="soft" onclick={increment}>+</Button>
</Flexbox>

<Text align="center">Check storage in dev tools</Text>
