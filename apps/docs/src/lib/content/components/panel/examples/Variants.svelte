<script lang="ts">
    import { Panel, Flex } from 'svxui';
</script>

<Flex justify="start" direction="column" align="start" gap="3">
    <Flex justify="start" gap="3">
        <Panel variant="solid">Panel solid</Panel>
        <Panel variant="solid" outline>Panel solid outline</Panel>
    </Flex>

    <Flex justify="start" gap="3">
        <Panel variant="soft">Panel soft</Panel>
        <Panel variant="soft" outline>Panel soft outline</Panel>
    </Flex>

    <Flex justify="start" gap="3">
        <Panel variant="clear">Panel clear</Panel>
        <Panel variant="clear" outline>Panel clear outline</Panel>
    </Flex>
</Flex>
