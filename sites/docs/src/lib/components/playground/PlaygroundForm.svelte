<script lang="ts">
    import { SchemaPropType, type SchemaComponent, type SchemaProp } from '$lib/doc.types';
    import { onMount } from 'svelte';
    import { Button, Colors, Flexbox, Input, InputNumber, Select, Switch, Text } from 'sveltr';

    type PropsType = { [key: SchemaProp['name']]: any };
    export let schema: SchemaComponent = {
        props: [],
        slots: [],
        events: []
    };
    export let propsString = '';
    export let props: PropsType = {};

    onMount(() => {
        if (schema) {
            props = schema?.props?.reduce<PropsType>((acc, next) => {
                if (next.default !== undefined) {
                    acc[next.name] = next.default;
                }
                return acc;
            }, {});
        }
    });

    $: propsString = schema.props
        .filter((prop) => prop.name !== 'elementRef')
        .map((prop) => {
            if (prop.type === SchemaPropType.boolean) {
                if (props[prop.name] === true) {
                    return prop.name;
                } else if (!props[prop.name] && prop.default === true) {
                    return `${prop.name}={false}`;
                }
            } else if (props[prop.name] !== undefined && props[prop.name] !== prop.default) {
                return `${prop.name}="${props[prop.name]}"`;
            } else {
                return '';
            }
        })
        .filter(Boolean)
        .join(' ');

    function updateEnumProp(
        prop: SchemaProp,
        value: string | boolean | number | HTMLElement | undefined | null
    ) {
        if (prop.default === undefined && props[prop.name] === value) {
            props[prop.name] = undefined;
        } else {
            props[prop.name] = value;
        }
    }

    const castColor = (color: (typeof Colors)[number]): (typeof Colors)[number] => color;
</script>

{#if schema && props}
    {#each schema.props as prop}
        <!-- Prop enum -->
        {#if prop.type === SchemaPropType.enum && prop.values}
            <Flexbox direction="column" gap="1" align="start">
                <Text size="2" weight="bold">
                    {prop.name}
                    <!-- : <Text size="3" transform="lowercase">{props[prop.name]}</Text> -->
                </Text>
                <!-- Prop color only -->
                {#if prop.name === 'color'}
                    <Flexbox wrap="wrap" gap="1">
                        {#each Colors as color}
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
                    <Select size="2" fullWidth options={[...prop.values]} bind:value={props[prop.name]} />

                    <!-- <Flexbox wrap="wrap" gap="1">
                        {#each prop.values as value}
                            <Button
                                size="1"
                                iconOnly={prop.name === 'size' || prop.name === 'gap'}
                                variant={value === props[prop.name] ? 'solid' : 'outline'}
                                on:click={() => updateEnumProp(prop, value)}
                            >
                                {value}
                            </Button>
                        {/each}
                    </Flexbox> -->
                {/if}
            </Flexbox>
        {:else if prop.type === SchemaPropType.boolean}
            <Flexbox as="label" gap="3" align="center">
                <Switch size="3" bind:checked={props[prop.name]} name={prop.name} />
                <Text size="2">{prop.name}</Text>
            </Flexbox>
        {:else if prop.type === SchemaPropType.number}
            <Flexbox direction="column" gap="1" align="start">
                <Text size="2" weight="bold">{prop.name}</Text>
                <Input type="number" size="2" bind:value={props[prop.name]} />
                <!-- <InputNumber size="1" variant="soft" bind:value={props[prop.name]} /> -->
            </Flexbox>
        {:else if prop.type === SchemaPropType.string}
            <Flexbox as="label" direction="column" gap="1" align="start">
                <Text size="2" weight="bold">{prop.name}</Text>
                <Input size="2" bind:value={props[prop.name]} placeholder={prop.name} name={prop.name} />
            </Flexbox>
        {/if}
    {/each}
{/if}
