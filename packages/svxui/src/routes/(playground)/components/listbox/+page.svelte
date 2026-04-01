<script lang="ts">
    import { Button, Flexbox, Listbox, Panel, type ListboxProps } from '$lib/index.js';
    import { isObject } from '$lib/internals/is.js';
    import ControlButton from '../../controls/ControlButton.svelte';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    const optionsString = ['opt1', 'opt2', 'opt3'];
    const optionsObject = [
        { key: 'opt1', val: 1 },
        { key: 'opt2', val: 2 },
        { key: 'opt3', val: 3 },
        { key: 'opt4', val: 4, disabled: true },
        { key: 'opt5', val: 5 }
    ];

    let isCardMode = $state(false);
    let optionsType: 'string' | 'object' = $state('string');
    let options = $derived(optionsType === 'string' ? optionsString : optionsObject);

    const props: ListboxProps<unknown, boolean> = $state({
        multiple: false,
        loop: false,
        activateOnFocus: false,
        disabled: false,
        value: undefined
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

<h1>ListBox</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="multiple" bind:checked={props.multiple} />
        <ControlCheckbox label="disabled" bind:checked={props.disabled} />
        <ControlCheckbox label="loop" bind:checked={props.loop} />
        <ControlCheckbox label="activateOnFocus" bind:checked={props.activateOnFocus} />
        <ControlCheckbox label="card mode" bind:checked={isCardMode} />
        <ControlSelect label="options type" bind:value={optionsType} options={['string', 'object']} />
        <ControlButton onclick={() => selectValue()}>select values (controlled)</ControlButton>
    {/snippet}

    <Listbox
        {...props}
        bind:value={props.value}
        onValueChange={(v) => {
            // eslint-disable-next-line no-console
            console.log(v);
        }}
    >
        {#snippet children(rootState)}
            <Panel variant="clear" outline size="2" style="width: 220px;">
                <Flexbox direction="column" gap="1" {...rootState.rootAttrs}>
                    {#each options as opt, i (i)}
                        {@const item = rootState.getItem(opt, {
                            disabled: isObject(opt) ? opt.disabled === true : false
                        })}

                        {#if isCardMode}
                            <Panel
                                as="button"
                                size="6"
                                variant={item.selected ? 'solid' : 'clear'}
                                {...item.attrs}
                            >
                                <Flexbox direction="column" align="start" gap="3">
                                    {#if typeof opt === 'string'}
                                        {opt}
                                    {:else if isObject(opt)}
                                        <div>{(opt as (typeof optionsObject)[number]).key}</div>
                                        <div>({(opt as (typeof optionsObject)[number]).val})</div>
                                    {/if}
                                </Flexbox>
                            </Panel>
                        {:else}
                            <Button {...item.attrs} variant={item.selected ? 'soft' : 'clear'} align="start">
                                {#if typeof opt === 'string'}
                                    {opt}
                                {:else if isObject(opt)}
                                    <span>{(opt as (typeof optionsObject)[number]).key}</span>
                                    ({(opt as (typeof optionsObject)[number]).val})
                                {/if}
                            </Button>
                        {/if}
                    {/each}
                </Flexbox>
            </Panel>
        {/snippet}
    </Listbox>
</Playground>

<div><pre>{json}</pre></div>
