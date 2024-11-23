<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { defaultThemeSelectProps, ThemeSelect } from 'svxui';
    import { template, themeSelectSchema } from './schema.js';

    let props = $state(defaultThemeSelectProps);
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
        <ThemeSelect {...props} />
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={themeSelectSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
