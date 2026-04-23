<script lang="ts">
    import { Accordion, Button, Flex, Panel, Separator, Text, type AccordionProps } from '$lib/index.js';
    import { slide } from 'svelte/transition';
    import ControlButton from '../../controls/ControlButton.svelte';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import Playground from '../../controls/Playground.svelte';

    const items = ['1', '2', '3', '4'];

    const props: AccordionProps<string, boolean> = $state({
        multiple: false,
        disabled: false,
        value: undefined
    });

    let json = $derived(
        JSON.stringify(
            {
                props: {
                    value: props.value,
                    multiple: props.multiple,
                    disabled: props.disabled
                }
            },
            null,
            2
        )
    );

    const selectValue = (): void => {
        if (props.multiple) {
            props.value = [items[1], items[2]];
        } else {
            props.value = items[1];
        }
    };
</script>

<h1>Accordion</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="disabled" bind:checked={props.disabled} />
        <ControlCheckbox label="multiple" bind:checked={props.multiple} />
        <ControlButton onclick={() => selectValue()}>select value (controlled)</ControlButton>
    {/snippet}

    <Accordion {...props} bind:value={props.value}>
        {#snippet children(accordion)}
            <Panel variant="clear" outline size="0" fullWidth style="max-width: 300px;">
                <Flex justify="start" direction="column" {...accordion.rootAttrs}>
                    {#each items as value, i (value)}
                        {@const item = accordion.getItem(value)}
                        <!-- Item -->
                        <Flex justify="start" direction="column" {...item.itemAttrs}>
                            <!-- Heading -->
                            <Flex
                                as="header"
                                justify="between"
                                align="center"
                                class="p-4"
                                {...item.headingAttrs}
                            >
                                <Text disabled={item.disabled}>Title {value}</Text>
                                <!-- Trigger -->
                                <Button size="1" variant="soft" {...item.triggerAttrs}>
                                    {item.expanded ? 'close' : 'open'}
                                </Button>
                            </Flex>

                            <!-- Content -->
                            {#if item.expanded}
                                <div transition:slide={{ duration: 150 }} class="p-4" {...item.contentAttrs}>
                                    Content {value}
                                </div>
                            {/if}
                        </Flex>

                        {#if i < items.length - 1}
                            <Separator size="4" />
                        {/if}
                    {/each}
                </Flex>
            </Panel>
        {/snippet}
    </Accordion>
</Playground>

<div><pre>{json}</pre></div>
