<script lang="ts">
    import Minus from 'phosphor-svelte/lib/Minus';
    import type { DocSlots } from '../types.js';
    import Card from '$lib/components/Card/Card.svelte';
    import TableProps from './TableProps.svelte';
    import TablePopover from './TablePopover.svelte';

    export let slots: DocSlots[] = [];
</script>

<Card size="0" variant="outline" class={$$restProps.class}>
    <table>
        <thead class="rt-TableHeader">
            <tr class="rt-TableRow">
                <th scope="col" style="width: auto;">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Slot props</th>
            </tr>
        </thead>
        <tbody>
            {#each slots as slot}
                <tr>
                    <td data-color="primary">
                        {#if slot.name}
                            <code class="name">{slot.name}</code>
                        {:else}
                            <Minus color="var(--accent-a11)" size="15" />
                        {/if}
                    </td>
                    <td data-color="gray">
                        {#if slot.description}
                            <code class="default">
                                {slot.description}
                            </code>
                        {:else}
                            <Minus color="var(--accent-a11)" size="15" />
                        {/if}
                    </td>
                    <td data-color="gray">
                        {#if Array.isArray(slot.props) && slot.props?.length > 0}
                            <TablePopover>
                                <TableProps props={slot.props} />
                                <!-- <TableProps props={slot.props} />
                                <TableProps props={slot.props} />
                                <TableProps props={slot.props} />
                                <TableProps props={slot.props} /> -->
                            </TablePopover>
                        {:else}
                            <Minus color="var(--accent-a11)" size="15" />
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</Card>

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
                    padding: 12px;
                    height: 44px;
                    box-shadow: var(--table-row-box-shadow);

                    code {
                        padding: 0.2em 0.25em 0.25em;
                        background-color: var(--accent-a3);
                        color: var(--accent-a11);
                        font-size: calc(var(--font-size-2) * calc(0.95 * 0.95));
                        line-height: var(--line-height-2);
                        box-sizing: border-box;
                        border-radius: calc(0.5px + 0.2em);
                    }
                }
            }
        }
    }
</style>
