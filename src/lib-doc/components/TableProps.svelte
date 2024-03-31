<script lang="ts">
    import Minus from 'phosphor-svelte/lib/Minus';
    import type { DocProps } from '../types.js';
    import Card from '$lib/components/Card/Card.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import Text from '$lib/components/Text/Text.svelte';
    import TablePopover from './TablePopover.svelte';

    export let props: DocProps[] = [];
</script>

{#if Array.isArray(props) && props}
    <Card size="0" class={$$restProps.class}>
        <table>
            <thead class="rt-TableHeader">
                <tr class="rt-TableRow">
                    <th scope="col" style="width: auto;">Prop name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Default value</th>
                </tr>
            </thead>
            <tbody>
                {#each props as prop}
                    <tr>
                        <td data-color="primary">
                            <code class="name">{prop.name}</code>
                        </td>
                        <td data-color="gray">
                            <Flexbox alignItems="center" justify="start" gap="1">
                                <code class="type">{prop.type}</code>
                                {#if prop.values}
                                    <TablePopover>
                                        <div class="p-3">
                                            <Text color="gray">
                                                {prop.values.join(' | ')}
                                            </Text>
                                        </div>
                                    </TablePopover>
                                {/if}
                            </Flexbox>
                        </td>
                        <td data-color="gray">
                            {#if prop.default !== undefined}
                                <code class="default">
                                    {prop.default}
                                </code>
                            {:else}
                                <Minus color="var(--accent-a11)" size="15" />
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </Card>
{/if}

<style lang="scss">
    table {
        font-size: var(--font-size-2);
        line-height: var(--line-height-2);
        overflow: hidden;
        width: 100%;
        text-align: left;
        vertical-align: top;
        border-collapse: collapse;
        border-radius: 8px;
        border-spacing: 0;
        box-sizing: border-box;
        height: 0;

        thead {
            tr {
                th {
                    background-color: var(--slate-2);
                    box-shadow: inset 0 -1px var(--slate-7);
                    box-sizing: border-box;
                    vertical-align: inherit;
                    padding: var(--space-3);
                    height: 44px;
                }
            }
        }

        tbody {
            tr {
                --table-row-box-shadow: inset 0 -1px var(--slate-7);

                &:last-child {
                    --table-row-box-shadow: none;
                }

                td {
                    background-color: var(--background-level-0);
                    box-sizing: border-box;
                    vertical-align: inherit;
                    padding: 0 12px;
                    height: 44px;
                    box-shadow: var(--table-row-box-shadow);

                    code {
                        padding: 0.2rem 0.25rem 0.25rem;
                        background-color: var(--accent-a3);
                        color: var(--accent-a11);
                        font-size: calc(var(--font-size-2) * 0.95);
                        line-height: var(--line-height-2);
                        box-sizing: border-box;
                        border-radius: calc(0.5px + 0.2em);
                    }
                }
            }
        }
    }
</style>
