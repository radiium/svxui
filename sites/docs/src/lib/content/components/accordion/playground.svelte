<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { slide } from 'svelte/transition';
    import { AccordionGroup, AccordionItem, Button, Card, Flexbox, Text } from 'sveltr';
    import { template, accordionGroupSchema, accordionItemSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let propsGroup = {};
    let propsItem1 = { expanded: false };
    let propsItem2 = { expanded: false };
    let propsItem3 = { expanded: false };
    let propsString = '';
</script>

<Playground forceColumn>
    <div slot="component" style="min-width: 100%; min-height: 100%;">
        <AccordionGroup {...propsGroup}>
            <Card size="1" class="mb-3">
                <AccordionItem {...propsItem1} bind:expanded={propsItem1.expanded}>
                    <Flexbox
                        slot="header"
                        let:toggle
                        let:expanded
                        let:disabled
                        justify="between"
                        align="center"
                    >
                        <Text {disabled}>Accordion 1</Text>
                        <Button size="1" variant="soft" on:click={toggle} {disabled}>
                            {expanded ? 'close' : 'open'}
                        </Button>
                    </Flexbox>
                    <div transition:slide class="pt-3">Content 1</div>
                </AccordionItem>
            </Card>
            <Card size="1" class="mb-3">
                <AccordionItem {...propsItem2} bind:expanded={propsItem2.expanded}>
                    <Flexbox
                        slot="header"
                        let:toggle
                        let:expanded
                        let:disabled
                        justify="between"
                        align="center"
                    >
                        <Text {disabled}>Accordion 2</Text>
                        <Button size="1" variant="soft" on:click={toggle} {disabled}>
                            {expanded ? 'close' : 'open'}
                        </Button>
                    </Flexbox>
                    <div transition:slide class="pt-3">Content 2</div>
                </AccordionItem>
            </Card>
            <Card size="1" class="mb-3">
                <AccordionItem {...propsItem3} bind:expanded={propsItem3.expanded}>
                    <Flexbox
                        slot="header"
                        let:toggle
                        let:expanded
                        let:disabled
                        justify="between"
                        align="center"
                    >
                        <Text {disabled}>Accordion 3</Text>
                        <Button size="1" variant="soft" on:click={toggle} {disabled}>
                            {expanded ? 'close' : 'open'}
                        </Button>
                    </Flexbox>
                    <div transition:slide class="pt-3">Content 3</div>
                </AccordionItem>
            </Card>
        </AccordionGroup>
    </div>
    <Flexbox slot="form" direction="column" gap="1">
        <h5>Props AccordionGroup</h5>
        <PlaygroundForm bind:props={propsGroup} bind:propsString schema={accordionGroupSchema} />
        <h5 class="mt-3">Props AccordioItem 1</h5>
        <PlaygroundForm bind:props={propsItem1} schema={accordionItemSchema} />
        <h5 class="mt-3">Props AccordioItem 2</h5>
        <PlaygroundForm bind:props={propsItem2} schema={accordionItemSchema} />
        <h5 class="mt-3">Props AccordioItem 3</h5>
        <PlaygroundForm bind:props={propsItem3} schema={accordionItemSchema} />
    </Flexbox>
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
