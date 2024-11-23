<script lang="ts">
    import type { SchemaEvent } from '$lib/doc.types';
    import Minus from 'phosphor-svelte/lib/Minus';
    import type { HTMLAttributes } from 'svelte/elements';
    import { Card } from 'svxui';

    type Props = HTMLAttributes<HTMLDivElement> & {
        events?: SchemaEvent[];
    };

    let { events = [], ...rest }: Props = $props();
</script>

<Card size="0" variant="surface" class={rest.class}>
    <table class="api-reference-table">
        <thead class="rt-TableHeader">
            <tr class="rt-TableRow">
                <th scope="col" style="width: auto;">Name</th>
            </tr>
        </thead>
        <tbody>
            {#each events as event}
                <tr>
                    <td data-color="primary">
                        {#if event.name}
                            <code class="name">{event.name}</code>
                        {:else}
                            <Minus color="var(--accent-a11)" size="15" />
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</Card>
