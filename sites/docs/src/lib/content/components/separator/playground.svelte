<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Separator, defaultSeparatorProps } from 'svxui';
    import { separatorSchema, template } from './schema.js';

    let props = $state({ ...defaultSeparatorProps });
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
        <Separator  {...props} />
    {/snippet}
    {#snippet form()}
        <PlaygroundForm  bind:props bind:propsString schema={separatorSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode  {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
