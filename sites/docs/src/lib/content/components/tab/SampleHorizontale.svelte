<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import { Button, Card, Flexbox, TabGroup, TabPanel, TabTrigger } from 'sveltr';

    const tabs = ['Tab1', 'Tab2', 'Tab3', 'Tab4'];
</script>

<Playground class="mb-5">
    <TabGroup slot="component">
        <Flexbox direction="column" gap="1" class="mb-5">
            <Card variant="soft" size="0">
                <Flexbox gap="1" class="p-1">
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
</Playground>
