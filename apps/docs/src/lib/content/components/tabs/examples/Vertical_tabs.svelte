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
        },
        {
            id: '4',
            label: 'Tab 4',
            description: 'Tab content 4',
            disabled: true
        }
    ];
</script>

<Tabs value={tabs[0].id} orientation="vertical" activateOnFocus loop>
    {#snippet children(root)}
        <!-- Tabs root -->
        <Flex justify="start" gap="3" {...root.rootAttrs}>
            <!-- Tabs list -->
            <Flex justify="start" direction="column" gap="1" {...root.triggerListAttrs}>
                {#each tabs as { id, label, disabled } (id)}
                    <!-- Tabs trigger -->
                    {@const trigger = root.getTrigger(id, { disabled: disabled })}
                    <Button variant={trigger.active ? 'soft' : 'clear'} {...trigger.attrs}>
                        {label}
                    </Button>
                {/each}
            </Flex>

            {#each tabs as { id, description, disabled } (id)}
                <!-- Tabs content -->
                {@const content = root.getContent(id, { disabled: disabled })}
                {#if content.active}
                    <Panel variant="clear" outline {...content.attrs} style="width: 250px">
                        {description}
                    </Panel>
                {/if}
            {/each}
        </Flex>
    {/snippet}
</Tabs>
