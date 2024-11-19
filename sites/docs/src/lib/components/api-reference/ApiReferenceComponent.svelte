<script lang="ts">
    import type { SchemaComponent } from '$lib/doc.types';
    import { Text } from 'svxui';
    import CodeInline from '../CodeInline.svelte';
    import TableEvents from './TableEvents.svelte';
    import TableProps from './TableProps.svelte';
    import TableSnippets from './TableSnippets.svelte';

    interface Props {
        schema: SchemaComponent;
    }

    let { schema }: Props = $props();

    let hasPropsBloc = $derived(schema.props && schema.props.length > 0);
    let hasSnippetsBloc = $derived(schema.snippets && schema.snippets.length > 0);
    let hasEventsBloc = $derived(schema.events && schema.events.length > 0);
</script>

{#if schema}
    <!-- Extend -->
    {#if schema.extend}
        <Text as="p" class="mb-5">
            Support <CodeInline>{schema.extend}</CodeInline> attributes.
        </Text>
    {/if}

    <!-- Props -->
    {#if hasPropsBloc}
        <Text as="h3" size="5" weight="bold" class="mt-0 mb-3">Props</Text>
        <TableProps props={schema.props} class="mb-5" />
    {/if}

    <!-- Snippets -->
    {#if hasSnippetsBloc}
        <Text as="h3" size="5" weight="bold" class="mt-0 mb-3">Slots</Text>
        <TableSnippets snippets={schema.snippets} class="mb-5" />
    {/if}

    <!-- Events -->
    {#if hasEventsBloc}
        <Text as="h3" size="5" weight="bold" class="mt-0 mb-3">Events</Text>
        <TableEvents events={schema.events} class="mb-5" />
    {/if}
{/if}
