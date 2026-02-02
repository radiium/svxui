<script lang="ts">
    import { Tabs, Panel, Flexbox, Button } from 'svxui';

    let selection: string | undefined = $state('1');
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

    function selectFirst() {
        selection = tabs.at(0)?.id;
    }

    function selectLast() {
        selection = tabs.at(-1)?.id;
    }
</script>

<Flexbox direction="column" gap="6">
    <Flexbox justify="center" gap="3">
        <Button onclick={selectFirst}>Select first</Button>
        <Button onclick={selectLast}>Select last</Button>
    </Flexbox>

    <Tabs bind:value={selection} orientation="vertical">
        {#snippet children(root)}
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
</Flexbox>
