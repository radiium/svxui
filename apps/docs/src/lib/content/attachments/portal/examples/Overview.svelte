<script lang="ts">
    import { Checkbox, Flex, Panel, portal } from 'svxui';

    let enabled = $state(false);
</script>

<Flex justify="start" as="label" gap="2" align="center">
    <Checkbox bind:checked={enabled} />
    Enabled
</Flex>

<Flex justify="start" gap="5">
    <Panel>
        source
        <Panel
            outline
            variant="clear"
            {@attach portal({
                enabled,
                target: '#target-id'
            })}
        >
            portal content
        </Panel>
    </Panel>

    <Panel id="target-id">target</Panel>
</Flex>
