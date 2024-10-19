<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Button, Card, Flexbox, TabGroup, TabPanel, TabTrigger } from 'svxui';

    const tabs = ['Tab1', 'Tab2', 'Tab3'];
</script>

<PlaygroundWrapper class="mb-5">
    <TabGroup slot="component">
        <Flexbox gap="1" class="mb-5">
            <Card variant="soft" size="0">
                <Flexbox direction="column" gap="1" class="p-1">
                    {#each tabs as tabId}
                        <TabTrigger value={tabId} let:isActive let:select>
                            <Button variant={isActive ? 'soft' : 'clear'} on:click={select}>
                                {tabId}
                            </Button>
                        </TabTrigger>
                    {/each}
                </Flexbox>
            </Card>

            <Card variant="outline" size="1">
                {#each tabs as tabId}
                    <TabPanel value={tabId}>{tabId} content</TabPanel>
                {/each}
            </Card>
        </Flexbox>
    </TabGroup>
</PlaygroundWrapper>
