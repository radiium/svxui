import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { defaultTabGroupProps, defaultTabPanelProps, defaultTabTriggerProps } from 'sveltr';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { AccordionGroup, AccordionItem, Card, Flexbox, Text, Button } from 'sveltr';
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
 * TabGroup
 */

export const tabGroupSchema: SchemaComponent = {
    extend: '',
    name: 'Tab Group',
    props: [
        {
            name: 'value',
            type: SchemaPropType.string,
            default: defaultTabGroupProps.value
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
 * TabTrigger
 */

export const tabTriggerSchema: SchemaComponent = {
    name: 'Tab trigger',
    props: [
        {
            name: 'value',
            type: SchemaPropType.string,
            default: defaultTabTriggerProps.value
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
 * TabContent
 */

export const tabContentSchema: SchemaComponent = {
    name: 'Tab content',
    props: [
        {
            name: 'value',
            type: SchemaPropType.string,
            default: defaultTabPanelProps.value
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
