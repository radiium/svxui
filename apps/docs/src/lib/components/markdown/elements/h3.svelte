<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="h3" weight="medium" size="7" {...restProps} class="mt-7 mb-0">
    {@render children?.()}
</Text>
