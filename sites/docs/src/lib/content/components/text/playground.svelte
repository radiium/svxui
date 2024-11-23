<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Text, defaultTextProps } from 'svxui';
    import { template, textSchema } from './schema.js';

    let props = $state({ ...defaultTextProps });
    let propsString = $state('');
    let templateProps = $derived([
        {
            key: ':props',
            value: propsString
        }
    ]);
</script>

<PlaygroundWrapper mask={false}>
    {#snippet component()}
        <Text style="width: 100%" {...props}>Super sample text !</Text>
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={textSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
