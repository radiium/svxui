<script lang="ts">
    import { Button, Flex, Panel, Tabs } from 'svxui';

    const tabs = ['1', '2', '3', '4'];
</script>

<Tabs value={tabs[0]}>
    {#snippet children(root)}
        <!-- Tabs root -->
        <Flex justify="start" direction="column" gap="3" {...root.rootAttrs}>
            <!-- Tabs list -->
            <Flex justify="start" gap="3" {...root.triggerListAttrs}>
                {#each tabs as id (id)}
                    <!-- Tabs trigger -->
                    {@const trigger = root.getTrigger(id)}
                    <Button variant={trigger.active ? 'soft' : 'clear'} {...trigger.attrs}>
                        Tab {id}
                    </Button>
                {/each}
            </Flex>

            {#each tabs as id (id)}
                <!-- Tabs content -->
                {@const content = root.getContent(id)}
                {#if content.active}
                    <Panel variant="clear" outline {...content.attrs}>
                        Tab content {id}
                    </Panel>
                {/if}
            {/each}
        </Flex>
    {/snippet}
</Tabs>
