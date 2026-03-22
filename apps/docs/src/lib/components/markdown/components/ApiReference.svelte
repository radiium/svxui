<script lang="ts">
    import ArrowSquareOut from '$lib/components/icons/ArrowSquareOut.svelte';
    import H3 from '$lib/components/markdown/elements/h3.svelte';
    import { stringToId } from '$lib/utils/functions';
    import { Flexbox, Text, useThemeRootContext, type Color } from 'svxui';
    import { libDoc } from '../../../content-utils/libdoc';
    import type {
        AttachmentDocumentation,
        BuilderDocumentation,
        ComponentDocumentation,
        LibraryDocumentation,
        UtilityDocumentation
    } from '../../../content-utils/libdoc.types';
    import ApiReferenceTable from './ApiReferenceTable.svelte';
    import CodePreview from './CodePreview.svelte';

    type Props = {
        category: keyof Pick<LibraryDocumentation, 'components' | 'attachments' | 'builders' | 'utilities'>;
        names: string[];
    };
    let { category, names }: Props = $props();

    let items = $derived(
        names
            .map((name) => libDoc[category].find((item) => item.name === name))
            .filter((item) => item !== undefined)
    );

    type ItemDoc =
        | ComponentDocumentation
        | AttachmentDocumentation
        | BuilderDocumentation
        | UtilityDocumentation;
    const isComponent = (item: ItemDoc): item is ComponentDocumentation => item.category === 'component';
    const isAttachment = (item: ItemDoc): item is AttachmentDocumentation => item.category === 'attachment';
    const isBuilder = (item: ItemDoc): item is BuilderDocumentation => item.category === 'builder';
    const isUtility = (item: ItemDoc): item is UtilityDocumentation => item.category === 'utility';

    const themeRoot = useThemeRootContext();
    const themeColor = $derived(themeRoot.color as Color);

    // $inspect(libDoc[category]).with((_, value) =>
    //     console.log('ApiReference category', names, libDoc[category])
    // );
    // $inspect(items).with((_, value) => console.log('ApiReference items', names, value));
</script>

{#each items as item (item.name)}
    {#snippet heading()}
        <H3 id={stringToId(item.typeName, 'propdef')}>
            {item.typeName}
        </H3>

        {#if item.description}
            <Text as="p" class="mt-5 mb-0 inline-block" size="5">
                {item.description}
            </Text>

            <!-- <Text class="mt-3 mb-0" muted>{item.description}</Text> -->

            {#each item.tags as tag (tag)}
                {#if tag.name === 'see'}
                    <Text as="a" color={themeColor} href={'/docs' + tag.value} class="mt-3 inline-block">
                        <Flexbox align="center" gap="1">
                            show
                            <ArrowSquareOut style="color: var(--neutral-11)" data-color="" />
                        </Flexbox>
                    </Text>
                {:else}
                    <Text as="pre" class="mt-3 mb-0" style="font-family: inherit;">
                        {tag.name}: {tag.value}
                    </Text>
                {/if}
            {/each}
        {/if}
    {/snippet}

    {#if isComponent(item)}
        {@render heading()}
        <ApiReferenceTable props={item.props} />
    {:else if isAttachment(item)}
        {@render heading()}
        <ApiReferenceTable props={item.options} />
    {:else if isUtility(item) || isBuilder(item)}
        {#if item.classDef}
            <H3 id={stringToId(item.className, 'classdef')}>
                {item.className}
            </H3>
            <CodePreview>
                {#snippet code()}
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html item.classDef}
                {/snippet}
            </CodePreview>
        {/if}

        {#if item.typeDef}
            <H3 id={stringToId(item.typeName, 'typedef')}>
                {item.typeName}
            </H3>
            <CodePreview>
                {#snippet code()}
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html item.typeDef}
                {/snippet}
            </CodePreview>
        {/if}
    {/if}
{/each}
