<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Link, defaultLinkProps } from 'svxui';
    import { template, linkSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultLinkProps };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<Playground mask={false}>
    <Link slot="component" {...props} style="width: 100%" href="#" target="_self">Link sample</Link>
    <PlaygroundForm slot="form" bind:props bind:propsString schema={linkSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</Playground>
