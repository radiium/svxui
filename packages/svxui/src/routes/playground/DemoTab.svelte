<script lang="ts">
    import Separator from '$lib/components/separator/components/separator.svelte';
    import { Button, Card, Flexbox, TabGroup, TabPanel, TabTrigger, Text } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';

    type Item = {
        value: string;
        label: string;
        content: string;
        disabled: boolean;
    };

    const tabs: Item[] = $state([
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
    ]);

    let valueH = $state<string | undefined>('tab1');
    const itemsH = $state(structuredClone($state.snapshot(tabs)));

    let valueV = $state<string | undefined>('tab1');
    const itemsV = $state(structuredClone($state.snapshot(tabs)));
</script>

{#snippet itemControl(index: number, items: Item[], value: any, setValue: (value: any) => void)}
    {@const item = items[index]!}

    <Flexbox gap="3" align="center" class="mb-3">
        <Text>{item.value}</Text>
        <Button
            variant="soft"
            disabled={item.disabled}
            onclick={() => {
                if (!item.disabled) {
                    setValue(item.value);
                }
            }}
        >
            Select
        </Button>

        <Button
            variant="soft"
            onclick={() => {
                item.disabled = !item.disabled;
            }}
        >
            {#if item.disabled}
                Enable
            {:else}
                Disable
            {/if}
        </Button>
    </Flexbox>
{/snippet}

<Details>
    {#snippet title()}
        <h2>Tab</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Horizontal</h3>
        {/snippet}

        <Flexbox gap="3" class="mb-5">
            <Text>Value:</Text>
            <Text color="green">{valueH}</Text>
        </Flexbox>
        {@render itemControl(0, itemsH, valueH, (val) => (valueH = val))}
        {@render itemControl(1, itemsH, valueH, (val) => (valueH = val))}
        {@render itemControl(2, itemsH, valueH, (val) => (valueH = val))}
        {@render itemControl(3, itemsH, valueH, (val) => (valueH = val))}
        <Flexbox gap="3" class="mb-5">
            <Button variant="outline" onclick={() => (valueH = undefined)}>Unselect all</Button>
        </Flexbox>
        <Separator size="4" class="mb-5" />

        <TabGroup bind:value={valueH}>
            <Flexbox direction="column" gap="1">
                <Card variant="soft" size="0">
                    <Flexbox gap="1" class="p-1">
                        {#each itemsH as { value, label, disabled }}
                            <TabTrigger {value}>
                                {#snippet children({ active, select, attrs })}
                                    <Button
                                        variant={active ? 'soft' : 'clear'}
                                        onclick={select}
                                        {disabled}
                                        {...attrs}
                                    >
                                        {label}
                                    </Button>
                                {/snippet}
                            </TabTrigger>
                        {/each}
                    </Flexbox>
                </Card>

                {#each itemsH as { value, content }}
                    <TabPanel {value}>
                        {#snippet children({ attrs })}
                            <Card variant="outline" size="1" {...attrs}>
                                {content}
                            </Card>
                        {/snippet}
                    </TabPanel>
                {/each}
            </Flexbox>
        </TabGroup>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Vertical</h3>
        {/snippet}

        <Flexbox gap="1" align="center" class="width-100">
            <Text>Value:</Text>
            <Text color="green">{valueV}</Text>
        </Flexbox>
        {@render itemControl(0, itemsV, valueV, (val) => (valueV = val))}
        {@render itemControl(1, itemsV, valueV, (val) => (valueV = val))}
        {@render itemControl(2, itemsV, valueV, (val) => (valueV = val))}
        {@render itemControl(3, itemsV, valueV, (val) => (valueV = val))}
        <Flexbox gap="3" class="mb-5">
            <Button variant="outline" onclick={() => (valueV = undefined)}>Unselect all</Button>
        </Flexbox>
        <Separator size="4" class="mt-3 mb-5" />

        <TabGroup bind:value={valueV}>
            <Flexbox gap="1">
                <Card variant="soft" size="0">
                    <Flexbox direction="column" gap="1" class="p-1">
                        {#each itemsV as { value, label, disabled }}
                            <TabTrigger {value}>
                                {#snippet children({ active, select, attrs })}
                                    <Button
                                        variant={active ? 'soft' : 'clear'}
                                        onclick={select}
                                        {disabled}
                                        {...attrs}
                                    >
                                        {label}
                                    </Button>
                                {/snippet}
                            </TabTrigger>
                        {/each}
                    </Flexbox>
                </Card>
                {#each itemsV as { value, content }}
                    <TabPanel {value}>
                        {#snippet children({ attrs })}
                            <Card variant="outline" size="1" {...attrs}>
                                {content}
                            </Card>
                        {/snippet}
                    </TabPanel>
                {/each}
            </Flexbox>
        </TabGroup>
    </Section>
</Details>
