---
title: Accordion
description: Accordion component
---

<script lang="ts">
    import { slide } from 'svelte/transition';
    import Card from '$lib/components/Card/Card.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import Button from '$lib/components/Button/Button.svelte';
    import AccordionGroup from '$lib/components/Accordion/AccordionGroup.svelte';
    import AccordionItem from '$lib/components/Accordion/AccordionItem.svelte';
    import {docAccordionGroupPropsDefs, docAccordionItemPropsDefs} from '$lib/components/Accordion/Accordion.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let propsGroup = {}
    let propsItem = {}
</script>

## Playground

<Playground>
    <div slot="component" style="min-width: 100%; min-height: 100%;">
        <AccordionGroup {...propsGroup}>
            <Card size="1" class="mb-3">
                <AccordionItem {...propsItem}>
                    <Flexbox slot="header" let:toggle let:isOpen justify="between" alignItems="center">
                        Accordion 1
                        <Button size="1" variant="soft" on:click={toggle}>
                            {isOpen ? 'close' : 'open'}
                        </Button>
                    </Flexbox>
                    <div transition:slide class="pt-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mi lacus, convallis in urna nec, tristique euismod augue. Etiam vitae maximus turpis. Etiam vulputate varius urna, et sollicitudin ex pharetra a. Praesent lacinia vestibulum elit id condimentum.
                    </div>
                </AccordionItem>
            </Card>
            <Card size="1" class="mb-3">
                <AccordionItem {...propsItem}>
                    <Flexbox slot="header" let:toggle let:isOpen justify="between" alignItems="center">
                        Accordion 2
                        <Button size="1" variant="soft" on:click={toggle}>
                            {isOpen ? 'close' : 'open'}
                        </Button>
                    </Flexbox>
                    <div transition:slide class="pt-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mi lacus, convallis in urna nec, tristique euismod augue. Etiam vitae maximus turpis. Etiam vulputate varius urna, et sollicitudin ex pharetra a. Praesent lacinia vestibulum elit id condimentum.
                    </div>
                </AccordionItem>
            </Card>
            <Card size="1" class="mb-3">
                <AccordionItem {...propsItem}>
                    <Flexbox slot="header" let:toggle let:isOpen justify="between" alignItems="center">
                        Accordion 3
                        <Button size="1" variant="soft" on:click={toggle}>
                            {isOpen ? 'close' : 'open'}
                        </Button>
                    </Flexbox>
                    <div transition:slide class="pt-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Curabitur mi lacus, convallis in urna nec, tristique euismod augue. Etiam vitae maximus turpis. Etiam vulputate varius urna, et sollicitudin ex pharetra a. Praesent lacinia vestibulum elit id condimentum.
                    </div>
                </AccordionItem>
            </Card>
        </AccordionGroup>
    </div>
    <Flexbox slot="form" direction="column" gap="1">
        <h5>Props AccordionGroup</h5>
        <PlaygroundForm bind:props={propsGroup} schema={docAccordionGroupPropsDefs} />
        <h5 class="mt-3">Props AccordioItem</h5>
        <PlaygroundForm bind:props={propsItem} schema={docAccordionItemPropsDefs} />
    </Flexbox>

</Playground>

## API Reference

### AccordionGroup

<ApiReference data={docAccordionGroupPropsDefs}></ApiReference>

### AccordionItem

<ApiReference data={docAccordionItemPropsDefs}></ApiReference>
