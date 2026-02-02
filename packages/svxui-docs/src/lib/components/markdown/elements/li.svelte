<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="li" class="mt-2" size="5" {...restProps}>
    {@render children?.()}
</Text>
