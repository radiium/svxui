<script lang="ts">
    import { AccordionGroup, AccordionItem, Button, Card, Flexbox, Text } from '$lib/index.js';
    import { slide } from 'svelte/transition';
    import Details from './Details.svelte';
    import Section from './Section.svelte';

    const accordionsH = [
        {
            value: 'tab1',
            label: 'Accordion 1',
            content: 'Accordion 1 content',
            disabled: false,
            expanded: false
        },
        {
            value: 'tab2',
            label: 'Accordion 2',
            content: 'Accordion 2 content',
            disabled: false,
            expanded: false
        },
        {
            value: 'tab3',
            label: 'Accordion 3',
            content: 'Accordion 3 content',
            disabled: true,
            expanded: false
        }
    ];

    const accordionsV = structuredClone(accordionsH);
</script>

<Details>
    <h2 slot="title">Accordion</h2>

    <Section>
        <h3 slot="title">Horizontal</h3>

        <AccordionGroup>
            <Flexbox gap="2" direction="column">
                {#each accordionsH as { expanded, label, content, disabled }}
                    <Card size="1" class="width-400px max-width-300px">
                        <AccordionItem bind:expanded bind:disabled>
                            <Flexbox
                                slot="header"
                                let:toggle
                                let:expanded
                                let:disabled
                                justify="between"
                                align="center"
                            >
                                <Text {disabled}>{label}</Text>
                                <Button size="1" variant="soft" on:click={toggle} {disabled}>
                                    {expanded ? 'close' : 'open'}
                                </Button>
                            </Flexbox>
                            <div transition:slide class="pt-3">{content}</div>
                        </AccordionItem>
                    </Card>
                {/each}
            </Flexbox>
        </AccordionGroup>
    </Section>

    <Section>
        <h3 slot="title">Vertical</h3>

        <AccordionGroup>
            <Flexbox gap="2" class="width-max">
                {#each accordionsV as { expanded, label, content, disabled }}
                    <Card size="1" class=" height-200px flex-shrink-0">
                        <Flexbox gap="2" class="height-100">
                            <AccordionItem bind:expanded bind:disabled>
                                <Flexbox
                                    slot="header"
                                    let:toggle
                                    let:expanded
                                    let:disabled
                                    justify="between"
                                    align="center"
                                    direction="column"
                                    class="height-100"
                                >
                                    <Text {disabled}>{label}</Text>
                                    <Button size="1" variant="soft" on:click={toggle} {disabled}>
                                        {expanded ? 'close' : 'open'}
                                    </Button>
                                </Flexbox>
                                <div transition:slide={{ axis: 'x' }} class="pl-3">
                                    <Card variant="outline" class="width-200px height-100 height-9">
                                        <Flexbox align="center" justify="center" class="height-100">
                                            {content}
                                        </Flexbox>
                                    </Card>
                                </div>
                            </AccordionItem>
                        </Flexbox>
                    </Card>
                {/each}
            </Flexbox>
        </AccordionGroup>
    </Section>
</Details>
