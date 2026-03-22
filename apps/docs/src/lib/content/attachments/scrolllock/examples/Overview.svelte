<script lang="ts">
    import { Button, Checkbox, Flexbox, Panel, scrolllock } from 'svxui';

    let enabled = $state(false);
</script>

<Flexbox as="label" gap="2" align="center">
    <Checkbox bind:checked={enabled} />
    Enabled
</Flexbox>

<Panel
    size="1"
    color="neutral"
    style="width: 200px; max-height: 240px; overflow: scroll;"
    {@attach scrolllock({ enabled })}
>
    <Flexbox direction="column" gap="1">
        {#each { length: 200 }, i (i)}
            <Button variant="soft" fullWidth>Item {i}</Button>
        {/each}
    </Flexbox>
</Panel>
