<script lang="ts">
    import Flex from '$lib/components/flex/components/flex.svelte';
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
    <Flex justify="start" direction="column" gap="5" width="100%">
        <Flex justify="start" as="form" direction="column" gap="3" width="100%">
            <Flex justify="start" as="label" direction="column" gap="1" width="100%">
                <Text>login</Text>
                <Input name="login" />
            </Flex>
            <Flex justify="start" as="label" direction="column" gap="1" width="100%">
                <Text>password</Text>
                <Input name="password" type="password" />
            </Flex>
        </Flex>

        {@render children?.()}
    </Flex>
</Panel>
