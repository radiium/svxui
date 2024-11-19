<script lang="ts">
    import InputRange from '$lib/components/input-range/components/input-range.svelte';
    import Text from '$lib/components/text/components/text.svelte';
    import AlignCenterIcon from '$lib/icons/AlignCenter.svelte';
    import AlignLeftIcon from '$lib/icons/AlignLeft.svelte';
    import AlignRightIcon from '$lib/icons/AlignRight.svelte';
    import PlusIcon from '$lib/icons/Plus.svelte';
    import {
        Button,
        Checkbox,
        Colors,
        Flexbox,
        Input,
        InputGroup,
        InputGroupItem,
        Radio,
        Select,
        Sizes1To3,
        Switch
    } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';

    const sizes = Sizes1To3;
    const colors = Colors;
    const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
</script>

<Details>
    {#snippet title()}
        <h2>InputGroup</h2>
    {/snippet}

    <Section>
        {#snippet title()}
            <h3>Text + Input</h3>
        {/snippet}

        <Flexbox direction="column" align="start" gap="3">
            {#each colors as color}
                <InputGroup>
                    <InputGroupItem {color} class="px-3">
                        <Text {color}>Label</Text>
                    </InputGroupItem>
                    <Input {color} />
                </InputGroup>
            {/each}
        </Flexbox>
    </Section>

    <Section>
        {#snippet title()}
            <h3>All controls</h3>
        {/snippet}

        <Flexbox direction="column" align="start" gap="3">
            {#each sizes as size}
                <InputGroup>
                    <InputGroupItem color="primary" class="px-3">
                        <Text {size}>Label</Text>
                    </InputGroupItem>
                    <Button variant="soft" color="primary" {size}>button</Button>
                    <Input color="primary" {size} />
                    <Select color="primary" {size} {options} />
                    <InputRange color="primary" {size} />
                    <InputGroupItem color="primary" class="px-3">
                        <Radio color="primary" {size} />
                    </InputGroupItem>
                    <InputGroupItem color="primary" class="px-3">
                        <Checkbox color="primary" {size} />
                    </InputGroupItem>
                    <InputGroupItem color="primary" class="px-3">
                        <Switch color="primary" {size} />
                    </InputGroupItem>
                </InputGroup>
            {/each}
        </Flexbox>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Button icon only</h3>
        {/snippet}

        <Flexbox direction="column" align="start" gap="3">
            {#each sizes as size}
                <InputGroup>
                    <Button variant="clear" {size} iconOnly active>
                        <AlignLeftIcon />
                    </Button>
                    <Button variant="clear" {size} iconOnly>
                        <AlignCenterIcon />
                    </Button>
                    <Button variant="clear" {size} iconOnly>
                        <AlignRightIcon />
                    </Button>
                </InputGroup>
            {/each}
        </Flexbox>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Input + Select</h3>
        {/snippet}

        <Flexbox direction="column" align="start" gap="3">
            <InputGroup>
                <Input readonly value="test" />
                <Input />
                <Select {options} />
            </InputGroup>

            <InputGroup>
                <Button variant="soft">button</Button>
                <Select {options} />
            </InputGroup>

            <InputGroup class="width-100">
                <Button variant="soft" iconOnly>+</Button>
                <Select {options} class="flex-grow-1" />
                <Button variant="soft">button</Button>
            </InputGroup>
        </Flexbox>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Button + Input</h3>
        {/snippet}

        <Flexbox direction="column" align="start" gap="3">
            <InputGroup>
                <Button variant="soft">button</Button>
                <Input />
            </InputGroup>

            <InputGroup>
                <Input />
                <Button variant="soft">button</Button>
            </InputGroup>

            <InputGroup>
                <Button variant="soft">button</Button>
                <Input />
                <Button variant="soft">button</Button>
            </InputGroup>

            <InputGroup>
                <Input />
                <Button variant="soft">button</Button>
                <Input />
            </InputGroup>

            <InputGroup>
                <Button variant="soft">button</Button>
                <Button variant="soft">button</Button>
                <Input />
            </InputGroup>
        </Flexbox>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Button icon + Input</h3>
        {/snippet}

        <Flexbox direction="column" align="start" gap="3">
            <InputGroup>
                <Button variant="soft" iconOnly>
                    <PlusIcon />
                </Button>
                <Input />
            </InputGroup>

            <InputGroup>
                <Input />
                <Button variant="soft" iconOnly>
                    <PlusIcon />
                </Button>
            </InputGroup>

            <InputGroup>
                <Input />
                <Button variant="soft" iconOnly>@</Button>
                <Input />
            </InputGroup>

            <InputGroup>
                <Button variant="soft" iconOnly>$</Button>
                <Input />
                <Button variant="soft" iconOnly>
                    <PlusIcon />
                </Button>
            </InputGroup>
            <InputGroup>
                <Button variant="soft" iconOnly>$</Button>
                <Button variant="clear" iconOnly>%</Button>
                <Button variant="clear" iconOnly>
                    <PlusIcon />
                </Button>
                <Input />
            </InputGroup>
        </Flexbox>
    </Section>
</Details>
