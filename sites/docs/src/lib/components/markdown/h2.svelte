<script lang="ts">
    import { Text } from 'svxui';

    interface Props {
        id?: string;
        children?: import('svelte').Snippet;
        [key: string]: any;
    }

    let { id = '', children, ...rest }: Props = $props();
</script>

<Text as="h2" size="6" weight="bold" {id} class="markdown mt-7 mb-3" {...rest}>
    {@render children?.()}
</Text>
