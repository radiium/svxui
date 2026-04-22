<script lang="ts">
    import { Flex, Grid, Panel } from 'svxui';
</script>

<Grid cols="1fr 2fr" gap="3" fullWidth>
    {#each [1, 2, 3, 4] as n (n)}
        <Panel outline size="3">
            <Flex align="center" justify="center">{n % 2 !== 0 ? '1fr' : '2fr'}</Flex>
        </Panel>
    {/each}
</Grid>
