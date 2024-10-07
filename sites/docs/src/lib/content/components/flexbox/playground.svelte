<script lang="ts">
    import Playground from '$lib/components/playground/Playground.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import { Card, Flexbox, defaultFlexboxProps } from 'sveltr';
    import { template, flexboxSchema } from './schema.js';
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';

    let props = { ...defaultFlexboxProps, isOpen: false };
    let propsString = '';
</script>

<Playground>
    <Card slot="component" size="1" style="width: 100%; height: 100%;">
        <Flexbox {...props} style="width: 100%; height: 100%;">
            {#each [1, 2, 3] as n}
                <div
                    style="width: 50px; height: 50px; background: var(--accent-9); border-radius: 6px; display: flex; align-items: center; justify-content: center;"
                    data-color="gray"
                >
                    {n}
                </div>
            {/each}
        </Flexbox>
    </Card>
    <PlaygroundForm bind:props bind:propsString schema={flexboxSchema} slot="form" />
    <PlaygroundCode slot="code" {template} {propsString} />
</Playground>
