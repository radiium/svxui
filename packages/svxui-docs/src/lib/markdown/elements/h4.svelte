<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="h4" class="mt-4 mb-0" weight="medium" size="6" {...restProps}>
    {@render children?.()}
</Text>
