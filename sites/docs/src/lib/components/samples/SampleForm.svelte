<script lang="ts">
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { SchemaPropType, type SchemaComponent } from '$lib/doc.types';
    import type { ComponentProps } from 'svelte';
    import {
        Button,
        Card,
        Checkbox,
        ColorPrimary,
        Colors,
        Flexbox,
        Input,
        InputRange,
        Radio,
        Radius,
        RadiusNone,
        Select,
        Switch,
        Text,
        Textarea
    } from 'svxui';

    type SizesConfig = {
        [key: string]: {
            card: ComponentProps<Card>['size'];
            label: ComponentProps<Text>['size'];
            input: ComponentProps<Input>['size'];
        };
    };

    let groupOptions = ['opt1', 'opt2', 'opt3'];
    let selectOptions = ['opt1', 'opt2', 'opt3'];

    let formData = {
        text: undefined,
        textarea: undefined,
        inputNumber: undefined,
        inputRange: undefined,
        select: undefined,
        date: undefined,
        radioGroup: undefined,
        checkboxGroup: [],
        switch: true,
        checkbox: true
    };

    const propsConfig: SchemaComponent = {
        props: [
            {
                name: 'size',
                type: SchemaPropType.enum,
                values: ['s', 'm', 'l'],
                default: 'm'
            },
            {
                name: 'radius',
                type: SchemaPropType.enum,
                values: Radius,
                default: RadiusNone
            },
            {
                name: 'color',
                type: SchemaPropType.enum,
                values: Colors,
                default: ColorPrimary
            }
        ],
        slots: [],
        events: []
    };

    const sizesConfig: SizesConfig = {
        s: {
            card: '2',
            label: '2',
            input: '1'
        },
        m: {
            card: '3',
            label: '3',
            input: '2'
        },
        l: {
            card: '4',
            label: '4',
            input: '3'
        }
    };

    let props = {
        size: propsConfig.props[0].default as keyof typeof sizesConfig,
        radius: propsConfig.props[1].default as (typeof Radius)[number],
        color: propsConfig.props[2].default as (typeof Colors)[number]
    };

    $: size = sizesConfig[props.size];
    $: formDataJson = JSON.stringify(formData, null, 2);
</script>

<Text as="h2" size="6" weight="bold" class="mt-7 mb-3">Form config</Text>
<Card size="2">
    <Flexbox direction="column" align="start" gap="3" class="pb-2">
        <PlaygroundForm bind:props schema={propsConfig} />
    </Flexbox>
</Card>

<Text as="h2" size="6" weight="bold" class="mt-7 mb-3">Form sample</Text>
<Card size={size?.card}>
    <form>
        <Flexbox direction="column" gap="4">
            <!--  Input text -->
            <Flexbox direction="column" gap="2">
                <Text size={size?.label}>Text</Text>
                <Input
                    size={size?.input}
                    color={props.color}
                    radius={props.radius}
                    type="text"
                    name="text"
                    placeholder="text"
                    fullWidth
                    bind:value={formData.text}
                />
            </Flexbox>

            <div class="row">
                <!-- Input number -->
                <Flexbox direction="column" gap="2" grow="1">
                    <Text size={size?.label}>Input number</Text>
                    <Input
                        size={size?.input}
                        color={props.color}
                        radius={props.radius}
                        min="0"
                        max="100"
                        step="10"
                        fullWidth
                        type="number"
                        placeholder="count"
                        name="inputNumber"
                        bind:value={formData.inputNumber}
                    />
                </Flexbox>
                <!-- Input date -->
                <Flexbox direction="column" gap="2" grow="1">
                    <Text size={size?.label}>Date</Text>
                    <Input
                        size={size?.input}
                        color={props.color}
                        radius={props.radius}
                        type="date"
                        placeholder="date"
                        fullWidth
                        bind:value={formData.date}
                    />
                </Flexbox>
            </div>

            <div class="row">
                <!-- Input range -->
                <Flexbox direction="column" gap="2" grow="1">
                    <Text size={size?.label}>Input range: {formData.inputRange ?? 50}</Text>
                    <InputRange
                        size={size?.input}
                        color={props.color}
                        radius={props.radius}
                        name="inputRange"
                        bind:value={formData.inputRange}
                    />
                </Flexbox>

                <!-- Input select -->
                <Flexbox direction="column" gap="2" grow="1">
                    <Text size={size?.label}>Input select</Text>
                    <Select
                        size={size?.input}
                        color={props.color}
                        radius={props.radius}
                        name="select"
                        options={selectOptions}
                        bind:value={formData.select}
                    />
                </Flexbox>
            </div>

            <!-- Textarea -->
            <Flexbox direction="column" gap="2">
                <Text size={size?.label}>Textarea</Text>
                <Textarea
                    size={size?.input}
                    color={props.color}
                    radius={props.radius}
                    rows={8}
                    fullWidth
                    name="textarea"
                    placeholder="textarea"
                    bind:value={formData.textarea}
                />
            </Flexbox>

            <div class="row">
                <!-- Input radio group -->
                <Flexbox direction="column" gap="2" grow="1">
                    <Text size={size?.label}>Radio group</Text>
                    <Flexbox direction="column" gap="2">
                        {#each groupOptions as opt}
                            <Flexbox as="label" gap="2" align="center">
                                <Radio
                                    size={size?.input}
                                    color={props.color}
                                    name="radioGroup"
                                    bind:group={formData.radioGroup}
                                    value={opt}
                                />
                                <Text size="2">{opt}</Text>
                            </Flexbox>
                        {/each}
                    </Flexbox>
                </Flexbox>

                <!-- Input checkbox group -->
                <Flexbox direction="column" gap="2" grow="1">
                    <Text size={size?.label}>Checkbox group</Text>
                    <Flexbox direction="column" gap="2">
                        {#each groupOptions as opt, i}
                            <Flexbox as="label" gap="2" align="center">
                                <Checkbox
                                    size={size?.input}
                                    color={props.color}
                                    radius={props.radius}
                                    name="checkboxGroup"
                                    value={opt}
                                    bind:group={formData.checkboxGroup}
                                />
                                <Text size="2">{opt}</Text>
                            </Flexbox>
                        {/each}
                    </Flexbox>
                </Flexbox>
            </div>

            <div class="row">
                <!-- Input switch -->
                <Flexbox direction="column" gap="2" grow="1">
                    <Text size={size?.label}>Switch option</Text>
                    <Flexbox as="label" gap="2" align="center">
                        <Switch
                            size={size?.input}
                            color={props.color}
                            radius={props.radius}
                            name="switch"
                            bind:checked={formData.switch}
                        />
                        <Text size="2">switch</Text>
                    </Flexbox>
                </Flexbox>
            </div>
            <!-- Input checkbox -->
            <Flexbox direction="column" gap="2" grow="1">
                <Text size={size?.label}>Checkbox option</Text>
                <Flexbox as="label" gap="2" align="center">
                    <Checkbox
                        size={size?.input}
                        color={props.color}
                        radius={props.radius}
                        name="checkbox"
                        bind:checked={formData.checkbox}
                    />
                    <Text size="2">checkbox</Text>
                </Flexbox>
            </Flexbox>

            <!-- Buttons -->
            <Flexbox justify="end" class="mt-5" gap="3">
                <Button size={size?.input} radius={props.radius} color="red" variant="outline">cancel</Button>
                <Button size={size?.input} radius={props.radius} color="green" type="submit">Submit</Button>
            </Flexbox>
        </Flexbox>
    </form>
</Card>

<Text as="h2" size="6" weight="bold" class="mt-7 mb-3">Form data</Text>
<Card>
    <pre><code>{formDataJson}</code></pre>
</Card>

<style lang="scss">
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: var(--space-5);
    }
</style>
