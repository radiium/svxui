<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
    import { Button, defaultButtonProps } from 'svxui';
    import { template, buttonSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = $state(defaultButtonProps);
    let propsString = $state('');
    let templateProps = $derived([
        {
            key: ':props',
            value: propsString
        },
        {
            key: ':slot',
            value: props.iconOnly ? `\n  <MagnifyingGlass />\n` : 'Button'
        }
    ]);
</script>

<PlaygroundWrapper>
    {#snippet component()}
        <Button  {...props}>
            {#if props.iconOnly}
                <MagnifyingGlass />
            {:else}
                Button
            {/if}
        </Button>
    {/snippet}
    {#snippet form()}
        <PlaygroundForm  bind:props bind:propsString schema={buttonSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode  {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
