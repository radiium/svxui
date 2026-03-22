<script lang="ts">
    import { Flexbox, Panel } from 'svxui';

    const items = ['1', '2', '3'];
</script>

<Flexbox justify="center" wrap="wrap" gap="4" fullWidth>
    {#each items as item (item)}
        <Panel variant="clear" outline size="5" style="flex: 1 1 200px">
            {item}
        </Panel>
    {/each}
</Flexbox>
