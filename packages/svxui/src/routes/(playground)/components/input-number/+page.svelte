<script lang="ts">
    import InputNumber from '$lib/components/input-number/components/input-number.svelte';
    import { AllRadixColors, type InputNumberProps } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlNumber from '../../controls/ControlNumber.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    const props: InputNumberProps = $state({
        min: undefined,
        max: undefined,
        step: 1,
        decimals: undefined,
        color: undefined,
        variant: 'soft',
        size: '3',
        align: 'end',
        outline: false,
        fullWidth: false,
        multiple: false
    });

    let json = $derived(
        JSON.stringify(
            {
                props
            },
            null,
            2
        )
    );
</script>

<h1>InputNumber</h1>

<Playground>
    {#snippet controls()}
        <ControlNumber label="min" bind:value={props.min} />
        <ControlNumber label="max" bind:value={props.max} />
        <ControlNumber label="step" bind:value={props.step} />
        <ControlNumber label="decimals" bind:value={props.decimals} />
        <ControlSelect label="color" bind:value={props.color} options={AllRadixColors} />
        <ControlSelect label="size" bind:value={props.size} options={['1', '2', '3']} />
        <ControlSelect
            label="variant"
            bind:value={props.variant}
            options={['solid', 'soft', 'outline', 'clear']}
        />
        <ControlSelect label="align" bind:value={props.align} options={['start', 'center', 'end']} />

        <ControlCheckbox label="disabled" bind:checked={props.disabled} />
        <ControlCheckbox label="readonly" bind:checked={props.readonly} />
        <ControlCheckbox label="fullWidth" bind:checked={props.fullWidth} />
    {/snippet}

    <InputNumber {...props} />
</Playground>

<div><pre>{json}</pre></div>
