<script lang="ts">
    import { Checkbox, Flexbox, Panel, Portal, Select } from 'svxui';

    let enabled = $state(false);
    let target = $state('#target1');
    let targets = ['#target1', '#target2'];
</script>

<Flexbox direction="column" gap="5">
    <Flexbox gap="3">
        <Flexbox as="label" gap="2" align="center">
            <Checkbox bind:checked={enabled} />
            Enabled
        </Flexbox>
        <Select size="3" options={targets} bind:value={target}></Select>
    </Flexbox>

    <Panel variant="clear" outline>
        Source

        <Portal {enabled} {target}>
            <Panel>Portal content</Panel>
        </Portal>
    </Panel>

    <Panel variant="clear" outline id="target1">Taget 1</Panel>
    <Panel variant="clear" outline id="target2">Taget 2</Panel>
</Flexbox>
