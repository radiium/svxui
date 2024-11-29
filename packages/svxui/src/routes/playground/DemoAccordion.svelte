<script lang="ts">
    import { AccordionGroup, Accordion, Button, Card, Flexbox, Text, Separator } from '$lib/index.js';
    import { slide } from 'svelte/transition';
    import Details from './Details.svelte';
    import Section from './Section.svelte';

    type Item = {
        value: string;
        label: string;
        content: string;
        disabled: boolean;
        expanded?: boolean;
    };

    const items = $state<Item[]>([
        {
            value: 'accordion1',
            label: 'Accordion 1',
            content: 'Accordion 1 content',
            disabled: false,
            expanded: true
        },
        {
            value: 'accordion2',
            label: 'Accordion 2',
            content: 'Accordion 2 content',
            disabled: false
        },
        {
            value: 'accordion3',
            label: 'Accordion 3',
            content: 'Accordion 3 content',
            disabled: true
        }
    ]);

    let valueH = $state<string | string[] | undefined>();
    let multiH = $state(true);
    const itemsH = $state(structuredClone($state.snapshot(items)));

    let valueV = $state<string | string[] | undefined>();
    let multiV = $state(false);
    const itemsV = $state(structuredClone($state.snapshot(items)));
</script>

{#snippet itemControl(
    index: number,
    multi: boolean,
    items: Item[],
    value: string | string[] | undefined,
    setValue: (value: string | string[] | undefined) => void
)}
    {@const item = items[index]!}
    {@const opened = multi ? (value ?? []).includes(item.value) : value === item.value}

    <Flexbox gap="3" align="center" class="mb-3">
        <Text>{item.value}</Text>
        <Button
            variant="soft"
            disabled={item.disabled}
            onclick={() => {
                if (!item.disabled) {
                    if (opened) {
                        setValue(
                            multi && (value === undefined || Array.isArray(value))
                                ? (value ?? []).filter((value: string) => value !== item.value)
                                : undefined
                        );
                    } else {
                        setValue(multi ? [...(value ?? []), item.value] : item.value);
                    }
                }
            }}
        >
            {#if opened}
                Close
            {:else}
                Open
            {/if}
        </Button>

        <Button
            variant="soft"
            onclick={() => {
                item.disabled = !item.disabled;
            }}
        >
            {#if item.disabled}
                Enable
            {:else}
                Disable
            {/if}
        </Button>
    </Flexbox>
{/snippet}

{#snippet groupControl(
    multi: boolean,
    items: Item[],
    setMulti: (multi: boolean) => void,
    setValue: (value: string | string[] | undefined) => void
)}
    <Flexbox gap="3" class="mb-5">
        {#if multi}
            <Button
                variant="soft"
                onclick={() =>
                    setValue(
                        items.reduce<string[]>(
                            (value, item) => (item.disabled ? value : [...value, item.value]),
                            []
                        )
                    )}>Open all</Button
            >
            <Button variant="soft" onclick={() => (valueH = [])}>Close all</Button>
        {/if}
        <Button variant="soft" onclick={() => setMulti(!multi)}>Toggle multi: {multi}</Button>
    </Flexbox>
{/snippet}

<Details>
    {#snippet title()}
        <h2>Accordion</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Vertical</h3>
        {/snippet}

        <Flexbox gap="3" class="mb-5">
            <Text>Value:</Text>
            <Text color="green">{JSON.stringify(valueH)}</Text>
        </Flexbox>
        {@render itemControl(0, multiH, itemsH, valueH, (val) => (valueH = val))}
        {@render itemControl(1, multiH, itemsH, valueH, (val) => (valueH = val))}
        {@render itemControl(2, multiH, itemsH, valueH, (val) => (valueH = val))}
        {@render groupControl(
            multiH,
            itemsH,
            (multi) => (multiH = multi),
            (val) => (valueH = val)
        )}

        <Separator size="4" class="mb-5" />

        <AccordionGroup multi={multiH} bind:value={valueH}>
            <Card size="0" variant="outline">
                <Flexbox direction="column">
                    {#each itemsH as { value, label, content, disabled, expanded }, i}
                        <div>
                            <Accordion {value} {disabled} {expanded}>
                                {#snippet trigger({ expanded, attrs, toggle })}
                                    <Flexbox justify="between" align="center" class="p-4">
                                        <Text {disabled}>{label}</Text>
                                        <Button
                                            size="1"
                                            variant="soft"
                                            {disabled}
                                            {...attrs}
                                            onclick={toggle}
                                        >
                                            {expanded ? 'close' : 'open'}
                                        </Button>
                                    </Flexbox>
                                {/snippet}
                                {#snippet children({ attrs })}
                                    <div transition:slide={{ duration: 150 }} class="p-4" {...attrs}>
                                        {content}
                                    </div>
                                {/snippet}
                            </Accordion>
                        </div>
                        {#if i < itemsH.length - 1}
                            <Separator size="4" />
                        {/if}
                    {/each}
                </Flexbox>
            </Card>
        </AccordionGroup>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Horizontal</h3>
        {/snippet}

        <Flexbox gap="3" class="mb-5">
            <Text>Value:</Text>
            <Text color="green">{JSON.stringify(valueV)}</Text>
        </Flexbox>
        {@render itemControl(0, multiV, itemsV, valueV, (val) => (valueV = val))}
        {@render itemControl(1, multiV, itemsV, valueV, (val) => (valueV = val))}
        {@render itemControl(2, multiV, itemsV, valueV, (val) => (valueV = val))}
        {@render groupControl(
            multiV,
            itemsV,
            (multi) => (multiV = multi),
            (val) => (valueV = val)
        )}
        <Separator size="4" class="mb-5" />

        <AccordionGroup multi={multiV} bind:value={valueV}>
            <Flexbox gap="2" class="width-max">
                {#each itemsV as { value, label, content, disabled }, i}
                    <Card size="1" class=" height-200px flex-shrink-0">
                        <Flexbox gap="2" class="height-100">
                            <Accordion {value} {disabled}>
                                {#snippet trigger({ expanded, attrs, toggle })}
                                    <Flexbox
                                        justify="between"
                                        align="center"
                                        direction="column"
                                        class="height-100"
                                    >
                                        <Text {disabled}>{label}</Text>
                                        <Button
                                            size="1"
                                            variant="soft"
                                            {disabled}
                                            {...attrs}
                                            onclick={toggle}
                                        >
                                            {expanded ? 'close' : 'open'}
                                        </Button>
                                    </Flexbox>
                                {/snippet}
                                <div transition:slide={{ axis: 'x' }} class="pl-3">
                                    <Card variant="outline" class="width-200px height-100 height-9">
                                        <Flexbox align="center" justify="center" class="height-100">
                                            {content}
                                        </Flexbox>
                                    </Card>
                                </div>
                            </Accordion>
                        </Flexbox>
                    </Card>
                {/each}
            </Flexbox>
        </AccordionGroup>
    </Section>
</Details>
