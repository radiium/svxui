<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Accordion, Button, Flex, Panel, Separator, Text } from 'svxui';

    const items = ['1', '2', '3', '4'];
</script>

<div style="max-width: 100%;">
    <Panel variant="clear" outline p="0">
        <Accordion orientation="vertical">
            {#snippet children(accordion)}
                <Flex justify="start" {...accordion.rootAttrs}>
                    {#each items as value, i (value)}
                        <!-- Item -->
                        {@const item = accordion.getItem(value, { id: value })}

                        <Flex justify="start" {...item.itemAttrs}>
                            <!-- Heading -->
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                gap="3"
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
                                <div
                                    transition:slide={{ duration: 150, axis: 'x' }}
                                    class="p-4"
                                    {...item.contentAttrs}
                                >
                                    <div style:min-width="100px">
                                        Content {value}
                                    </div>
                                </div>
                            {/if}
                        </Flex>

                        {#if i < items.length - 1}
                            <Separator size="4" orientation="vertical" />
                        {/if}
                    {/each}
                </Flex>
            {/snippet}
        </Accordion>
    </Panel>
</div>
