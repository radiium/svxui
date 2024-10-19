<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Card, defaultCardProps } from 'svxui';
    import { cardSchema, template } from './schema.js';

    let props = defaultCardProps;
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
    <Card {...props} slot="component">Card content</Card>
    <PlaygroundForm bind:props bind:propsString schema={cardSchema} slot="form" />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
