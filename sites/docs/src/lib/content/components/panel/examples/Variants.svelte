<script lang="ts">
    import { Panel, Flexbox } from 'svxui';
</script>

<Flexbox direction="column" align="start" gap="3">
    <Flexbox gap="3">
        <Panel variant="solid">Panel solid</Panel>
        <Panel variant="solid" outline>Panel solid outline</Panel>
    </Flexbox>

    <Flexbox gap="3">
        <Panel variant="soft">Panel soft</Panel>
        <Panel variant="soft" outline>Panel soft outline</Panel>
    </Flexbox>

    <Flexbox gap="3">
        <Panel variant="clear">Panel clear</Panel>
        <Panel variant="clear" outline>Panel clear outline</Panel>
    </Flexbox>
</Flexbox>
