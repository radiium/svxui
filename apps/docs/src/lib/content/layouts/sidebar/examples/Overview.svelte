<script lang="ts">
    import { Panel, Sidebar, Text } from 'svxui';
</script>

<div style="width: 100%">
    <Sidebar sideWidth="200px" contentMin="50%" gap="3">
        {#snippet sidebar()}
            <Panel variant="soft" outline p="3">
                <strong>Sidebar</strong><br />
                <Text muted size="2">200px</Text>
            </Panel>
        {/snippet}
        <Panel variant="clear" outline p="3">
            <strong>Content</strong><br />
            <Text muted size="2">switches to stacking when too narrow</Text>
        </Panel>
    </Sidebar>
</div>
