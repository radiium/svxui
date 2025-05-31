<script lang="ts">
    import type { ComponentMetadata } from '$lib/types';
    import { Badge, Button, Flexbox, Floating, Panel } from 'svxui';
    import HyphenIcon from '../../icons/HyphenIcon.svelte';
    import InfoIcon from '../../icons/InfoIcon.svelte';
    import Code from './Code.svelte';

    type Props = {
        componentMetadata?: ComponentMetadata;
    };

    let { componentMetadata }: Props = $props();
    const isOpenList: Record<string, boolean> = $state({});
</script>

{#if componentMetadata}
    <Panel size="0" variant="outline" class="mt-4 overflow-hidden">
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
                    {#each componentMetadata.props as prop (prop.name)}
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
                                        {#if prop.isSnippet && prop.aliasType}
                                            <Code>Snippet</Code>
                                        {:else}
                                            <Code>{prop.type}</Code>
                                        {/if}
                                    </div>
                                    {#if prop.type === 'union' || prop.aliasType}
                                        <Floating
                                            bind:isOpen={isOpenList[prop.name]}
                                            closeOnScroll
                                            closeOnClickOutside
                                            closeOnEscape
                                            shift
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
                                                    {#if prop.aliasType}
                                                        {prop.aliasType}
                                                    {:else}
                                                        "{prop.values?.join('" | "')}"
                                                    {/if}
                                                </div>
                                            {/snippet}
                                        </Floating>
                                    {/if}
                                </Flexbox>
                            </td>
                            <td>
                                {#if prop.defaultValue !== undefined && prop.defaultValue !== ''}
                                    <Code>
                                        {#if Array.isArray(prop.defaultValue) && prop.defaultValue.length === 0}
                                            []
                                        {:else if prop.type === 'boolean' || prop.type === 'number'}
                                            {prop.defaultValue}
                                        {:else}
                                            "{prop.defaultValue}"
                                        {/if}
                                    </Code>
                                {:else}
                                    <HyphenIcon />
                                {/if}
                            </td>
                            <td>
                                {#each prop.jsDoc ?? [] as doc (doc)}
                                    {doc.commentText}
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
