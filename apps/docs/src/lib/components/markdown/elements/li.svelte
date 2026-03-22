<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="li" class="mt-1" size="4" {...restProps}>
    {@render children?.()}
</Text>
