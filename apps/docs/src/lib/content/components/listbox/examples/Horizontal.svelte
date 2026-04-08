<script lang="ts">
    import { Button, Flex, Listbox, Panel } from 'svxui';

    const options = ['option1', 'option2', 'option3'];
    let value = $state([options[0]]);
</script>

<Listbox bind:value multiple orientation="horizontal">
    {#snippet children(rootState)}
        <Panel variant="clear" outline size="2">
            <Flex justify="start" gap="2" {...rootState.rootAttrs}>
                {#each options as opt, i (i)}
                    {@const item = rootState.getItem(opt)}

                    <Button {...item.attrs} variant={item.selected ? 'soft' : 'clear'} align="start">
                        {opt}
                    </Button>
                {/each}
            </Flex>
        </Panel>
    {/snippet}
</Listbox>
