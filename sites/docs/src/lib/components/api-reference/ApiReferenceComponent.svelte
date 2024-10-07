<script lang="ts">
    import type { SchemaComponent } from '$lib/doc.types';
    import { Text } from 'sveltr';
    import CodeInline from '../CodeInline.svelte';
    import TableEvents from './TableEvents.svelte';
    import TableProps from './TableProps.svelte';
    import TableSlots from './TableSlots.svelte';

    export let schema: SchemaComponent;

    $: hasPropsBloc = schema.props && schema.props.length > 0;
    $: hasSlotsBloc = schema.slots && schema.slots.length > 0;
    $: hasEventsBloc = schema.events && schema.events.length > 0;
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

    <!-- Slots -->
    {#if hasSlotsBloc}
        <Text as="h3" size="5" weight="bold" class="mt-0 mb-3">Slots</Text>
        <TableSlots slots={schema.slots} class="mb-5" />
    {/if}

    <!-- Events -->
    {#if hasEventsBloc}
        <Text as="h3" size="5" weight="bold" class="mt-0 mb-3">Events</Text>
        <TableEvents slots={schema.events} class="mb-5" />
    {/if}
{/if}
