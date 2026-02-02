<script lang="ts">
    import { Button, Flexbox, Listbox, Panel } from 'svxui';

    const options = ['option1', 'option2', 'option3'];
    let value = $state(options[0]);
</script>

<Listbox bind:value>
    {#snippet children(rootState)}
        <Panel variant="clear" outline style="width: 220px;">
            <Flexbox direction="column" gap="1" {...rootState.attrs}>
                {#each options as opt, i (i)}
                    {@const item = rootState.getItem(opt)}

                    <Button {...item.attrs} variant={item.selected ? 'soft' : 'clear'} align="start">
                        {opt}
                    </Button>
                {/each}
            </Flexbox>
        </Panel>
    {/snippet}
</Listbox>
