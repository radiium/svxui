<script lang="ts">
    import { Text } from 'svxui';

    interface Props {
        id?: string;
        children?: import('svelte').Snippet;
        [key: string]: any;
    }

    let { id = '', children, ...rest }: Props = $props();
</script>

<Text as="h1" size="8" weight="bold" {id} class="markdown mb-3" {...rest}>
    {@render children?.()}
</Text>
