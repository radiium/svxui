<script lang="ts">
    import SelectOptgroup from '$lib/components/select/components/select-optgroup.svelte';
    import SelectOption from '$lib/components/select/components/select-option.svelte';
    import { AllRadixColors, Select, type SelectProps } from '$lib/index.js';
    import ControlButton from '../../controls/ControlButton.svelte';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    const optionsString = [
        { label: 'group1', options: ['opt1', 'opt2', 'opt3'] },
        { label: 'group2', options: ['opt4', 'opt5', 'opt6'] }
    ];
    const optionsObject = [
        {
            label: 'group1',
            options: [
                { key: 'opt1', val: 1 },
                { key: 'opt2', val: 2 },
                { key: 'opt3', val: 3 }
            ]
        },
        {
            label: 'group2',
            options: [
                { key: 'opt4', val: 4, disabled: true },
                { key: 'opt5', val: 5 },
                { key: 'opt6', val: 6 }
            ]
        }
    ];

    let optionsType: 'string' | 'object' = $state('string');
    let withOptgroup: boolean = $state(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: Omit<SelectProps<any, boolean>, 'options'> = $state({
        color: undefined,
        size: '2',
        value: undefined,
        multiple: false,
        fullWidth: false,
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
        <ControlSelect label="color" bind:value={props.color} options={AllRadixColors} />
        <ControlSelect label="size" bind:value={props.size} options={['1', '2', '3']} />
        <ControlCheckbox label="multiple" bind:checked={props.multiple} />
        <ControlCheckbox label="fullWidth" bind:checked={props.fullWidth} />
        <ControlCheckbox label="disabled" bind:checked={props.disabled} />
        <ControlCheckbox label="withOptgroup" bind:checked={withOptgroup} />
        <ControlSelect label="options type" bind:value={optionsType} options={['string', 'object']} />
        <ControlButton onclick={() => selectValue()}>select values (controlled)</ControlButton>
    {/snippet}
    {#if optionsType === 'string'}
        <Select {...props} bind:value={props.value}>
            {#each optionsString as group (group.label)}
                <SelectOptgroup label={group.label}>
                    {#each group.options as opt (opt)}
                        <SelectOption value={opt}>{opt}</SelectOption>
                    {/each}
                </SelectOptgroup>
            {/each}
        </Select>
    {:else if optionsType === 'object'}
        <Select {...props} bind:value={props.value}>
            {#each optionsObject as group (group.label)}
                <SelectOptgroup label={group.label}>
                    {#each group.options as opt (opt.key)}
                        <SelectOption value={opt.val} disabled={opt.disabled}>{opt.key}</SelectOption>
                    {/each}
                </SelectOptgroup>
            {/each}
        </Select>
    {/if}
</Playground>

<div><pre>{json}</pre></div>
