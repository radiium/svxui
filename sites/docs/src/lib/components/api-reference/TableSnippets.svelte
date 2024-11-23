<script lang="ts">
    import type { SchemaSnippet } from '$lib/doc.types';
    import Minus from 'phosphor-svelte/lib/Minus';
    import { Card } from 'svxui';
    import TablePopover from './TablePopover.svelte';
    import TableProps from './TableProps.svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLDivElement> & {
        snippets?: SchemaSnippet[];
    };

    let { snippets = [], ...rest }: Props = $props();
</script>

<Card size="0" variant="surface" class={rest.class}>
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
                {#each snippets as snippet}
                    <tr>
                        <td data-color="primary">
                            {#if snippet.name}
                                <code class="name">{snippet.name}</code>
                            {:else}
                                <Minus color="var(--accent-a11)" size="15" />
                            {/if}
                        </td>
                        <td data-color="gray">
                            {#if Array.isArray(snippet.props) && snippet.props?.length > 0}
                                <TablePopover>
                                    <TableProps props={snippet.props} />
                                </TablePopover>
                            {:else}
                                <Minus color="var(--accent-a11)" size="15" />
                            {/if}
                        </td>
                        <td data-color="gray">
                            {#if snippet.description}
                                <code class="default">
                                    {snippet.description}
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
