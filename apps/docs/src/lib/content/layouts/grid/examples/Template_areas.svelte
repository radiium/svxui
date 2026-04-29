<script lang="ts">
    import { Box, Grid, Panel } from 'svxui';
</script>

<Grid
    areas="'header header' 'sidebar main' 'footer footer'"
    cols="160px 1fr"
    rows="auto 120px auto"
    gap="3"
    width="100%"
>
    <Box gridArea="header">
        <Panel outline fullWidth fullHeight>header</Panel>
    </Box>

    <Box gridArea="sidebar">
        <Panel outline fullWidth fullHeight>sidebar</Panel>
    </Box>

    <Box gridArea="main">
        <Panel outline fullWidth fullHeight>main</Panel>
    </Box>

    <Box gridArea="footer">
        <Panel outline fullWidth fullHeight>footer</Panel>
    </Box>
</Grid>
