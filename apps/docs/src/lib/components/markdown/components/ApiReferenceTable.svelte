<script lang="ts">
    import HyphenIcon from '$lib/components/icons/HyphenIcon.svelte';
    import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
    import Code from '$lib/components/markdown/elements/code.svelte';
    import { Badge, Box, Button, Flex, Floating, Panel, Text } from 'svxui';
    import type { PropDocumentation } from '../../../content-utils/libdoc.types';

    type Props = {
        props?: PropDocumentation[];
    };

    let { props }: Props = $props();
    const isOpenList: Record<string, boolean> = $state({});
</script>

{#if props}
    <Panel p="0" variant="surface" color="neutral" outline class="api-reference-table">
        <div class="inner">
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
                                <Flex justify="start" align="center" gap="2" wrap="nowrap">
                                    <Code color="blue">{prop.name}</Code>

                                    {#if prop.isBindable}
                                        <Badge variant="outline" color="orange">$bindable</Badge>
                                    {/if}

                                    <!-- {#if prop.isSnippet}
                                        <Badge variant="outline" color="yellow">Snippet</Badge>
                                    {/if} -->

                                    {#if !prop.isOptional}
                                        <Badge variant="outline" color="red">required</Badge>
                                    {/if}
                                </Flex>
                            </td>
                            <td>
                                <Flex justify="start" align="center" gap="1" wrap="nowrap">
                                    <div>
                                        <Code>{prop.type.text}</Code>
                                    </div>
                                    {#if prop.type.hint}
                                        <Floating
                                            bind:isOpen={isOpenList[prop.name]}
                                            closeOnScroll
                                            closeOnOutsideClick
                                            closeOnEscape
                                            shift
                                            arrow
                                            arrowHeight={10}
                                            offset={12}
                                            variant="surface"
                                            outline
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
                                                <Box maxWidth="70vw">
                                                    {prop.type.hint}
                                                </Box>
                                            {/snippet}
                                        </Floating>
                                    {/if}
                                </Flex>
                            </td>
                            <td>
                                {#if ![undefined, 'undefined', ''].includes(prop.defaultValue)}
                                    {prop.defaultValue}
                                {:else}
                                    <HyphenIcon />
                                {/if}
                            </td>
                            <td class="description">
                                {#each prop.description?.split('\n') as desc, i (i)}
                                    {desc}
                                    <br />
                                {/each}

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
    :global(.api-reference-table) {
        margin-top: var(--space-4);
        overflow: hidden;
    }

    .inner {
        overflow: auto;

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

                &.description {
                    min-width: 260px;
                }
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
    }
</style>
