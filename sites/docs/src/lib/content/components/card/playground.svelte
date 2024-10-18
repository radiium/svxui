<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Card, defaultCardProps } from 'svxui';
    import { template, cardSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = defaultCardProps;
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<Playground>
    <Card {...props} slot="component">Card content</Card>
    <PlaygroundForm bind:props bind:propsString schema={cardSchema} slot="form" />
    <PlaygroundCode slot="code" {template} {templateProps} />
</Playground>
