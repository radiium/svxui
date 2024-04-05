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
    import InputGroup from '$lib/components/InputGroup/InputGroup.svelte';
    import InputNumber from '$lib/components/InputNumber/InputNumber.svelte';
    import Badge from '$lib/components/Badge/Badge.svelte';

    let groupOptions = ['opt1', 'opt2', 'opt3'];
    let selectOptions = groupOptions.map((o) => ({ label: o, value: o }));
</script>

<Text as="h2" size="6" weight="bold" class="mt-7 mb-3">Test focus overflow</Text>
<Flexbox direction="column" gap="3" alignItems="start">
    <article>
        <Button>button</Button>
    </article>
    <article>
        <Input />
    </article>
    <article>
        <Textarea />
    </article>
    <article>
        <InputRange />
    </article>
    <article>
        <InputNumber />
    </article>
    <article>
        <Radio />
    </article>
    <article>
        <Checkbox />
    </article>
    <article>
        <Switch />
    </article>
    <article>
        <Select options={selectOptions} />
    </article>
    <article>
        <Card asButton>
            Card button
        </Card>
    </article>

    <article>
        <Badge>Badge</Badge>
    </article>
</Flexbox>

<style lang="scss">
    article {
        border: 20px solid var(--slate-4);
        display: flex;
    }
</style>
