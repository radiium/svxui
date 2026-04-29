<script lang="ts">
    import { Grid, Panel } from 'svxui';
</script>

<Grid cols="3" gap="3" width="100%">
    {#each { length: 6 }, i (i)}
        <Panel outline p="3">{i + 1}</Panel>
    {/each}
</Grid>
