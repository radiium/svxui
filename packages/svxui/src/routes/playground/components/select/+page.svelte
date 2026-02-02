<script lang="ts">
    import { Select, type SelectProps } from '$lib/index.js';
    import ControlButton from '../../controls/ControlButton.svelte';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    let optionsString = ['opt1', 'opt2', 'opt3'];
    let optionsObject = [
        { key: 'opt1', val: 1 },
        { key: 'opt2', val: 2 },
        { key: 'opt3', val: 3 },
        { key: 'opt4', val: 4, disabled: true },
        { key: 'opt5', val: 5 }
    ];

    let optionsType: 'string' | 'object' = $state('string');
    let options = $derived(optionsType === 'string' ? optionsString : optionsObject);

    let props: Omit<SelectProps<(typeof options)[number]>, 'options'> = $state({
        color: undefined,
        size: '2',
        value: undefined,
        multiple: false,
        disabled: false
    });

    let json = $derived(
        JSON.stringify(
            {
                valueType: typeof props.value,
                optionsType,
                props
            },
            null,
            2
        )
    );

    const selectValue = (): void => {
        if (props.multiple) {
            props.value = optionsType === 'string' ? ['opt1', 'opt2'] : [1, 2];
        } else {
            props.value = optionsType === 'string' ? 'opt2' : 2;
        }
    };
</script>

<h1>Select</h1>

<Playground>
    {#snippet controls()}
        <ControlSelect
            label="color"
            bind:value={props.color}
            options={['neutral', 'blue', 'green', 'yellow', 'orange', 'red']}
        />
        <ControlSelect label="size" bind:value={props.size} options={['1', '2', '3']} />
        <ControlCheckbox label="multiple" bind:checked={props.multiple} />
        <ControlCheckbox label="disabled" bind:checked={props.disabled} />
        <ControlSelect label="options type" bind:value={optionsType} options={['string', 'object']} />
        <ControlButton onclick={() => selectValue()}>select values (controlled)</ControlButton>
    {/snippet}

    <Select {...props} optionLabel="key" optionValue="val" {options} bind:value={props.value} />
</Playground>

<div><pre>{json}</pre></div>
