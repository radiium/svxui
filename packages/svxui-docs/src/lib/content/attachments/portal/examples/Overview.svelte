<script lang="ts">
    import { Checkbox, Flexbox, Panel, portal } from 'svxui';

    let enabled = $state(false);
</script>

<Flexbox as="label" gap="2" align="center">
    <Checkbox bind:checked={enabled} />
    Enabled
</Flexbox>

<Flexbox gap="5">
    <Panel>
        source
        <Panel
            outline
            variant="clear"
            class="my-3"
            {@attach portal({
                enabled,
                target: '#target-id'
            })}
        >
            portal content
        </Panel>
    </Panel>

    <Panel id="target-id">target</Panel>
</Flexbox>
