<script lang="ts">
    import { isObject } from '$lib/internals/is.js';
    import ControlButton from '../../controls/ControlButton.svelte';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';
    import SelectFloat from './SelectFloat.svelte';
    import type { SelectFloatProps } from './SelectFloat.types.js';

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

    let props: Omit<SelectFloatProps<any, boolean>, 'options'> = $state({
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
            props.value = [options[1], options[2]];
        } else {
            props.value = options[1];
        }
    };
</script>

<h1>SelectFloat</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="multiple" bind:checked={props.multiple} />
        <ControlCheckbox label="disabled" bind:checked={props.disabled} />
        <ControlSelect label="options type" bind:value={optionsType} options={['string', 'object']} />
        <ControlButton onclick={() => selectValue()}>select values (controlled)</ControlButton>
    {/snippet}

    <SelectFloat {...props} {options} bind:value={props.value}>
        <!-- {#snippet renderValue(value)}
            {#if Array.isArray(value)}
                {@const [item] = value}
                {#if item}
                    {@render renderOpt(item)}
                {:else}
                    Select
                {/if}
                {#if value.length > 1}
                    (+{value.length - 1})
                {/if}
            {:else}
                {@render renderOpt(value)}
            {/if}
        {/snippet} -->

        {#snippet renderOptionLabel(opt)}
            {@render renderOpt(opt)}
        {/snippet}
    </SelectFloat>
</Playground>

<div><pre>{json}</pre></div>

{#snippet renderOpt(opt: any)}
    {#if typeof opt === 'string'}
        {opt}
    {:else if isObject(opt)}
        <span>{(opt as (typeof optionsObject)[number]).key}</span>
        ({(opt as (typeof optionsObject)[number]).val})
    {/if}
{/snippet}

<!-- <h2>Select Pop</h2>
<SelectFloat options={optionsString} />
<SelectFloat options={optionsObject}>
    {#snippet renderValue(val)}
        Hello {val.key}
    {/snippet}

    {#snippet renderOptionLabel(opt)}
        {opt.key} ({opt.val})
    {/snippet}
</SelectFloat> -->
