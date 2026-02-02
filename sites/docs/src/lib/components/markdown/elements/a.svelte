<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
    let title = $derived(restProps?.href ?? '');
</script>

<Text as="a" underline="always" size="5" {...restProps} {title}>
    {@render children?.()}
</Text>
