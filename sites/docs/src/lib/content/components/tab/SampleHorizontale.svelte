<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Button, Card, Flexbox, TabGroup, TabPanel, TabTrigger } from 'svxui';

    const tabs = ['Tab1', 'Tab2', 'Tab3'];
    let current = $state(tabs[0]);
</script>

<PlaygroundWrapper class="mb-5">
    {#snippet component()}
        <TabGroup bind:value={current}>
            <Flexbox direction="column" gap="1" class="mb-5">
                <Card variant="soft" size="0">
                    <Flexbox gap="1" class="p-1">
                        {#each tabs as tabId}
                            <TabTrigger value={tabId}>
                                {#snippet children({ active, select, attrs })}
                                    <Button variant={active ? 'soft' : 'clear'} onclick={select} {...attrs}>
                                        {tabId}
                                    </Button>
                                {/snippet}
                            </TabTrigger>
                        {/each}
                    </Flexbox>
                </Card>

                {#each tabs as tab}
                    <TabPanel value={tab}>
                        {#snippet children({ attrs })}
                            <Card variant="outline" size="1" {...attrs}>
                                {tab} content
                            </Card>
                        {/snippet}
                    </TabPanel>
                {/each}
            </Flexbox>
        </TabGroup>
    {/snippet}
</PlaygroundWrapper>
