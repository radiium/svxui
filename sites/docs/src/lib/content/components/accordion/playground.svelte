<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { slide } from 'svelte/transition';
    import { AccordionGroup, AccordionItem, Button, Card, Flexbox, Text } from 'svxui';
    import { template, accordionGroupSchema, accordionItemSchema as itemSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import P from '$lib/components/markdown/p.svelte';

    let accordionItemSchema = {
        ...itemSchema,
        props: itemSchema.props.filter((p) => p.name !== 'id')
    };

    let propsGroup = {};
    let propsString = '';

    let propsItem1 = { expanded: false };
    let propsString1 = '';

    let propsItem2 = { expanded: false };
    let propsString2 = '';

    let propsItem3 = { expanded: false };
    let propsString3 = '';

    $: templateProps = [
        {
            key: ':props',
            value: propsString
        },
        {
            key: ':props1',
            value: propsString1
        },
        {
            key: ':props2',
            value: propsString2
        },
        {
            key: ':props3',
            value: propsString3
        }
    ];
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
        <h4>Props AccordionGroup</h4>
        <PlaygroundForm bind:props={propsGroup} bind:propsString schema={accordionGroupSchema} />
        <h4 class="mt-5">Props AccordioItem 1</h4>
        <PlaygroundForm
            bind:props={propsItem1}
            bind:propsString={propsString1}
            schema={accordionItemSchema}
        />
        <h4 class="mt-5">Props AccordioItem 2</h4>
        <PlaygroundForm
            bind:props={propsItem2}
            bind:propsString={propsString2}
            schema={accordionItemSchema}
        />
        <h4 class="mt-5">Props AccordioItem 3</h4>
        <PlaygroundForm
            bind:props={propsItem3}
            bind:propsString={propsString3}
            schema={accordionItemSchema}
        />
    </Flexbox>
    <PlaygroundCode slot="code" {template} {templateProps} />
</Playground>
