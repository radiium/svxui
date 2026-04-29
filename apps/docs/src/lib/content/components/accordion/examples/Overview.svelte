<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Accordion, Button, Flex, Panel, Separator, Text } from 'svxui';

    const items = ['1', '2', '3', '4'];
</script>

<Panel variant="clear" outline p="0">
    <Accordion orientation="vertical">
        {#snippet children(accordion)}
            <Flex justify="start" direction="column" {...accordion.rootAttrs} width="300px">
                {#each items as value, i (value)}
                    <!-- Item -->
                    {@const item = accordion.getItem(value, { id: value })}

                    <Flex justify="start" direction="column" {...item.itemAttrs}>
                        <!-- Heading -->
                        <Flex
                            justify="between"
                            align="center"
                            {...item.headingAttrs}
                            style="padding: var(--space-4);"
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
                                transition:slide={{ duration: 150 }}
                                {...item.contentAttrs}
                                style="padding: var(--space-4);"
                            >
                                Content {value}
                            </div>
                        {/if}
                    </Flex>

                    {#if i < items.length - 1}
                        <Separator size="4" />
                    {/if}
                {/each}
            </Flex>
        {/snippet}
    </Accordion>
</Panel>
