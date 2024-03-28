<script lang="ts">
    import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import Input from '$lib/components/Input/Input.svelte';
    import Text from '$lib/components/Text/Text.svelte';
    import Switch from '$lib/components/Switch/Switch.svelte';
    import Radio from '$lib/components/Radio/Radio.svelte';
    import Card from '$lib/components/Card/Card.svelte';
    import Button from '$lib/components/Button/Button.svelte';
    import Textarea from '$lib/components/Textarea/Textarea.svelte';
    import Select from '$lib/components/Select/Select.svelte';
    import InputRange from '$lib/components/InputRange/InputRange.svelte';

    import PlaygroundForm from '../../components/PlaygroundForm.svelte';
    import { Colors } from '$lib/constants.js';

    let groupOptions = ['opt1', 'opt2', 'opt3'];
    let selectOptions = groupOptions.map((o) => ({ label: o, value: o }));

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

    const propsConfig = {
        props: [
            {
                name: 'size',
                type: 'enum',
                values: ['small', 'medium', 'large'],
                default: 'medium'
            },
            {
                name: 'color',
                type: 'enum',
                values: Colors,
                default: 'primary'
            }
        ]
    };

    const sizesConfig: any = {
        small: {
            card: '2',
            label: '2',
            input: '1'
        },
        medium: {
            card: '3',
            label: '3',
            input: '2'
        },
        large: {
            card: '4',
            label: '4',
            input: '3'
        }
    };

    let props: any = {};

    $: size = sizesConfig[props.size];
    $: formDataJson = JSON.stringify(formData, null, 2);
    // $: console.log(props?.size, size);
</script>

<Text as="h2" size="6" weight="bold" class="mt-7 mb-3">Form config</Text>
<Card size="2">
    <Flexbox direction="column" alignItems="start" gap="3" class="pb-2">
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
                    <Text size={size?.label}>Input range</Text>
                    <InputRange
                        size={size?.input}
                        color={props.color}
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
                            <Flexbox as="label" gap="2" alignItems="center">
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
                    <Flexbox direction="column" gap="3">
                        {#each groupOptions as opt, i}
                            <Flexbox as="label" gap="2" alignItems="center">
                                <Checkbox
                                    size={size?.input}
                                    color={props.color}
                                    name="checkboxGroup"
                                    value={i}
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
                    <Flexbox as="label" gap="2" alignItems="center">
                        <Switch
                            size={size?.input}
                            color={props.color}
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
                <Flexbox as="label" gap="2" alignItems="center">
                    <Checkbox
                        size={size?.input}
                        color={props.color}
                        name="checkbox"
                        bind:checked={formData.checkbox}
                    />
                    <Text size="2">checkbox</Text>
                </Flexbox>
            </Flexbox>

            <!-- Buttons -->
            <Flexbox justify="end" class="mt-5" gap="3">
                <Button size={size?.input} color="blue" variant="outline">cancel</Button>
                <Button size={size?.input} color={props.color} type="submit">Submit</Button>
            </Flexbox>
        </Flexbox>
    </form>
</Card>
<!-- </DocBlocCode> -->

<!-- <Text as="h3" size="5" weight="bold" class="mt-7 mb-2"> -->
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
