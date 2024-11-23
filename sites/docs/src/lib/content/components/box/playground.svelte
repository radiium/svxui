<script lang="ts">
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Box, defaultBoxProps, Card } from 'svxui';
    import { template, boxSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = $state(defaultBoxProps);
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
        <Card size="1" style="width: 100%; height: 100%;">
            <Box {...props} style="width: 100%; height: 100%;">
                {#each [1, 2, 3] as n}
                    <div
                        style="width: 50px; height: 50px; background: var(--accent-9); border-radius: 6px; display: flex; align-items: center; justify-content: center;"
                        data-color="gray"
                    >
                        {n}
                    </div>
                {/each}
            </Box>
        </Card>
    {/snippet}
    {#snippet form()}
        <PlaygroundForm bind:props bind:propsString schema={boxSchema} />
    {/snippet}
    {#snippet code()}
        <PlaygroundCode {template} {templateProps} />
    {/snippet}
</PlaygroundWrapper>
