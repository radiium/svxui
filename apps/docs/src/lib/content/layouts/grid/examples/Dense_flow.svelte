<script lang="ts">
    import { Box, Grid, Panel } from 'svxui';

    const items = [
        { label: 'A', span: 2 },
        { label: 'B', span: 1 },
        { label: 'C', span: 1 },
        { label: 'D', span: 2 },
        { label: 'E', span: 1 },
        { label: 'F', span: 1 }
    ];
</script>

<Grid cols="3" gap="3" flow="row-dense" width="100%">
    {#each items as item (item.label)}
        <Box gridColumn="span {item.span}">
            <Panel outline p="3">{item.label}</Panel>
        </Box>
    {/each}
</Grid>
