import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { defaultAccordionGroupProps, defaultAccordionProps } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { AccordionGroup, AccordionItem, Card, Flexbox, Text, Button } from 'svxui';
    import { slide } from 'svelte/transition';
</script>

<AccordionGroup:props>
    <Card size="1" class="mb-3">
        <Accordion value="tab1":props1>
            {#snippet trigger({ toggle, expanded, attrs })}
                <Flexbox justify="between" align="center">
                    <Text>Accordion {i}</Text>
                    <Button size="1" variant="soft" onclick={toggle} {...attrs}>
                        {expanded ? 'close' : 'open'}
                    </Button>
                </Flexbox>
            {/snippet}
            {#snippet children({ toggle, expanded, attrs })}
                <div transition:slide class="pt-3" {...attrs}>Content {i}</div>
            {/snippet}
        </Accordion>
    </Card>

    <Card size="1" class="mb-3">
        <Accordion  value="tab2":props2>
            {#snippet trigger({ toggle, expanded, attrs })}
                <Flexbox justify="between" align="center">
                    <Text>Accordion {i}</Text>
                    <Button size="1" variant="soft" onclick={toggle} {...attrs}>
                        {expanded ? 'close' : 'open'}
                    </Button>
                </Flexbox>
            {/snippet}
            {#snippet children({ toggle, expanded, attrs })}
                <div transition:slide class="pt-3" {...attrs}>Content {i}</div>
            {/snippet}
        </Accordion>
    </Card>

    <Card size="1" class="mb-3">
        <Accordion value="tab3":props3>
            {#snippet trigger({ toggle, expanded, attrs })}
                <Flexbox justify="between" align="center">
                    <Text>Accordion {i}</Text>
                    <Button size="1" variant="soft" onclick={toggle} {...attrs}>
                        {expanded ? 'close' : 'open'}
                    </Button>
                </Flexbox>
            {/snippet}
            {#snippet children({ toggle, expanded, attrs })}
                <div transition:slide class="pt-3" {...attrs}>Content {i}</div>
            {/snippet}
        </Accordion>
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
            name: 'value',
            type: SchemaPropType.custom,
            typeCustom: 'string | string[] | undefined',
            default: defaultAccordionGroupProps.value,
            bindable: true
        },
        {
            name: 'onValueChange',
            type: SchemaPropType.custom,
            typeCustom: '(value: string | string[] | undefined) => void',
            default: defaultAccordionGroupProps.onValueChange
        },
        {
            name: 'multi',
            type: SchemaPropType.boolean,
            default: defaultAccordionGroupProps.multi
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultAccordionGroupProps.disabled
        }
    ],
    snippets: [
        {
            name: 'default'
        }
    ],
    events: []
};

/**
 * PropsAccordion
 */

export const accordionSchema: SchemaComponent = {
    name: 'Accordion Item',
    props: [
        {
            name: 'value',
            type: SchemaPropType.string,
            default: defaultAccordionProps.value
        },
        {
            name: 'expanded',
            type: SchemaPropType.boolean,
            default: defaultAccordionProps.expanded
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultAccordionProps.disabled
        }
    ],
    snippets: [
        {
            name: 'trigger',
            description: 'Header of accordion',
            props: [
                {
                    name: 'expanded',
                    type: SchemaPropType.boolean
                },
                {
                    name: 'attrs',
                    type: SchemaPropType.custom,
                    typeCustom: 'Record<string, any>'
                },
                {
                    name: 'toggle',
                    type: SchemaPropType.custom,
                    typeCustom: '() => void'
                }
            ]
        },
        {
            name: 'children',
            props: [
                {
                    name: 'expanded',
                    type: SchemaPropType.boolean
                },
                {
                    name: 'attrs',
                    type: SchemaPropType.custom,
                    typeCustom: 'Record<string, any>'
                },
                {
                    name: 'toggle',
                    type: SchemaPropType.custom,
                    typeCustom: '() => void'
                }
            ]
        }
    ],
    events: []
};
