<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="p" class="mt-5 mb-0 inline-block" size="4" {...restProps}>
    {@render children?.()}
</Text>
