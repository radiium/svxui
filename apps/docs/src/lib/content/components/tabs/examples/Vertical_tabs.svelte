<script lang="ts">
    import { Button, Flexbox, Panel, Tabs } from 'svxui';

    const tabs = [
        {
            id: '1',
            title: 'Title 1',
            content: 'Content 1'
        },
        {
            id: '2',
            title: 'Title 2',
            content: 'Content 2'
        },
        {
            id: '3',
            title: 'Title 3',
            content: 'Content 3'
        },
        {
            id: '4',
            title: 'Title 4',
            content: 'Content 4',
            disabled: true
        }
    ];
</script>

<Tabs value={tabs[0].id} orientation="vertical">
    {#snippet children(root)}
        <!-- Tabs root -->
        <Flexbox gap="3" {...root.rootAttrs}>
            <!-- Tabs list -->
            <Flexbox direction="column" gap="3" {...root.triggerListAttrs}>
                {#each tabs as tab (tab.id)}
                    <!-- Tabs trigger -->
                    {@const trigger = root.getTrigger(tab.id, { id: tab.id, disabled: tab.disabled })}
                    <Button variant={trigger.active ? 'soft' : 'outline'} {...trigger.attrs}>
                        {tab.title}
                    </Button>
                {/each}
            </Flexbox>

            {#each tabs as tab (tab.id)}
                <!-- Tabs content -->
                {@const content = root.getContent(tab.id, { id: tab.id, disabled: tab.disabled })}
                {#if content.active}
                    <Panel variant="clear" outline {...content.attrs} style="width: 250px;">
                        {tab.content}
                    </Panel>
                {/if}
            {/each}
        </Flexbox>
    {/snippet}
</Tabs>
