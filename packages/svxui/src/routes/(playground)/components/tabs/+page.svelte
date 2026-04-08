<script lang="ts">
    import { Button, Flex, Panel, Tabs, type TabsProps } from '$lib/index.js';
    import ControlButton from '../../controls/ControlButton.svelte';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import Playground from '../../controls/Playground.svelte';

    const items = ['1', '2', '3', '4'];

    const props: TabsProps<string> = $state({
        disabled: false,
        loop: false,
        activateOnFocus: false,
        value: '1'
    });

    let json = $derived(
        JSON.stringify(
            {
                props
            },
            null,
            2
        )
    );

    const selectValue = (): void => {
        props.value = items[1];
    };
</script>

<h1>Tabs</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="loop" bind:checked={props.loop} />
        <ControlCheckbox label="activateOnFocus" bind:checked={props.activateOnFocus} />
        <ControlCheckbox label="disabled" bind:checked={props.disabled} />
        <ControlButton onclick={() => selectValue()}>select values (controlled)</ControlButton>
    {/snippet}

    <Tabs {...props} bind:value={props.value}>
        {#snippet children(tabs)}
            <Flex justify="start" direction="column" gap="3" {...tabs.rootAttrs}>
                <Flex justify="start" gap="2" {...tabs.triggerListAttrs}>
                    {#each items as option, i (i)}
                        {@const trigger = tabs.getTrigger(option)}
                        <Button {...trigger.attrs} variant={trigger.active ? 'solid' : 'outline'}>
                            Trigger {option}
                        </Button>
                    {/each}
                </Flex>
                {#each items as option, i (i)}
                    {@const content = tabs.getContent(option)}

                    {#if content.active}
                        <Panel variant="clear" outline {...content.attrs}>
                            <Flex justify="start" direction="column">
                                Content {option}
                            </Flex>
                        </Panel>
                    {/if}
                {/each}
            </Flex>
        {/snippet}
    </Tabs>
</Playground>

<div><pre>{json}</pre></div>
