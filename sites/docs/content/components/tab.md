---
title: Tab
description: Headless tabs component.
category: components
---

<script lang="ts">
    import ApiReferenceComponent from '$lib/components/api-reference/ApiReferenceComponent.svelte';
    import SampleHorizontale from '$lib/content/components/tab/SampleHorizontale.svelte';
    import SampleVerticale from '$lib/content/components/tab/SampleVerticale.svelte';
    import { tabGroupSchema, tabTriggerSchema, tabContentSchema } from '$lib/content/components/tab/schema.js';
</script>

## Samples

### Horizontale

<SampleHorizontale/>

```svelte
<script lang="ts">
    import { Button, Card, Flexbox, TabGroup, TabPanel, TabTrigger } from 'svxui';

    const tabs = ['Tab1', 'Tab2', 'Tab3'];
    let current = $state(tabs[0]);
</script>

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
```

### Verticale

<SampleVerticale/>

```svelte
<script lang="ts">
    import { Button, Card, Flexbox, TabGroup, TabPanel, TabTrigger } from 'svxui';

    const tabs = ['Tab1', 'Tab2', 'Tab3'];
    let current = $state(tabs[0]);
</script>

<TabGroup bind:value={current}>
    <Flexbox gap="1" class="mb-5">
        <Card variant="soft" size="0">
            <Flexbox direction="column" gap="1" class="p-1">
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
```

## API Reference

### TabGroup

<ApiReferenceComponent schema={tabGroupSchema}/>

### TabTrigger

<ApiReferenceComponent schema={tabTriggerSchema}/>

### TabContent

<ApiReferenceComponent schema={tabContentSchema}/>
