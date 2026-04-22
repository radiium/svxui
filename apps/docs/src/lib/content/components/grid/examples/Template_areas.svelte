<script lang="ts">
    import { Flex, Grid, Panel } from 'svxui';
</script>

<Grid
    areas="'header header' 'sidebar main' 'footer footer'"
    cols="160px 1fr"
    rows="auto 120px auto"
    gap="3"
    width="100%"
>
    <Panel outline style="grid-area: header;">
        <Flex align="center" justify="center">header</Flex>
    </Panel>
    <Panel outline style="grid-area: sidebar;">
        <Flex align="center" justify="center">sidebar</Flex>
    </Panel>
    <Panel outline style="grid-area: main;">
        <Flex align="center" justify="center">main</Flex>
    </Panel>
    <Panel outline style="grid-area: footer;">
        <Flex align="center" justify="center">footer</Flex>
    </Panel>
</Grid>
