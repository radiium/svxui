<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Switch, defaultSwitchProps } from 'svxui';
    import { template, switchSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultSwitchProps };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<Playground>
    <Switch slot="component" {...props} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={switchSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</Playground>
