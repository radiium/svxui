<script lang="ts">
    import { Button, Flex, rovingfocus } from 'svxui';

    const items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];
</script>

<Flex justify="start"
    direction="column"
    wrap="wrap"
    gap="1"
    {@attach rovingfocus({
        target: '[data-item]',
        loop: true
    })}
>
    {#each items as item, i (item)}
        {@const disabled = i === 1}
        <Button
            data-item
            variant="soft"
            {disabled}
            onclick={() => {
                // eslint-disable-next-line no-console
                console.log('click', item);
            }}
        >
            {item}
            {#if disabled}
                (disabled)
            {/if}
        </Button>
    {/each}
</Flex>
