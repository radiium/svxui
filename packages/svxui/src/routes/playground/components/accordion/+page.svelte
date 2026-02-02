<script lang="ts">
    import { Accordions, Button, Flexbox, Panel, Separator, Text, type AccordionsProps } from '$lib/index.js';
    import { slide } from 'svelte/transition';
    import ControlButton from '../../controls/ControlButton.svelte';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import Playground from '../../controls/Playground.svelte';

    const items = ['1', '2', '3', '4'];

    let props: AccordionsProps<string, boolean> = $state({
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

    <Accordions {...props} bind:value={props.value}>
        {#snippet children(accordions)}
            <Panel variant="clear" outline size="0" class="w-100" style="max-width: 300px;">
                <Flexbox direction="column" {...accordions.rootAttrs}>
                    {#each items as value, i (value)}
                        {@const item = accordions.getItem(value)}
                        <!-- Item -->
                        <Flexbox direction="column" {...item.itemAttrs}>
                            <!-- Heading -->
                            <Flexbox
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
                            </Flexbox>

                            <!-- Content -->
                            {#if item.expanded}
                                <div transition:slide={{ duration: 150 }} class="p-4" {...item.contentAttrs}>
                                    Content {value}
                                </div>
                            {/if}
                        </Flexbox>

                        {#if i < items.length - 1}
                            <Separator size="4" />
                        {/if}
                    {/each}
                </Flexbox>
            </Panel>
        {/snippet}
    </Accordions>
</Playground>

<div><pre>{json}</pre></div>
