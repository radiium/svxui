<script lang="ts">
    import { Flex, Input, Panel, Text } from '$lib/index.js';
    import type { Snippet } from 'svelte';

    type Props = {
        children?: Snippet;
    };

    let { children }: Props = $props();
</script>

<Panel variant="soft" outline fullWidth>
    <Flex justify="start" direction="column" gap="5" class="w-full">
        <Flex justify="start" as="form" direction="column" gap="3" class="w-full">
            <Flex justify="start" as="label" direction="column" gap="1" class="w-full">
                <Text>login</Text>
                <Input name="login" />
            </Flex>
            <Flex justify="start" as="label" direction="column" gap="1" class="w-full">
                <Text>password</Text>
                <Input name="password" type="password" />
            </Flex>
        </Flex>

        {@render children?.()}
    </Flex>
</Panel>
