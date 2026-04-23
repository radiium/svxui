<script lang="ts">
    import { Flex, Panel, Switcher } from 'svxui';
</script>

<div style="width: 100%;">
    <Switcher threshold="480px" gap="3">
        {#each ['Panel A', 'Panel B', 'Panel C'] as label (label)}
            <Panel variant="soft" size="3">
                <Flex align="center" justify="center">{label}</Flex>
            </Panel>
        {/each}
    </Switcher>
</div>
