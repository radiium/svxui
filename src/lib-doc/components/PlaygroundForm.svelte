<script lang="ts">
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import InputNumber from '$lib/components/InputNumber/InputNumber.svelte';
    import Input from '$lib/components/Input/Input.svelte';
    import Switch from '$lib/components/Switch/Switch.svelte';
    import Button from '$lib/components/Button/Button.svelte';
    import Text from '$lib/components/Text/Text.svelte';
    import { onMount } from 'svelte';

    export let schema: any = {
        props: [],
        slots: [],
        events: []
    };
    export let propsString = '';
    export let props = {};
    export let onChange = (data) => {};

    void onMount(() => {
        if (schema) {
            props = schema?.props?.reduce((acc, next) => {
                if (next.default !== undefined) {
                    acc[next.name] = next.default;
                }
                return acc;
            }, {});
            onChange({ props, propsString });
        }
    });

    $: onChange({ props, propsString });

    $: propsString = schema.props
        .filter((prop) => prop.name !== 'elementRef')
        .map((prop) => {
            if (prop.type === 'boolean') {
                if (props[prop.name] === true) {
                    return prop.name;
                } else if (!props[prop.name] && prop.default === true) {
                    return `${prop.name}={false}`;
                }
            } else if (props[prop.name] !== undefined && props[prop.name] !== prop.default) {
                return `${prop.name}="${props[prop.name]}"`;
            }
        })
        .join(' ');

    function updateEnumProp(prop: any, value: any) {
        if (prop.default === undefined && props[prop.name] === value) {
            props[prop.name] = undefined;
        } else {
            props[prop.name] = value;
        }
    }
</script>

{#if schema && props}
    {#each schema.props as prop}
        <!-- Prop enum -->
        {#if prop.type === 'enum' && prop.values}
            <Flexbox direction="column" gap="1" alignItems="start">
                <Text size="2" weight="bold"
                    >{prop.name}: <Text size="3" transform="lowercase">{props[prop.name]}</Text></Text
                >
                <!-- Prop color only -->
                {#if prop.name === 'color'}
                    <Flexbox wrap="wrap" gap="2">
                        {#each prop.values as color}
                            <Button
                                {color}
                                iconOnly
                                size="1"
                                class="color-btn"
                                active={color === props[prop.name]}
                                on:click={() => updateEnumProp(prop, color)}
                            ></Button>
                        {/each}
                    </Flexbox>
                {:else}
                    <Flexbox wrap="wrap" gap="2">
                        {#each prop.values as value}
                            <Button
                                size="1"
                                iconOnly={prop.name === 'size'}
                                variant={value === props[prop.name] ? 'soft' : 'outline'}
                                on:click={() => updateEnumProp(prop, value)}
                            >
                                {value}
                            </Button>
                        {/each}
                    </Flexbox>
                {/if}
            </Flexbox>
        {:else if prop.type === 'boolean'}
            <Flexbox as="label" gap="2" alignItems="center" class="mb-1">
                <Switch color="primary" bind:checked={props[prop.name]} />
                <Text size="2">{prop.name}</Text>
            </Flexbox>
        {:else if prop.type === 'number'}
            <Flexbox direction="column" gap="2" alignItems="start">
                <Text size="2" weight="bold">{prop.name}</Text>
                <InputNumber size="2" color="primary" bind:value={props[prop.name]} />
            </Flexbox>
        {:else if prop.type === 'string'}
            <Flexbox as="label" direction="column" gap="2" alignItems="start">
                <Text size="2" weight="bold">{prop.name}</Text>
                <Input size="1" color="primary" bind:value={props[prop.name]} placeholder={prop.name} />
            </Flexbox>
        {/if}
    {/each}
{/if}

<style lang="scss">
    :global(.color-btn.Button-active) {
        box-shadow: var(--border-color-focus) 0px 0px 0px 1px;
        outline: none;
    }
</style>
