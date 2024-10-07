<script lang="ts">
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import Text from '$lib/components/Text/Text.svelte';
    import AlignCenterIcon from '$lib/icons/AlignCenter.svelte';
    import AlignLeftIcon from '$lib/icons/AlignLeft.svelte';
    import AlignRightIcon from '$lib/icons/AlignRight.svelte';
    import PlusIcon from '$lib/icons/Plus.svelte';
    import { Button, Input, InputGroup, Select, Sizes1To3 } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    const sizes = Sizes1To3;
    const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
</script>

<Details>
    <h2 slot="title">InputGroup</h2>

    <Section>
        <h3 slot="title">Button + Text</h3>

        <Flexbox direction="column" align="start" gap="3">
            {#each sizes as size}
                <InputGroup>
                    <Flexbox align="center" justify="center" class="px-3">
                        <Text {size}>Label</Text>
                    </Flexbox>
                    <Button variant="soft" color="primary" {size} active>one</Button>
                    <Button variant="soft" color="primary" {size}>two</Button>
                    <Button variant="soft" color="primary" {size}>three</Button>
                </InputGroup>
            {/each}
        </Flexbox>
    </Section>

    <Section>
        <h3 slot="title">Button icon only</h3>

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
        <h3 slot="title">Input + Select</h3>

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
        <h3 slot="title">Button + Input</h3>

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
        <h3 slot="title">Button icon + Input</h3>

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
