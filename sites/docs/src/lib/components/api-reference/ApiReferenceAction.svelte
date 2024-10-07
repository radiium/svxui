<script lang="ts">
    import type { SchemaAction } from '$lib/doc.types';
    import { Text } from 'sveltr';

    export let schema: SchemaAction;

    $: console.log(schema);
    $: hasParamsBloc = schema.params && schema.params.length > 0;
    $: hasAttributesBloc = schema.attributes && schema.attributes.length > 0;
</script>

{#if schema}
    <!-- Params -->
    {#if hasParamsBloc}
        <Text as="h3" size="5" weight="bold" class="mt-0 mb-3">Params</Text>
        {JSON.stringify(schema.params)}
    {/if}

    <!-- Attributes -->
    {#if hasAttributesBloc}
        <Text as="h3" size="5" weight="bold" class="mt-0 mb-3">Attributes</Text>
        {JSON.stringify(schema.attributes)}
    {/if}
{/if}
