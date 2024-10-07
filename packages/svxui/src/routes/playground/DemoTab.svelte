<script lang="ts">
    import { Button, Card, Flexbox, TabGroup, TabPanel, TabTrigger } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    const tabs = [
        {
            value: 'tab1',
            label: 'Tab 1',
            content: 'Tab 1 content',
            disabled: false
        },
        {
            value: 'tab2',
            label: 'Tab 2',
            content: 'Tab 2 content',
            disabled: false
        },
        {
            value: 'tab3',
            label: 'Tab 3',
            content: 'Tab 3 content',
            disabled: false
        },
        {
            value: 'tab4',
            label: 'Tab 4',
            content: 'Tab 4 content',
            disabled: true
        }
    ];
</script>

<Details>
    <h2 slot="title">Tab</h2>

    <Section>
        <h3 slot="title">Horizontal</h3>

        <TabGroup>
            <Flexbox direction="column" gap="1">
                <Card variant="soft" size="0">
                    <Flexbox gap="1" class="p-1">
                        {#each tabs as { value, label, disabled }}
                            <TabTrigger {value} let:isActive let:select>
                                <Button variant={isActive ? 'soft' : 'clear'} on:click={select} {disabled}
                                    >{label}</Button
                                >
                            </TabTrigger>
                        {/each}
                    </Flexbox>
                </Card>

                <Card variant="outline" size="1">
                    {#each tabs as { value, content }}
                        <TabPanel {value}>{content}</TabPanel>
                    {/each}
                </Card>
            </Flexbox>
        </TabGroup>
    </Section>

    <Section>
        <h3 slot="title">Vertical</h3>
        <TabGroup>
            <Flexbox gap="1">
                <Card variant="soft" size="0">
                    <Flexbox direction="column" gap="1" class="p-1">
                        {#each tabs as { value, label, disabled }}
                            <TabTrigger {value} let:isActive let:select>
                                <Button variant={isActive ? 'soft' : 'clear'} on:click={select} {disabled}
                                    >{label}</Button
                                >
                            </TabTrigger>
                        {/each}
                    </Flexbox>
                </Card>

                <Card variant="outline" size="1">
                    {#each tabs as { value, content }}
                        <TabPanel {value}>{content}</TabPanel>
                    {/each}
                </Card>
            </Flexbox>
        </TabGroup>
    </Section>
</Details>
