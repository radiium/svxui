<script lang="ts">
    import { Text } from 'svxui';
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<Text as="p" size="3" class="markdown mb-3">
    {@render children?.()}
</Text>
