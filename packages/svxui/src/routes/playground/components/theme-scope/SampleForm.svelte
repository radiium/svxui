<script lang="ts">
    import Flexbox from '$lib/components/flexbox/components/flexbox.svelte';
    import Input from '$lib/components/input/components/input.svelte';
    import Panel from '$lib/components/panel/components/panel.svelte';
    import Text from '$lib/components/text/components/text.svelte';
    import type { Snippet } from 'svelte';

    type Props = {
        children?: Snippet;
    };

    let { children }: Props = $props();
</script>

<Panel variant="soft" outline fullWidth>
    <Flexbox direction="column" gap="5" fullWidth>
        <Flexbox as="form" direction="column" gap="3" fullWidth>
            <Flexbox as="label" direction="column" gap="1" fullWidth>
                <Text>login</Text>
                <Input name="login" />
            </Flexbox>
            <Flexbox as="label" direction="column" gap="1" fullWidth>
                <Text>password</Text>
                <Input name="password" type="password" />
            </Flexbox>
        </Flexbox>

        {@render children?.()}
    </Flexbox>
</Panel>
