<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Text } from 'svxui';

    type Props = {
        children?: Snippet;
    };

    let { children }: Props = $props();
</script>

<Text as="p" size="3" class="markdown mb-3">
    {@render children?.()}
</Text>
