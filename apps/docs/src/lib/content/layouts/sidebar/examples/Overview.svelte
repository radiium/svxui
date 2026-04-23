<script lang="ts">
    import { Flex, Panel, Sidebar, Text } from 'svxui';
</script>

<div style="width: 100%;">
    <Sidebar sideWidth="200px" contentMin="50%" gap="3">
        {#snippet sidebar()}
            <Panel variant="soft" size="3">
                <strong>Sidebar</strong><br />
                <Text muted size="2">200px</Text>
            </Panel>
        {/snippet}
        <Panel variant="clear" outline size="3">
            <Flex align="center" justify="center">Content — switches to stacking when too narrow</Flex>
        </Panel>
    </Sidebar>
</div>
