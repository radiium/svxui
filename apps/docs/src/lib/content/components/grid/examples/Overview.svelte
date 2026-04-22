<script lang="ts">
    import { Grid, Panel } from 'svxui';
</script>

<Grid cols="3" gap="3" fullWidth>
    {#each { length: 6 }, i (i)}
        <Panel outline size="3">
            {i + 1}
        </Panel>
    {/each}
</Grid>
