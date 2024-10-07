<script lang="ts">
    import type { SchemaEvent } from '$lib/doc.types';
    import Minus from 'phosphor-svelte/lib/Minus';
    import { Card } from 'sveltr';

    export let slots: SchemaEvent[] = [];
</script>

<Card size="0" variant="surface" class={$$restProps.class}>
    <table class="api-reference-table">
        <thead class="rt-TableHeader">
            <tr class="rt-TableRow">
                <th scope="col" style="width: auto;">Name</th>
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
                </tr>
            {/each}
        </tbody>
    </table>
</Card>
