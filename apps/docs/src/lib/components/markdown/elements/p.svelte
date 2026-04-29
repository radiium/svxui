<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
</script>

<Text as="p" size="4" {...restProps} class="mt-5 mb-0 inline-block">
    {@render children?.()}
</Text>
