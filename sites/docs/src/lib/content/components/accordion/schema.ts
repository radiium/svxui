import { defaultAccordionGroupProps, defaultAccordionItemProps } from 'svxui';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { AccordionGroup, AccordionItem, Card, Flexbox, Text, Button } from 'svxui';
    import { slide } from 'svelte/transition';

    let state = [false, false, false];
</script>

<AccordionGroup:props>
    <Card size="1" class="mb-3">
        <AccordionItem {...propsItem1} bind:expanded={state[0]}>
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
        <AccordionItem {...propsItem2} bind:expanded={state[1]}>
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
        <AccordionItem {...propsItem3} bind:expanded={state[2]}>
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
`;

/**
 * AccordionGroup
 */

export const accordionGroupSchema: SchemaComponent = {
    extend: '',
    name: 'Accordion Group',
    props: [
        {
            name: 'multi',
            type: SchemaPropType.boolean,
            default: defaultAccordionGroupProps.multi
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};

/**
 * PropsAccordionItem
 */

export const accordionItemSchema: SchemaComponent = {
    name: 'Accordion Item',
    props: [
        {
            name: 'id',
            type: SchemaPropType.string,
            default: defaultAccordionItemProps.id
        },
        {
            name: 'expanded',
            type: SchemaPropType.boolean,
            default: defaultAccordionItemProps.expanded
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultAccordionItemProps.disabled
        }
    ],
    slots: [
        {
            name: 'header',
            description: 'Header of accordion',
            props: [
                {
                    name: 'expanded',
                    type: SchemaPropType.boolean
                },
                {
                    name: 'disabled',
                    type: SchemaPropType.boolean
                },
                {
                    name: 'toggle',
                    type: 'function'
                }
            ]
        },
        {
            name: 'default',
            props: [
                {
                    name: 'expanded',
                    type: SchemaPropType.boolean
                },
                {
                    name: 'disabled',
                    type: SchemaPropType.boolean
                },
                {
                    name: 'toggle',
                    type: 'function'
                }
            ]
        }
    ],
    events: []
};
