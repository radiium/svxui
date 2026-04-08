<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Accordion, Button, Flex, Panel, Separator, Text } from 'svxui';

    const items = ['1', '2', '3', '4'];
</script>

<Panel variant="clear" outline size="0" style="width: 300px;">
    <Accordion orientation="vertical">
        {#snippet children(accordion)}
            <Flex justify="start" direction="column" {...accordion.rootAttrs}>
                {#each items as value, i (value)}
                    <!-- Item -->
                    {@const item = accordion.getItem(value, { id: value })}

                    <Flex justify="start" direction="column" {...item.itemAttrs}>
                        <!-- Heading -->
                        <Flex justify="between" align="center" class="p-4" {...item.headingAttrs}>
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
        {/snippet}
    </Accordion>
</Panel>
