<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { slide } from 'svelte/transition';
    import { AccordionGroup, Accordion, Button, Card, Flexbox, Text } from 'svxui';
    import { accordionGroupSchema, accordionSchema, template } from './schema.js';

    let itemSchema = {
        ...accordionSchema,
        props: accordionSchema.props.filter((p) => p.name !== 'id')
    };

    let propsGroup = $state({ multi: false, disabled: false });
    let propsString = $state('');

    let propsItem1 = $state({ expanded: false, disabled: false });
    let propsString1 = $state('');

    let propsItem2 = $state({ expanded: false, disabled: false });
    let propsString2 = $state('');

    let propsItem3 = $state({ expanded: false, disabled: false });
    let propsString3 = $state('');

    let templateProps = $derived([
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
    ]);
</script>

<PlaygroundWrapper forceColumn>
    {#snippet component()}
        <div style="min-width: 100%; min-height: 100%;">
            <AccordionGroup {...propsGroup}>
                <Card size="1" class="mb-3">
                    <Accordion {...propsItem1} value="tab1">
                        {#snippet trigger({ toggle, expanded, attrs })}
                            <Flexbox justify="between" align="center">
                                <Text disabled={propsItem1.disabled}>Accordion 1</Text>
                                <Button
                                    size="1"
                                    variant="soft"
                                    onclick={toggle}
                                    disabled={propsItem1.disabled}
                                    {...attrs}
                                >
                                    {expanded ? 'close' : 'open'}
                                </Button>
                            </Flexbox>
                        {/snippet}
                        {#snippet children({ toggle, expanded, attrs })}
                            <div transition:slide class="pt-3" {...attrs}>Content 1</div>
                        {/snippet}
                    </Accordion>
                </Card>
                <Card size="1" class="mb-3">
                    <Accordion {...propsItem2} value="tab2">
                        {#snippet trigger({ toggle, expanded, attrs })}
                            <Flexbox justify="between" align="center">
                                <Text disabled={propsItem2.disabled}>Accordion 2</Text>
                                <Button
                                    size="1"
                                    variant="soft"
                                    onclick={toggle}
                                    disabled={propsItem2.disabled}
                                    {...attrs}
                                >
                                    {expanded ? 'close' : 'open'}
                                </Button>
                            </Flexbox>
                        {/snippet}
                        {#snippet children({ toggle, expanded, attrs })}
                            <div transition:slide class="pt-3" {...attrs}>Content 2</div>
                        {/snippet}
                    </Accordion>
                </Card>
                <Card size="1" class="mb-3">
                    <Accordion {...propsItem3} value="tab3">
                        {#snippet trigger({ toggle, expanded, attrs })}
                            <Flexbox justify="between" align="center">
                                <Text disabled={propsItem3.disabled}>Accordion 3</Text>
                                <Button
                                    size="1"
                                    variant="soft"
                                    onclick={toggle}
                                    disabled={propsItem3.disabled}
                                    {...attrs}
                                >
                                    {expanded ? 'close' : 'open'}
                                </Button>
                            </Flexbox>
                        {/snippet}
                        {#snippet children({ toggle, expanded, attrs })}
                            <div transition:slide class="pt-3" {...attrs}>Content 3</div>
                        {/snippet}
                    </Accordion>
                </Card>
            </AccordionGroup>
        </div>
    {/snippet}
    {#snippet form()}
        <Flexbox direction="column" gap="1">
            <h4>Props AccordionGroup</h4>
            <PlaygroundForm bind:props={propsGroup} bind:propsString schema={accordionGroupSchema} />
            <h4 class="mt-5">Props AccordioItem 1</h4>
            <PlaygroundForm
                bind:props={propsItem1}
                bind:propsString={propsString1}
                schema={accordionSchema}
            />
            <h4 class="mt-5">Props AccordioItem 2</h4>
            <PlaygroundForm
                bind:props={propsItem2}
                bind:propsString={propsString2}
                schema={accordionSchema}
            />
            <h4 class="mt-5">Props AccordioItem 3</h4>
            <PlaygroundForm
                bind:props={propsItem3}
                bind:propsString={propsString3}
                schema={accordionSchema}
            />
        </Flexbox>
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
