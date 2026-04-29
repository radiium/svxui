<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="h1" weight="bold" size="9" {...restProps} class="mt-7 mb-0">
    {@render children?.()}
</Text>
