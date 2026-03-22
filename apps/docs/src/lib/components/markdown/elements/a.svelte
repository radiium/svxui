<script>
    import { Text } from 'svxui';

    let { children, ...restProps } = $props();
    let title = $derived(restProps?.href ?? '');

    let extProps = $derived(
        restProps.href?.includes('https://')
            ? {
                  target: '_blank',
                  rel: 'noreferrer'
              }
            : {
                  rel: 'help'
              }
    );
</script>

<Text as="a" underline="always" size="4" {...restProps} {title} {...extProps}>
    {@render children?.()}
</Text>
