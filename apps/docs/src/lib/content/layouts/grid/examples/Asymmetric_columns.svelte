<script lang="ts">
    import { Flex, Grid, Panel } from 'svxui';
</script>

<Grid cols="1fr 2fr" gap="3" width="100%">
    {#each [1, 2, 3, 4] as n (n)}
        <Panel outline p="3">
            <Flex align="center">{n % 2 !== 0 ? '1fr' : '2fr'}</Flex>
        </Panel>
    {/each}
</Grid>
