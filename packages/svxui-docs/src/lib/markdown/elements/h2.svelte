<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="h2" class="mt-8 mb-0" weight="bold" size="8" {...restProps}>
    {@render children?.()}
</Text>
