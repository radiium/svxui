<script lang="ts">
    import { Panel, Flex, Checkbox, Radio } from 'svxui';

    let group = $state('1');
</script>

<Flex justify="start" gap="3" width="100%">
    <Panel as="button">Panel button</Panel>
    <Panel as="a" id="l1" href="#l1">Panel link</Panel>
</Flex>

<Flex justify="start" gap="3" width="100%">
    <Panel as="label" variant="clear" outline>
        <Flex justify="start" gap="3" align="center">
            <Checkbox />
            option 1
        </Flex>
    </Panel>
    <Panel as="label" variant="clear" outline>
        <Flex justify="start" gap="3" align="center">
            <Checkbox />
            option 2
        </Flex>
    </Panel>
    <Panel as="label" variant="clear" outline>
        <Flex justify="start" gap="3" align="center">
            <Checkbox />
            option 3
        </Flex>
    </Panel>
</Flex>

<Flex justify="start" gap="3" width="100%">
    <Panel as="label" variant="soft" color="blue">
        <Flex justify="start" gap="3" align="center">
            <Radio name="radio" value="1" bind:group color="blue" />
            option 1
        </Flex>
    </Panel>
    <Panel as="label" variant="soft" color="blue">
        <Flex justify="start" gap="3" align="center">
            <Radio name="radio" value="2" bind:group color="blue" />
            option 2
        </Flex>
    </Panel>
    <Panel as="label" variant="soft" color="blue">
        <Flex justify="start" gap="3" align="center">
            <Radio name="radio" value="3" bind:group color="blue" />
            option 3
        </Flex>
    </Panel>
</Flex>
