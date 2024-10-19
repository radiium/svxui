<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
    import { Button, defaultButtonProps } from 'svxui';
    import { template, buttonSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = defaultButtonProps;
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        },
        {
            key: ':slot',
            value: props.iconOnly ? `\n  <MagnifyingGlass />\n` : 'Button'
        }
    ];
</script>

<PlaygroundWrapper>
    <Button slot="component" {...props}>
        {#if props.iconOnly}
            <MagnifyingGlass />
        {:else}
            Button
        {/if}
    </Button>
    <PlaygroundForm slot="form" bind:props bind:propsString schema={buttonSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
