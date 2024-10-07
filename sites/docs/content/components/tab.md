---
title: Tab
description: Headless tabs component.
category: doc
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
    import { Button, Card, Flexbox, TabGroup, TabPanel, TabTrigger } from 'sveltr';

    const tabs = ['Tab1', 'Tab2', 'Tab3', 'Tab4'];
</script>

<TabGroup>
    <Flexbox direction="column" gap="1">
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
```

### Verticale

<SampleVerticale/>

```svelte
<script lang="ts">
    import { Button, Card, Flexbox, TabGroup, TabPanel, TabTrigger } from 'sveltr';

    const tabs = ['Tab1', 'Tab2', 'Tab3', 'Tab4'];
</script>

<TabGroup>
    <Flexbox gap="1">
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
```

## API Reference

### TabGroup

<ApiReferenceComponent schema={tabGroupSchema}/>

### TabTrigger

<ApiReferenceComponent schema={tabTriggerSchema}/>

### TabContent

<ApiReferenceComponent schema={tabContentSchema}/>
