<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Box, defaultBoxProps, Card } from 'sveltr';
    import { template, boxSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = defaultBoxProps;
    let propsString = '';
</script>

<Playground>
    <Card slot="component" size="1" style="width: 100%; height: 100%;">
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
    <PlaygroundForm bind:props bind:propsString schema={boxSchema} slot="form" />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
