<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { defaultThemeSelectProps, ThemeSelect } from 'svxui';
    import { template, themeSelectSchema } from './schema.js';

    let props = defaultThemeSelectProps;
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
    <ThemeSelect slot="component" {...props} />
    <PlaygroundForm slot="form" bind:props bind:propsString schema={themeSelectSchema} />
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
