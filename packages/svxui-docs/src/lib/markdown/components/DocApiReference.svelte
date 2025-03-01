<script lang="ts">
    import type { ComponentGroupMetadata } from '$lib/types';
    import { stringToId } from '$lib/utils/string-to-id';
    import H2 from '../elements/h2.svelte';
    import H3 from '../elements/h3.svelte';
    import DocApiReferenceTable from './DocApiReferenceTable.svelte';
    import PreCode from './DocCodeBlock.svelte';

    type Props = {
        metadata?: ComponentGroupMetadata | undefined;
    };
    let { metadata }: Props = $props();

    let componentMetadatas = $derived(metadata?.components ?? []);
    let sharedTypes = $derived.by(() =>
        (metadata?.sharedTypes ?? [])
            .filter(
                (item) =>
                    item.kind !== 'UnionType' &&
                    !componentMetadatas.some((comp) => comp.name + 'Props' === item.name)
            )
            .map((item) => item.text)
            .join('\n\n')
    );
</script>

{#if componentMetadatas.length}
    <H2 id="api-reference">API Reference</H2>
    {#each componentMetadatas as componentMetadata (componentMetadata.name)}
        {#if componentMetadatas.length > 1}
            <H3 id={stringToId(componentMetadata.name)}>{componentMetadata.name}</H3>
        {/if}
        {#if componentMetadata.props.length}
            <DocApiReferenceTable {componentMetadata} />
        {/if}
    {/each}
{/if}

{#if sharedTypes.length}
    <H3 id="type-definitions">Type Definitions</H3>
    <PreCode code={metadata?.sharedTypesText} />
{/if}
