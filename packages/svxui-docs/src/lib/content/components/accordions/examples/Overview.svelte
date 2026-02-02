<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Accordions, Button, Flexbox, Panel, Separator, Text } from 'svxui';

    let items = ['1', '2', '3', '4'];
</script>

<Panel variant="clear" outline size="0" style="width: 300px;">
    <Accordions orientation="vertical">
        {#snippet children(accordions)}
            <Flexbox direction="column" {...accordions.rootAttrs}>
                {#each items as value, i (value)}
                    <!-- Item -->
                    {@const item = accordions.getItem(value, { id: value })}

                    <Flexbox direction="column" {...item.itemAttrs}>
                        <!-- Heading -->
                        <Flexbox justify="between" align="center" class="p-4" {...item.headingAttrs}>
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
        {/snippet}
    </Accordions>
</Panel>
