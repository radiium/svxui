<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="li" size="4" {...restProps} class="mt-1">
    {@render children?.()}
</Text>
