<script lang="ts">
    import type { SchemaSlot } from '$lib/doc.types';
    import Minus from 'phosphor-svelte/lib/Minus';
    import { Card } from 'svxui';
    import TablePopover from './TablePopover.svelte';
    import TableProps from './TableProps.svelte';

    export let slots: SchemaSlot[] = [];
</script>

<Card size="0" variant="surface" class={$$restProps.class}>
    <div class="table-wrapper">
        <table class="api-reference-table">
            <thead class="rt-TableHeader">
                <tr class="rt-TableRow">
                    <th scope="col" style="width: auto;">Name</th>
                    <th scope="col">Slot props</th>
                    <th scope="col">Description</th>
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
                            {#if Array.isArray(slot.props) && slot.props?.length > 0}
                                <TablePopover>
                                    <TableProps props={slot.props} />
                                </TablePopover>
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
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</Card>
