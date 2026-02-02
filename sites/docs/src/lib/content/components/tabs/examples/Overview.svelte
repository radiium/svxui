<script lang="ts">
    import { Button, Flexbox, Panel, Tabs } from 'svxui';

    const tabs = ['1', '2', '3', '4'];
</script>

<Tabs value="1">
    {#snippet children(root)}
        <Flexbox direction="column" gap="3" {...root.rootAttrs}>
            <!-- Tabs list -->
            <Flexbox gap="3" {...root.triggerListAttrs}>
                {#each tabs as id (id)}
                    <!-- Tabs trigger -->
                    {@const trigger = root.getTrigger(id)}
                    <Button variant={trigger.active ? 'soft' : 'clear'} {...trigger.attrs}>
                        Tab {id}
                    </Button>
                {/each}
            </Flexbox>

            {#each tabs as id (id)}
                <!-- Tabs content -->
                {@const content = root.getContent(id)}
                {#if content.active}
                    <Panel variant="clear" outline {...content.attrs}>
                        Tab content {id}
                    </Panel>
                {/if}
            {/each}
        </Flexbox>
    {/snippet}
</Tabs>
