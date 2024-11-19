<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Link, defaultLinkProps } from 'svxui';
    import { template, linkSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = $state({ ...defaultLinkProps });
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
        <Link {...props} style="width: 100%" href="#" target="_self">Link sample</Link>
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={linkSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
