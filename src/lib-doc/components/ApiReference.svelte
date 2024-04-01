<script lang="ts">
    import type { DocBlocApi } from '../types.js';
    import TableProps from './TableProps.svelte';
    import TableSlots from './TableSlots.svelte';
    import H4 from './h4.svelte';

    export let data: DocBlocApi;

    $: hasPropsBloc = data.props && data.props.length > 0;
    $: hasSlotsBloc = data.slots && data.slots.length > 0;
    $: hasEventsBloc = data.events && data.events.length > 0;
</script>

{#if data}
    <!-- Props -->
    {#if hasPropsBloc}
        <H4>Props</H4>
        <TableProps props={data.props} class="mb-5" />
    {/if}

    <!-- Slots -->
    {#if hasSlotsBloc}
        <H4>Slots</H4>
        <TableSlots slots={data.slots} class="mb-5" />
    {/if}

    <!-- Events -->
    {#if hasEventsBloc}
        <H4>Events</H4>
        // TODO
    {/if}
{/if}
