<script lang="ts">
    import type { SectionDemoProps } from '$lib/types';
    import { Text } from 'svxui';
    import H3 from '../elements/h3.svelte';
    import CodePreview from './CodePreview.svelte';

    let {
        title,
        description,
        column = false,
        hideCode = false,
        Component: PreviewComponent,
        highlighted
    }: SectionDemoProps = $props();
</script>

{#if title}
    <H3>{title}</H3>
{/if}

{#if description}
    <Text class="mt-3 mb-0" muted>{description}</Text>
{/if}

<CodePreview meta={{ enableOpenCode: true, column, hideCode }}>
    {#snippet preview()}
        <PreviewComponent />
    {/snippet}

    {#snippet code()}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html highlighted}
    {/snippet}
</CodePreview>
