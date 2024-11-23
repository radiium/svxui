<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Card, defaultCardProps } from 'svxui';
    import { cardSchema, template } from './schema.js';

    let props = $state(defaultCardProps);
    let propsString = $state('');
    let templateProps = $derived([
        {
            key: ':props',
            value: propsString
        }
    ]);
</script>

<PlaygroundWrapper>
    {#snippet component()}
        <Card {...props}>Card content</Card>
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={cardSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
