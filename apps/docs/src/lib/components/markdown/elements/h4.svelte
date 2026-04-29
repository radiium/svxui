<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="h4" weight="medium" size="6" {...restProps} class="mt-5 mb-0">
    {@render children?.()}
</Text>
