<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="h3" class="mt-5 mb-0" weight="medium" size="7" {...restProps}>
    {@render children?.()}
</Text>
