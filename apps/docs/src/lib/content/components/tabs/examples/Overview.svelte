<script lang="ts">
    import { Button, Flex, Panel, Tabs } from 'svxui';

    const tabs = [
        {
            id: '1',
            label: 'Tab 1',
            description: 'Tab content 1'
        },
        {
            id: '2',
            label: 'Tab 2',
            description: 'Tab content 2'
        },
        {
            id: '3',
            label: 'Tab 3',
            description: 'Tab content 3'
        }
    ];
</script>

<Tabs value={tabs[0].id}>
    {#snippet children(root)}
        <!-- Tabs root -->
        <Flex justify="start" direction="column" gap="3" {...root.rootAttrs}>
            <!-- Tabs list -->
            <Flex justify="start" gap="3" {...root.triggerListAttrs}>
                {#each tabs as { id, label } (id)}
                    <!-- Tabs trigger -->
                    {@const trigger = root.getTrigger(id)}
                    <Button variant={trigger.active ? 'soft' : 'clear'} {...trigger.attrs}>
                        {label}
                    </Button>
                {/each}
            </Flex>

            {#each tabs as { id, description } (id)}
                <!-- Tabs content -->
                {@const content = root.getContent(id)}
                {#if content.active}
                    <Panel variant="clear" outline {...content.attrs}>{description}</Panel>
                {/if}
            {/each}
        </Flex>
    {/snippet}
</Tabs>
