<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="h1" class="mt-7 mb-0" weight="bold" size="9" {...restProps}>
    {@render children?.()}
</Text>
