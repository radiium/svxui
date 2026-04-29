<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="h2" weight="bold" size="8" {...restProps} class="mt-8 mb-0">
    {@render children?.()}
</Text>
