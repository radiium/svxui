<script lang="ts">
    import Code from '$lib/components/markdown/elements/code.svelte';
    import HyphenIcon from '$lib/icons/HyphenIcon.svelte';
    import InfoIcon from '$lib/icons/InfoIcon.svelte';
    import { Badge, Button, Flexbox, Floating, Panel, Text } from 'svxui';
    import type { PropDocumentation } from '../../../content-utils/libdoc.types';

    type Props = {
        props?: PropDocumentation[];
    };

    let { props }: Props = $props();
    const isOpenList: Record<string, boolean> = $state({});
</script>

{#if props}
    <Panel size="0" variant="clear" outline class="mt-4 overflow-hidden">
        <div class="overflow-auto">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {#each props as prop (prop.name)}
                        <tr>
                            <td>
                                <Flexbox align="center" gap="2" wrap="nowrap">
                                    <Code color="blue">{prop.name}</Code>

                                    {#if prop.isBindable}
                                        <Badge variant="outline" color="orange">$bindable</Badge>
                                    {/if}

                                    {#if prop.isSnippet}
                                        <Badge variant="outline" color="yellow">Snippet</Badge>
                                    {/if}

                                    {#if !prop.isOptional}
                                        <Badge variant="outline" color="red">required</Badge>
                                    {/if}
                                </Flexbox>
                            </td>
                            <td>
                                <Flexbox align="center" gap="1" wrap="nowrap">
                                    <div>
                                        {#if prop.isSnippet}
                                            <Code>Snippet</Code>
                                            <!-- <Code>{JSON.stringify(prop.type)}</Code> -->
                                        {:else if ['union', 'function'].includes(prop.type.kind)}
                                            <Code>{prop.type.kind}</Code>
                                        {:else}
                                            <Code>{prop.type.raw}</Code>
                                        {/if}
                                    </div>
                                    {#if ['union', 'function'].includes(prop.type.kind) || (prop.isSnippet && prop.type.typeArguments)}
                                        <Floating
                                            bind:isOpen={isOpenList[prop.name]}
                                            closeOnScroll
                                            closeOnClickOutside
                                            closeOnEscape
                                            shift
                                            offset={9}
                                            arrow
                                        >
                                            {#snippet trigger()}
                                                <Button
                                                    size="1"
                                                    variant="clear"
                                                    iconOnly
                                                    onclick={() => {
                                                        isOpenList[prop.name] = !isOpenList[prop.name];
                                                    }}
                                                >
                                                    <InfoIcon size="18px" color="var(--neutral-8)" />
                                                </Button>
                                            {/snippet}
                                            {#snippet content()}
                                                <div style="max-width: 70vw;">
                                                    {prop.type.raw}
                                                    <!-- {#if prop.aliasType}
                                                        {prop.aliasType}
                                                    {:else} -->
                                                    <!-- {prop.type.raw}
                                                    {prop.type.typeName} -->
                                                    <!-- {/if} -->
                                                </div>
                                            {/snippet}
                                        </Floating>
                                    {/if}
                                </Flexbox>
                            </td>
                            <td>
                                {#if prop.defaultValue !== undefined && prop.defaultValue !== 'undefined' && prop.defaultValue !== ''}
                                    <Code>
                                        {prop.defaultValue}
                                    </Code>
                                {:else}
                                    <HyphenIcon />
                                {/if}
                            </td>
                            <td style="min-width: 280px;">
                                {prop.description}

                                {#each prop.tags ?? [] as tag (tag)}
                                    {#if tag.name !== 'default'}
                                        <br />
                                        <Text>{tag.name}:</Text>
                                        {#if tag.name === 'see'}
                                            <Text as="a" underline="always" muted href={tag.value}>
                                                {tag.value}
                                            </Text>
                                        {:else}
                                            {tag.value}
                                        {/if}
                                    {/if}
                                {/each}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </Panel>
{/if}

<style>
    table {
        width: 100%;
        max-width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
        background-color: var(--color-background-0);
        overflow: hidden;
        border-radius: var(--radius-4);
        font-size: var(--font-size-2);
        line-height: var(--line-height-2);

        th,
        td {
            text-align: left;
            height: 44px;
            padding: var(--space-3);
        }

        td {
            box-shadow: inset 0 -1px var(--neutral-a5);
        }

        thead {
            tr {
                th {
                    background-color: var(--color-background-1);
                    font-weight: 700;

                    &:first-child {
                        border-top-left-radius: var(--radius-4);
                    }
                    &:last-child {
                        border-top-right-radius: var(--radius-4);
                    }
                }
            }
        }

        tbody {
            tr {
                td {
                    font-weight: 400;
                }

                &:last-child {
                    td {
                        &:first-child {
                            border-bottom-left-radius: var(--radius-4);
                        }
                        &:last-child {
                            border-bottom-right-radius: var(--radius-4);
                        }
                    }
                }
            }
        }
    }
</style>
