<script lang="ts">
    import { Panel, Flexbox, Checkbox, Radio } from 'svxui';

    let group = $state('1');
</script>

<Flexbox gap="3" fullWidth>
    <Panel as="button">Panel button</Panel>
    <Panel as="a" id="l1" href="#l1">Panel link</Panel>
</Flexbox>

<Flexbox gap="3" fullWidth>
    <Panel as="label" variant="clear" outline>
        <Flexbox gap="3" align="center">
            <Checkbox />
            option 1
        </Flexbox>
    </Panel>
    <Panel as="label" variant="clear" outline>
        <Flexbox gap="3" align="center">
            <Checkbox />
            option 2
        </Flexbox>
    </Panel>
    <Panel as="label" variant="clear" outline>
        <Flexbox gap="3" align="center">
            <Checkbox />
            option 3
        </Flexbox>
    </Panel>
</Flexbox>

<Flexbox gap="3" fullWidth>
    <Panel as="label" variant="soft" color="blue">
        <Flexbox gap="3" align="center">
            <Radio name="radio" value="1" bind:group color="blue" />
            option 1
        </Flexbox>
    </Panel>
    <Panel as="label" variant="soft" color="blue">
        <Flexbox gap="3" align="center">
            <Radio name="radio" value="2" bind:group color="blue" />
            option 2
        </Flexbox>
    </Panel>
    <Panel as="label" variant="soft" color="blue">
        <Flexbox gap="3" align="center">
            <Radio name="radio" value="3" bind:group color="blue" />
            option 3
        </Flexbox>
    </Panel>
</Flexbox>
