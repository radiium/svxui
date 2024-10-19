<script lang="ts">
    import PlaygroundCode from '$lib/components/playground/PlaygroundCode.svelte';
    import PlaygroundForm from '$lib/components/playground/PlaygroundForm.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { Card, Flexbox, defaultFlexboxProps } from 'svxui';
    import { flexboxSchema, template } from './schema.js';

    let props = { ...defaultFlexboxProps, isOpen: false };
    let propsString = '';
    $: templateProps = [
        {
            key: ':props',
            value: propsString
        }
    ];
</script>

<PlaygroundWrapper>
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
    <PlaygroundCode slot="code" {template} {templateProps} />
</PlaygroundWrapper>
